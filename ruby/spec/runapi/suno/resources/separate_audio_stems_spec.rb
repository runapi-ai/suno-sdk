# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::SeparateAudioStems do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/separate_audio_stems" }
  let(:valid_params) { {task_id: "t1", audio_id: "a1"} }

  describe "#create" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")

      result = resource.create(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::SeparateAudioStemsResponse)
      expect(result.id).to eq("task-1")
    end

    it "POSTs advanced stem separation params" do
      advanced_params = valid_params.merge(type: "split_stem_advanced", stem_name: "Bass")
      expect(http).to receive(:request).with(:post, endpoint, body: advanced_params)
        .and_return("id" => "task-advanced", "status" => "processing")

      result = resource.create(**advanced_params)

      expect(result.id).to eq("task-advanced")
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:task_id)
      expect { resource.create(**params) }.to raise_error(RunApi::Core::ValidationError)
    end

    it "requires stem_name for advanced separation" do
      expect {
        resource.create(**valid_params, type: "split_stem_advanced")
      }.to raise_error(
        RunApi::Core::ValidationError,
        "stem_name is required when type is split_stem_advanced"
      )
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed")

      result = resource.get("task-1")
      expect(result).to be_a(RunApi::Suno::Types::SeparateAudioStemsResponse)
      expect(result.status).to eq("completed")
    end

    it "decodes advanced extracted and remaining audio pairs" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-advanced")
        .and_return(
          "id" => "task-advanced",
          "status" => "completed",
          "separated_audios" => {
            "pairs" => [{
              "stem_name" => "Bass",
              "extracted_audio" => {"id" => "audio-bass", "duration_seconds" => 116.28, "audio_url" => "https://file.runapi.ai/bass.mp3"},
              "remaining_audio" => {"id" => "audio-without-bass", "duration_seconds" => 116.28, "audio_url" => "https://file.runapi.ai/without-bass.mp3"}
            }]
          }
        )

      pair = resource.get("task-advanced").separated_audios.pairs.first

      expect(pair.stem_name).to eq("Bass")
      expect(pair.extracted_audio.id).to eq("audio-bass")
      expect(pair.remaining_audio.audio_url).to eq("https://file.runapi.ai/without-bass.mp3")
    end
  end

  describe "#run" do
    it "creates then polls until complete" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("id" => "task-1", "status" => "processing")
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "processing")
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "separated_audios" => {"vocal_url" => "https://cdn.runapi.ai/public/samples/vocals.mp3", "instrumental_url" => "https://cdn.runapi.ai/public/samples/instrumental.mp3"})

      allow(RunApi::Core::Polling).to receive(:sleep)
      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::CompletedSeparateAudioStemsResponse)
    end
  end
end
