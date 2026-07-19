# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::ReplaceSection do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/replace_section" }
  let(:valid_params) { {task_id: "t1", audio_id: "a1", lyrics: "solo", full_lyrics: "[Verse] solo", tags: "rock", title: "Song", infill_start_time: 10, infill_end_time: 20} }
  let(:uploaded_params) { {upload_url: "https://cdn.runapi.ai/public/samples/music.mp3", model: "suno-v5.5", lyrics: "solo", full_lyrics: "[Verse] solo", tags: "rock", title: "Song", infill_start_time: 10, infill_end_time: 20} }

  describe "#create" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::ReplaceSectionResponse)
      expect(result.id).to eq("task-1")
    end

    it "POSTs uploaded audio source params" do
      expect(http).to receive(:request).with(:post, endpoint, body: uploaded_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**uploaded_params)
      expect(result).to be_a(RunApi::Suno::Types::ReplaceSectionResponse)
      expect(result.id).to eq("task-1")
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:task_id)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError)
    end

    it "rejects mixed source params" do
      params = valid_params.merge(upload_url: uploaded_params[:upload_url], model: uploaded_params[:model])
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError, /cannot be combined/)
    end

    it "rejects end time before start time" do
      params = valid_params.merge(infill_start_time: 10, infill_end_time: 5)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError, /infill_end_time must be greater than infill_start_time/)
    end

    it "rejects replacement duration shorter than six seconds" do
      params = valid_params.merge(infill_start_time: 10, infill_end_time: 15)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError, /replacement duration must be between 6 and 60 seconds/)
    end

    it "rejects replacement duration longer than sixty seconds" do
      params = valid_params.merge(infill_start_time: 10, infill_end_time: 71)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError, /replacement duration must be between 6 and 60 seconds/)
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::ReplaceSectionResponse)
      expect(result.status).to eq("completed")
    end
  end

  describe "#run" do
    it "creates then polls until complete" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "processing")
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "track" => {"id" => "a6", "audio_url" => "https://cdn.runapi.ai/public/samples/audio-7.mp3"})

      allow(RunApi::Core::Polling).to receive(:sleep)
      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CompletedReplaceSectionResponse)
    end
  end
end
