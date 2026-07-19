# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::CheckVoice do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/check_voice" }
  let(:valid_params) { {task_id: "voice-task-1"} }

  describe "#run" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("is_available" => true)

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CheckVoiceResponse)
      expect(result.is_available).to eq(true)
    end

    it "validates required params" do
      expect { resource.run }.to raise_error(RunApi::Core::ValidationError, /task_id is required/)
    end
  end
end
