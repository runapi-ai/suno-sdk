# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::RegenerateValidationPhrase do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/regenerate_validation_phrase" }
  let(:valid_params) { {task_id: "validate-task-1"} }

  describe "#create" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::ValidationPhraseResponse)
      expect(result.id).to eq("task-1")
    end

    it "validates required params" do
      expect { resource.create }.to raise_error(RunApi::Core::ValidationError, /task_id is required/)
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "validation_phrase" => "Read this new phrase")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::ValidationPhraseResponse)
      expect(result.validation_phrase).to eq("Read this new phrase")
    end
  end
end
