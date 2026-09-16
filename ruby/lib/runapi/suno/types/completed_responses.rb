# frozen_string_literal: true

module RunApi
  module Suno
    module Types
      class CompletedTextToMusicResponse < TextToMusicResponse
        required :audios, [-> { Audio }]
      end

      class CompletedExtendMusicResponse < ExtendMusicResponse
        required :audios, [-> { Audio }]
      end

      class CompletedGenerateArtworkResponse < GenerateArtworkResponse
        required :covers, [-> { Cover }]
      end

      class CompletedCoverAudioResponse < CoverAudioResponse
        required :audios, [-> { Audio }]
      end

      class CompletedAddInstrumentalResponse < AddInstrumentalResponse
        required :audios, [-> { Audio }]
      end

      class CompletedAddVocalsResponse < AddVocalsResponse
        required :audios, [-> { Audio }]
      end

      class CompletedSeparateAudioStemsResponse < SeparateAudioStemsResponse
        required :separated_audios, -> { SeparatedAudio }
      end

      class CompletedGenerateMidiResponse < GenerateMidiResponse
        required :instruments, [-> { MidiInstrument }]
      end

      class CompletedConvertAudioResponse < ConvertAudioResponse
        required :wav_url, String
      end

      class CompletedVisualizeMusicResponse < VisualizeMusicResponse
        required :video_url, String
      end

      class CompletedGenerateLyricsResponse < GenerateLyricsResponse
        required :lyrics, [-> { Lyric }]
      end

      class CompletedBlendLyricsResponse < BlendLyricsResponse
        required :lyrics, [-> { Lyric }]
      end

      class CompletedReplaceSectionResponse < ReplaceSectionResponse
        required :track, -> { Audio }
      end

      class CompletedCreateMashupResponse < CreateMashupResponse
        required :audios, [-> { Audio }]
      end

      class CompletedTextToSoundResponse < TextToSoundResponse
        required :audios, [-> { SoundAudio }]
      end

      class CompletedValidationPhraseResponse < ValidationPhraseResponse
        required :validation_phrase, String
      end

      class CompletedVoiceGenerationResponse < VoiceGenerationResponse
        required :voice_id, String
      end
    end
  end
end
