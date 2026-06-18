# frozen_string_literal: true

module RunApi
  module Suno
    # Suno music platform client covering song generation, extension, covers, stems,
    # MIDI, lyrics, mashups, sound effects, visualization, personas, and voice cloning.
    #
    # @example Generate a song from a text prompt
    #   client = RunApi::Suno::Client.new(api_key: "sk-your-api-key")
    #   result = client.text_to_music.run(
    #     prompt: "A chill lo-fi beat with soft vocals",
    #     model: "suno-v4.5-plus"
    #   )
    class Client < RunApi::Core::Client
      # @return [Resources::TextToMusic] generates songs from a text prompt with configurable vocal mode, style, and persona
      attr_reader :text_to_music
      # @return [Resources::ExtendMusic] continues an existing track from a specified timestamp
      attr_reader :extend_music
      # @return [Resources::GenerateArtwork] creates cover artwork for an existing music task
      attr_reader :generate_artwork
      # @return [Resources::CoverAudio] re-records vocals over an uploaded audio file with a new style or voice
      attr_reader :cover_audio
      # @return [Resources::AddInstrumental] generates and adds an instrumental backing track to uploaded audio
      attr_reader :add_instrumental
      # @return [Resources::AddVocals] generates and adds vocals to an uploaded instrumental track
      attr_reader :add_vocals
      # @return [Resources::SeparateAudioStems] splits a track into individual instrument stems
      attr_reader :separate_audio_stems
      # @return [Resources::GenerateMidi] extracts per-instrument MIDI note data from a generated track
      attr_reader :generate_midi
      # @return [Resources::ConvertAudio] converts a generated track to WAV format
      attr_reader :convert_audio
      # @return [Resources::VisualizeMusic] generates a music visualization video from an existing track
      attr_reader :visualize_music
      # @return [Resources::GenerateLyrics] produces AI-generated lyrics from a text prompt
      attr_reader :generate_lyrics
      # @return [Resources::GetTimestampedLyrics] retrieves word-level timing alignment for a track (synchronous)
      attr_reader :get_timestamped_lyrics
      # @return [Resources::ReplaceSection] re-generates a time range within an existing track
      attr_reader :replace_section
      # @return [Resources::CreateMashup] blends two audio tracks into a single new composition
      attr_reader :create_mashup
      # @return [Resources::TextToSound] generates sound effects from a text description
      attr_reader :text_to_sound
      # @return [Resources::VoiceToValidationPhrase] step 1 of voice cloning: extracts a validation phrase
      attr_reader :voice_to_validation_phrase
      # @return [Resources::RegenerateValidationPhrase] step 2 (optional) of voice cloning: requests a new phrase
      attr_reader :regenerate_validation_phrase
      # @return [Resources::GenerateVoice] step 3 of voice cloning: trains a custom voice
      attr_reader :generate_voice
      # @return [Resources::CheckVoice] step 4 of voice cloning: checks whether a custom voice is ready (synchronous)
      attr_reader :check_voice
      # @return [Resources::GeneratePersona] creates a reusable style or voice persona from a track's vocals (synchronous)
      attr_reader :generate_persona
      # @return [Resources::BoostStyle] generates style/genre tags from a text description (synchronous)
      attr_reader :boost_style

      def initialize(api_key: nil, **options)
        super

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
