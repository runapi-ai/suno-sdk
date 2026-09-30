# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::MusicFromSample do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/music_from_sample" }
  let(:valid_params) do
    {
      model: "suno-v5",
      audio_url: "https://file.runapi.ai/source.mp3",
      prompt: "Build a full song around this hook",
      start_seconds: 5,
      end_seconds: 20,
      callback_url: "https://example.test/callback"
    }
  end

  describe "#create" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::MusicFromSampleResponse)
      expect(result.id).to eq("task-1")
      expect(result.status).to eq("processing")
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "audios" => [{"id" => "audio-1", "audio_url" => "https://cdn.runapi.ai/public/samples/audio.mp3"}])

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::MusicFromSampleResponse)
      expect(result.status).to eq("completed")
    end
  end

  describe "#run" do
    it "creates then polls until complete" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "processing")
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "audios" => [{"id" => "audio-1", "audio_url" => "https://cdn.runapi.ai/public/samples/audio.mp3"}])

      allow(RunApi::Core::Polling).to receive(:sleep)
      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CompletedMusicFromSampleResponse)
      expect(result.audios.first.id).to eq("audio-1")
    end
  end
end
