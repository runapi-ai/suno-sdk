# frozen_string_literal: true

require "spec_helper"

RSpec.describe "Suno audio action resources" do
  let(:http) { instance_double(RunApi::Core::HttpClient) }

  it "posts the public stitch, remaster, and sample request shapes" do
    owned = {model: "suno-v5", source_task_id: "source", audio_id: "audio"}
    samples = {
      model: "suno-v5", audio_url: "https://file.runapi.ai/source.mp3",
      start_seconds: 5, end_seconds: 20
    }
    allow(http).to receive(:request).and_return("id" => "task", "status" => "processing")

    RunApi::Suno::Resources::StitchAudio.new(http).create(**owned)
    RunApi::Suno::Resources::RemasterAudio.new(http).create(**owned)
    RunApi::Suno::Resources::AddSamples.new(http).create(**samples)

    expect(http).to have_received(:request).with(:post, "/api/v1/suno/stitch_audio", body: owned)
    expect(http).to have_received(:request).with(:post, "/api/v1/suno/remaster_audio", body: owned)
    expect(http).to have_received(:request).with(:post, "/api/v1/suno/add_samples", body: samples)
  end

  it "rejects an invalid samples window before the request" do
    resource = RunApi::Suno::Resources::AddSamples.new(http)
    expect do
      resource.create(
        model: "suno-v5", audio_url: "https://file.runapi.ai/source.mp3",
        start_seconds: 20, end_seconds: 20
      )
    end.to raise_error(RunApi::Core::ValidationError, /end_seconds must be greater than start_seconds/)
  end
end
