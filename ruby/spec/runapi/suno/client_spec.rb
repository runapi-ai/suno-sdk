# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Suno::Client do
  after { RunApi.api_key = nil }

  it "accepts api_key as parameter" do
    client = described_class.new(api_key: "param-key")
    expect(client).to be_a(described_class)
  end

  it "falls back to global RunApi.api_key" do
    RunApi.api_key = "global-key"
    client = described_class.new
    expect(client).to be_a(described_class)
  end

  context "with custom http_client" do
    it "uses the provided http_client" do
      custom_http = double("custom_http")
      client = described_class.new(api_key: "test-key", http_client: custom_http)
      expect(client.text_to_music.instance_variable_get(:@http)).to eq(custom_http)
    end
  end

  context "with valid api_key" do
    let(:client) { described_class.new(api_key: "test-key") }

    {
      text_to_music: RunApi::Suno::Resources::TextToMusic,
      extend_music: RunApi::Suno::Resources::ExtendMusic,
      generate_artwork: RunApi::Suno::Resources::GenerateArtwork,
      cover_audio: RunApi::Suno::Resources::CoverAudio,
      add_instrumental: RunApi::Suno::Resources::AddInstrumental,
      add_vocals: RunApi::Suno::Resources::AddVocals,
      stitch_audio: RunApi::Suno::Resources::StitchAudio,
      remaster_audio: RunApi::Suno::Resources::RemasterAudio,
      add_samples: RunApi::Suno::Resources::AddSamples,
      separate_audio_stems: RunApi::Suno::Resources::SeparateAudioStems,
      generate_midi: RunApi::Suno::Resources::GenerateMidi,
      convert_audio: RunApi::Suno::Resources::ConvertAudio,
      visualize_music: RunApi::Suno::Resources::VisualizeMusic,
      generate_lyrics: RunApi::Suno::Resources::GenerateLyrics,
      blend_lyrics: RunApi::Suno::Resources::BlendLyrics,
      get_timestamped_lyrics: RunApi::Suno::Resources::GetTimestampedLyrics,
      replace_section: RunApi::Suno::Resources::ReplaceSection,
      create_mashup: RunApi::Suno::Resources::CreateMashup,
      text_to_sound: RunApi::Suno::Resources::TextToSound,
      voice_to_validation_phrase: RunApi::Suno::Resources::VoiceToValidationPhrase,
      regenerate_validation_phrase: RunApi::Suno::Resources::RegenerateValidationPhrase,
      generate_voice: RunApi::Suno::Resources::GenerateVoice,
      check_voice: RunApi::Suno::Resources::CheckVoice,
      generate_persona: RunApi::Suno::Resources::GeneratePersona,
      boost_style: RunApi::Suno::Resources::BoostStyle
    }.each do |reader, resource_class|
      it "exposes #{reader} resource" do
        expect(client.public_send(reader)).to be_a(resource_class)
      end
    end
  end
end
