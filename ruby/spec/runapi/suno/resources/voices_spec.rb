# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::Voices do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/voices" }
  let(:valid_params) { {source_audio_url: "https://file.runapi.ai/voice.mp3", name: "Narrator"} }

  describe "#run" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return(
          "voice" => {"id" => "voi-1", "name" => "Narrator"}
        )

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::VoiceCreationResponse)
      expect(result.voice).to be_a(RunApi::Suno::Types::VoiceResource)
      expect(result.voice.id).to eq("voi-1")
    end

    it "submits an unnamed recording" do
      expect(http).to receive(:request).with(:post, endpoint, body: {source_audio_url: "https://file.runapi.ai/voice.mp3"})
        .and_return("voice" => {"id" => "voi-2", "name" => nil})

      result = resource.run(source_audio_url: "https://file.runapi.ai/voice.mp3")
      expect(result.voice.id).to eq("voi-2")
    end
  end

  describe "#get" do
    it "GETs the resource endpoint and reports readiness" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/voi-1")
        .and_return(
          "voice" => {"id" => "voi-1", "name" => "Narrator"},
          "status" => "available"
        )

      result = resource.get("voi-1")
      expect(result).to be_a(RunApi::Suno::Types::VoiceResourceResponse)
      expect(result.voice.name).to eq("Narrator")
      expect(result.status).to eq("available")
    end
  end
end
