# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::BoostStyle do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/boost_style" }
  let(:valid_params) { {description: "cinematic strings"} }

  describe "#run" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("style" => "cinematic, orchestral", "billing" => {"reservation" => nil, "settlement" => nil, "refund" => {"refunded_at" => "2026-07-27T00:00:00.000000Z"}})

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::BoostStyleResponse)
      expect(result.billing).to be_a(RunApi::Core::TaskBillingFacts)
      expect(result.billing.refund.refunded_at).to eq("2026-07-27T00:00:00.000000Z")
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:description)
      expect { resource.run(**params) }.to raise_error(RunApi::Core::ValidationError)
    end
  end
end
