# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::TimestampedLyrics do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/timestamped_lyrics" }
  let(:source_audio_id) { "res_0123456789abcdef0123456789abcdef0123456789abcdef" }
  let(:valid_params) { {source_audio_id: source_audio_id, source_task_id: "task-1"} }

  describe "#run" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return(
          "aligned_words" => [{"word" => "hi", "success" => true, "start_time" => 0.0, "end_time" => 0.5, "palign" => 0.9}],
          "waveform_data" => [0.1],
          "billing" => {"reservation" => {"amount_cents" => 5}, "settlement" => {"charged_amount_cents" => 5, "amount_micro_cents" => 5_000_000}, "refund" => nil}
        )

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::TimestampedLyricsResponse)
      expect(result.aligned_words.first.word).to eq("hi")
      expect(result.billing).to be_a(RunApi::Core::TaskBillingFacts)
      expect(result.billing.reservation.amount_cents).to eq(5)
    end

    it "accepts an audio resource ID without a source task" do
      expect(http).to receive(:request).with(:post, endpoint, body: {source_audio_id: source_audio_id})
        .and_return("aligned_words" => [], "billing" => {"reservation" => nil, "settlement" => nil, "refund" => nil})

      result = resource.run(source_audio_id: source_audio_id)
      expect(result.aligned_words).to eq([])
    end

    it "validates required params" do
      expect { resource.run }.to raise_error(RunApi::Core::ValidationError, /source_audio_id is required/)
    end
  end
end
