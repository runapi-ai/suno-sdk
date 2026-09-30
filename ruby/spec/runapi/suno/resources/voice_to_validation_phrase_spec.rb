# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::VoiceToValidationPhrase do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/voice_to_validation_phrase" }
  let(:valid_params) do
    {
      voice_url: "https://files.runapi.ai/suno/source-vocal.mp3",
      vocal_start_seconds: 2,
      vocal_end_seconds: 12,
      language: "en"
    }
  end

  describe "#create" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::ValidationPhraseResponse)
      expect(result.id).to eq("task-1")
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "provider_status" => "wait_validating", "validation_phrase" => "Read this phrase")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::ValidationPhraseResponse)
      expect(result.validation_phrase).to eq("Read this phrase")
    end
  end
end
