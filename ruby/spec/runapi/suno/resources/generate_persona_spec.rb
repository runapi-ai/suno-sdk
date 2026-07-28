# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::GeneratePersona do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/generate_persona" }
  let(:valid_params) { {task_id: "t1", audio_id: "a1", name: "Singer", description: "Warm voice"} }

  describe "#run" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("persona" => {"id" => "p1", "name" => "Singer", "description" => "Warm voice"}, "billing" => {"reservation" => nil, "settlement" => {"charged_amount_cents" => 10, "amount_micro_cents" => 10_000_000}, "refund" => nil})

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::GeneratePersonaResponse)
      expect(result.billing).to be_a(RunApi::Core::TaskBillingFacts)
      expect(result.billing.settlement.charged_amount_cents).to eq(10)
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:task_id)
      expect { resource.run(**params) }.to raise_error(RunApi::Core::ValidationError)
    end
  end
end
