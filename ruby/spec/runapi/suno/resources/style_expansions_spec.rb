# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::StyleExpansions do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/style_expansions" }
  let(:valid_params) { {description: "dreamy slow synth pop"} }

  describe "#run" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return(
          "style" => "dream pop, shoegaze, slow synth"
        )

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::BoostStyleResponse)
      expect(result.style).to eq("dream pop, shoegaze, slow synth")
    end

    it "validates required params" do
      expect { resource.run }.to raise_error(RunApi::Core::ValidationError, /description is required/)
    end
  end
end
