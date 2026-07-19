# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::CreateMashup do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/create_mashup" }
  let(:valid_params) { {upload_url_list: ["https://cdn.runapi.ai/public/samples/audio.mp3", "https://cdn.runapi.ai/public/samples/audio-2.mp3"], vocal_mode: "auto_lyrics", prompt: "blend", model: "suno-v5"} }

  describe "#create" do
    it "POSTs to the correct endpoint" do
      params = valid_params.merge(persona_id: "persona_123", persona_type: "style")
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**params)
      expect(result).to be_a(RunApi::Suno::Types::CreateMashupResponse)
      expect(result.id).to eq("task-1")
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:upload_url_list)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError)
    end

    it "validates exact lyrics shape" do
      params = valid_params.merge(vocal_mode: "exact_lyrics", prompt: nil, lyrics: "[Verse] blend", style: "pop", title: "Blend").compact
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
      expect(result).to be_a(RunApi::Suno::Types::CreateMashupResponse)
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
        .and_return("id" => "task-1", "status" => "completed", "audios" => [{"id" => "a7", "audio_url" => "https://cdn.runapi.ai/public/samples/audio-6.mp3"}])

      allow(RunApi::Core::Polling).to receive(:sleep)
      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CompletedCreateMashupResponse)
    end
  end
end
