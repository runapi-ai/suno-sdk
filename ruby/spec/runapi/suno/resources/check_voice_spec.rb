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
        .and_return("is_available" => true, "billing" => {"reservation" => {"amount_cents" => 1}, "settlement" => nil, "refund" => nil})

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CheckVoiceResponse)
      expect(result.is_available).to eq(true)
      expect(result.billing).to be_a(RunApi::Core::TaskBillingFacts)
      expect(result.billing.reservation.amount_cents).to eq(1)
    end

    it "validates required params" do
      expect { resource.run }.to raise_error(RunApi::Core::ValidationError, /task_id is required/)
    end
  end
end
