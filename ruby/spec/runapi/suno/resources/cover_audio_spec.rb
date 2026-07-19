# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::CoverAudio do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/cover_audio" }
  let(:valid_params) { {upload_url: "https://cdn.runapi.ai/public/samples/audio.mp3", vocal_mode: "auto_lyrics", prompt: "jazz cover", model: "suno-v4.5-plus"} }

  describe "#create" do
    it "POSTs to the correct endpoint" do
      params = valid_params.merge(persona_id: "persona_123", persona_type: "style")
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**params)
      expect(result).to be_a(RunApi::Suno::Types::CoverAudioResponse)
      expect(result.id).to eq("task-1")
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:upload_url)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError)
    end

    it "validates exact lyrics shape" do
      params = valid_params.merge(vocal_mode: "exact_lyrics", prompt: nil, lyrics: "[Verse] jazz cover", style: "jazz", title: "Jazz Cover").compact
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-2", "status" => "processing")

      result = resource.create(**params)
      expect(result.id).to eq("task-2")
    end

    it "rejects provider persona_type values" do
      expect do
        resource.create(**valid_params.merge(persona_type: "style_persona"))
      end.to raise_error(RunApi::Core::ValidationError, /persona_type must be one of/)
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::CoverAudioResponse)
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
        .and_return("id" => "task-1", "status" => "completed", "audios" => [{"id" => "a3", "audio_url" => "https://cdn.runapi.ai/public/samples/audio-3.mp3"}])

      allow(RunApi::Core::Polling).to receive(:sleep)
      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CompletedCoverAudioResponse)
    end
  end
end
