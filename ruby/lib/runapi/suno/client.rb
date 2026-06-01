# frozen_string_literal: true

module RunApi
  module Suno
    class Client
      attr_reader :text_to_music, :extend_music, :generate_artwork, :cover_audio,
        :add_instrumental, :add_vocals, :separate_audio_stems, :generate_midi,
        :convert_audio, :visualize_music, :generate_lyrics, :get_timestamped_lyrics,
        :replace_section, :create_mashup, :text_to_sound, :voice_to_validation_phrase,
        :regenerate_validation_phrase, :generate_voice, :check_voice, :generate_persona,
        :boost_style

      def initialize(api_key: nil, **options)
        @api_key = Core::Auth.resolve_api_key(api_key)

        client_options = Core::ClientOptions.new(api_key: @api_key, **options)
        http = client_options.http_client || Core::HttpClient.new(client_options)

        @text_to_music = Resources::TextToMusic.new(http)
        @extend_music = Resources::ExtendMusic.new(http)
        @generate_artwork = Resources::GenerateArtwork.new(http)
        @cover_audio = Resources::CoverAudio.new(http)
        @add_instrumental = Resources::AddInstrumental.new(http)
        @add_vocals = Resources::AddVocals.new(http)
        @separate_audio_stems = Resources::SeparateAudioStems.new(http)
        @generate_midi = Resources::GenerateMidi.new(http)
        @convert_audio = Resources::ConvertAudio.new(http)
        @visualize_music = Resources::VisualizeMusic.new(http)
        @generate_lyrics = Resources::GenerateLyrics.new(http)
        @get_timestamped_lyrics = Resources::GetTimestampedLyrics.new(http)
        @replace_section = Resources::ReplaceSection.new(http)
        @create_mashup = Resources::CreateMashup.new(http)
        @text_to_sound = Resources::TextToSound.new(http)
        @voice_to_validation_phrase = Resources::VoiceToValidationPhrase.new(http)
        @regenerate_validation_phrase = Resources::RegenerateValidationPhrase.new(http)
        @generate_voice = Resources::GenerateVoice.new(http)
        @check_voice = Resources::CheckVoice.new(http)
        @generate_persona = Resources::GeneratePersona.new(http)
        @boost_style = Resources::BoostStyle.new(http)
      end
    end
  end
end
