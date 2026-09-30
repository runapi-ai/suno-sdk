# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::MusicVisualizations do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/music_visualizations" }
  let(:source_audio_id) { "res_0123456789abcdef0123456789abcdef0123456789abcdef" }
  let(:valid_params) do
    {
      source_audio_id: source_audio_id,
      source_task_id: "task-1",
      callback_url: "https://example.test/callback",
      author: "Studio Nine",
      domain_name: "example.test"
    }
  end

  describe "#create" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::MusicVisualizationResponse)
      expect(result.id).to eq("task-1")
    end

    it "omits both watermark fields when they are not supplied" do
      params = {source_audio_id: source_audio_id}
      expect(http).to receive(:request).with(:post, endpoint, body: params).and_return("id" => "task-1", "status" => "processing")

      resource.create(**params)
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "video_url" => "https://cdn.runapi.ai/public/samples/source.mp4")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::MusicVisualizationResponse)
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
        .and_return("id" => "task-1", "status" => "completed", "video_url" => "https://cdn.runapi.ai/public/samples/source.mp4")

      allow(RunApi::Core::Polling).to receive(:sleep)
      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CompletedMusicVisualizationResponse)
      expect(result.video_url).to eq("https://cdn.runapi.ai/public/samples/source.mp4")
    end
  end
end
