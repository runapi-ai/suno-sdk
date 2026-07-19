# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::ExtendMusic do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/extend_music" }
  let(:valid_params) { {audio_id: "a1", parameter_mode: "source", model: "suno-v5"} }

  describe "#create" do
    it "POSTs to the correct endpoint" do
      params = valid_params.merge(persona_id: "persona_123", persona_type: "style")
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**params)
      expect(result).to be_a(RunApi::Suno::Types::ExtendMusicResponse)
      expect(result.id).to eq("task-1")
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:audio_id)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError)
    end

    it "allows lyrics for custom uploaded audio extensions" do
      params = {
        audio_url: "https://cdn.runapi.ai/public/samples/audio.mp3",
        parameter_mode: "custom",
        model: "suno-v5",
        lyrics: "[Verse] extend this chorus",
        style: "pop",
        title: "Extended Song",
        continue_at: 60,
        instrumental: false
      }
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-2", "status" => "processing")

      result = resource.create(**params)
      expect(result.id).to eq("task-2")
    end

    it "rejects provider persona_type values" do
      expect do
        resource.create(**valid_params.merge(persona_type: "style_persona"))
      end.to raise_error(RunApi::Core::ValidationError, /Invalid persona_type/)
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::ExtendMusicResponse)
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
        .and_return("id" => "task-1", "status" => "completed", "audios" => [{"id" => "a2", "audio_url" => "https://cdn.runapi.ai/public/samples/audio-4.mp3"}])

      allow(RunApi::Core::Polling).to receive(:sleep)
      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CompletedExtendMusicResponse)
    end
  end
end
