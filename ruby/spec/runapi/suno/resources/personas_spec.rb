# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::Personas do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/personas" }
  let(:valid_params) do
    {source_task_id: "task-1", source_audio_id: "audio-1", name: "Singer", description: "Warm voice"}
  end

  describe "#run" do
    it "POSTs to the correct endpoint and returns the created persona" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params, options: anything)
        .and_return(
          "persona" => {"id" => "per-1", "name" => "Singer", "description" => "Warm voice"},
          "billing" => {"reservation" => nil, "settlement" => {"charged_amount_cents" => 10, "amount_micro_cents" => 10_000_000}, "refund" => nil}
        )

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::PersonaCreationResponse)
      expect(result.persona).to be_a(RunApi::Suno::Types::PersonaResource)
      expect(result.persona.id).to eq("per-1")
      expect(result.billing).to be_a(RunApi::Core::TaskBillingFacts)
      expect(result.billing.settlement.charged_amount_cents).to eq(10)
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:source_task_id)
      expect { resource.run(**params) }.to raise_error(RunApi::Core::ValidationError, /source_task_id is required/)
    end
  end

  describe "#create" do
    it "returns the finished persona for a request handled inline" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return(
          "persona" => {"id" => "per-1", "name" => "Singer", "description" => "Warm voice"},
          "billing" => {"reservation" => {"amount_cents" => 2}, "settlement" => nil, "refund" => nil}
        )

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::PersonaCreationResponse)
      expect(result.persona.id).to eq("per-1")
      expect(result.billing.reservation.amount_cents).to eq(2)
    end

    it "returns the acceptance of a request deferred to local execution" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return(
          RunApi::Core::Response.new(
            body: {"id" => "task-1", "status" => "pending"},
            headers: {
              "Content-Type" => "application/json",
              "Location" => "https://api.runapi.ai/api/v1/tasks/task-1",
              "Retry-After" => "1"
            },
            status: 202
          )
        )

      result = resource.create(**valid_params)
      expect(result.id).to eq("task-1")
      expect(result.status).to eq("pending")
      expect(result.persona).to be_nil
      expect(result.response_header("Location")).to eq("https://api.runapi.ai/api/v1/tasks/task-1")
      expect(result.response_header("Retry-After")).to eq("1")
    end
  end

  describe "#subscribe" do
    it "yields processing updates before the terminal persona" do
      location = "https://api.runapi.ai/api/v1/tasks/task-1"
      allow(http).to receive(:request).and_return(
        RunApi::Core::Response.new(
          body: {"id" => "task-1", "status" => "processing"},
          headers: {"Content-Type" => "application/json", "Location" => location, "Retry-After" => "0"},
          status: 202
        ),
        RunApi::Core::Response.new(
          body: {"id" => "task-1", "status" => "processing"},
          headers: {"Content-Type" => "application/json"},
          status: 200
        ),
        RunApi::Core::Response.new(
          body: {
            "id" => "task-1",
            "status" => "completed",
            "response" => {
              "status" => 200,
              "content_type" => "application/json",
              "headers" => {},
              "body" => {
                "persona" => {"id" => "per-1", "name" => "Singer", "description" => "Warm voice"},
                "billing" => {"reservation" => nil, "settlement" => nil, "refund" => nil}
              }
            }
          },
          headers: {"Content-Type" => "application/json"},
          status: 200
        )
      )

      updates = resource.subscribe(**valid_params).to_a

      expect(updates.first.status).to eq("processing")
      expect(updates.last).to be_a(RunApi::Suno::Types::PersonaCreationResponse)
      expect(updates.last.persona.id).to eq("per-1")
    end
  end

  describe "#get" do
    it "GETs the resource endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/per-1")
        .and_return(
          "persona" => {"id" => "per-1", "name" => "Singer", "description" => "Warm voice"},
          "status" => "available",
          "billing" => {}
        )

      result = resource.get("per-1")
      expect(result).to be_a(RunApi::Suno::Types::PersonaResourceResponse)
      expect(result.status).to eq("available")
      expect(result.billing).to be_a(RunApi::Suno::Types::ResourceBilling)
    end
  end
end
