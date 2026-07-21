# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Resources::BlendLyrics do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:resource) { described_class.new(http) }
  let(:endpoint) { "/api/v1/suno/blend_lyrics" }
  let(:valid_params) { {lyrics_a: "First verse", lyrics_b: "Second verse"} }

  it "creates and retrieves a lyrics blending task" do
    expect(http).to receive(:request).with(:post, endpoint, body: valid_params)
      .and_return("id" => "task-1", "status" => "processing")
    expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
      .and_return("id" => "task-1", "status" => "completed", "lyrics" => [{"text" => "Blended"}])

    task = resource.create(**valid_params)
    result = resource.get(task.id)

    expect(result).to be_a(RunApi::Suno::Types::BlendLyricsResponse)
    expect(result.lyrics.first.text).to eq("Blended")
  end

  it "requires both lyrics texts" do
    expect { resource.create(lyrics_a: "First verse") }
      .to raise_error(RunApi::Core::ValidationError, /lyrics_b/)
  end
end
