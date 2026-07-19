# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::GetTimestampedLyrics do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/get_timestamped_lyrics" }
  let(:valid_params) { {task_id: "t1", audio_id: "a1"} }

  describe "#run" do
    it "POSTs to the correct endpoint" do
      expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
        .and_return("aligned_words" => [{"word" => "hi", "success" => true, "start_time" => 0.0, "end_time" => 0.5, "palign" => 0.9}], "waveform_data" => [0.1])

      result = resource.run(**valid_params)
      expect(result).to be_a(RunApi::Suno::Types::GetTimestampedLyricsResponse)
    end

    it "validates required params" do
      params = valid_params.dup
      params.delete(:task_id)
      expect { resource.run(**params) }.to raise_error(RunApi::Core::ValidationError)
    end
  end
end
