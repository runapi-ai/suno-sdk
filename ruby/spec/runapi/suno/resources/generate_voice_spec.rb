# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::GenerateVoice do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/generate_voice" }
  let(:valid_params) do
    {
      task_id: "validate-task-1",
      verify_url: "https://files.runapi.ai/suno/verify-read.mp3",
      voice_name: "Warm Test Voice",
      singer_skill_level: "advanced"
    }
  end

  describe "#create" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::VoiceGenerationResponse)
      expect(result.id).to eq("task-1")
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:verify_url)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError, /verify_url is required/)
    end

    it "validates singer skill level" do
      expect { resource.create(**valid_params.merge(singer_skill_level: "expert")) }
        .to raise_error(RunApi::Core::ValidationError, /singer_skill_level/)
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "provider_status" => "success", "voice_id" => "voice_custom_123")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::VoiceGenerationResponse)
      expect(result.voice_id).to eq("voice_custom_123")
    end
  end
end
