# frozen_string_literal: true

module RunApi
  module Suno
    module Types
      MODELS = %w[V5_5 V5 V4_5PLUS V4_5ALL V4_5 V4 V3_5].freeze
      SOUND_MODELS = %w[V5 V5_5].freeze
      SOUND_KEYS = %w[
        Cm C#m Dm D#m Em Fm F#m Gm G#m Am A#m Bm
        C C# D D# E F F# G G# A A# B
      ].freeze
      VOCAL_GENDERS = %w[f m].freeze
      PERSONA_MODELS = %w[style_persona voice_persona].freeze
      SEPARATE_AUDIO_STEMS_TYPES = %w[separate_vocal split_stem].freeze

      class Audio < RunApi::Core::BaseModel
        optional :id, String
        optional :audio_url, String
        optional :stream_audio_url, String
        optional :image_url, String
        optional :prompt, String
        optional :model_name, String
        optional :title, String
        optional :tags, [ String ]
        optional :duration, Numeric
      end

      class Cover < RunApi::Core::BaseModel
        required :url, String
      end

      class AlignedWord < RunApi::Core::BaseModel
        required :word, String
        required :success
        required :start_time, Numeric
        required :end_time, Numeric
        required :palign, Numeric
      end

      class SeparatedAudio < RunApi::Core::BaseModel
        optional :vocal_url, String
        optional :instrumental_url, String
        optional :backing_vocals_url, String
        optional :bass_url, String
        optional :brass_url, String
        optional :drums_url, String
        optional :fx_url, String
        optional :guitar_url, String
        optional :keyboard_url, String
        optional :percussion_url, String
        optional :piano_url, String
        optional :strings_url, String
        optional :synth_url, String
        optional :woodwinds_url, String
      end

      class MidiNote < RunApi::Core::BaseModel
        required :pitch, Numeric
        required :start_time, Numeric
        required :end_time, Numeric
        required :velocity, Numeric
      end

      class MidiInstrument < RunApi::Core::BaseModel
        required :name, String
        optional :notes, [ -> { MidiNote } ]
      end

      class Lyric < RunApi::Core::BaseModel
        optional :title, String
        required :text, String
      end

      class Persona < RunApi::Core::BaseModel
        required :id, String
        required :name, String
        required :description, String
      end

      class AsyncTaskResponse < RunApi::Core::TaskResponse
        required :id, String
        required :status, String, enum: -> { RunApi::Core::TaskResponse::Status::ALL }
        optional :generation_stage, String
        optional :error, String
      end

      class TextToMusicResponse < AsyncTaskResponse
        optional :audios, [ -> { Audio } ]
        optional :audio_url, String
      end

      class ExtendMusicResponse < AsyncTaskResponse
        optional :audios, [ -> { Audio } ]
        optional :original_task_id, String
      end

      class GenerateArtworkResponse < AsyncTaskResponse
        optional :covers, [ -> { Cover } ]
      end

      class CoverAudioResponse < AsyncTaskResponse
        optional :audios, [ -> { Audio } ]
      end

      class AddInstrumentalResponse < TextToMusicResponse; end
      class AddVocalsResponse < TextToMusicResponse; end
      class TextToSoundResponse < TextToMusicResponse; end

      class SeparateAudioStemsResponse < AsyncTaskResponse
        optional :separated_audios, -> { SeparatedAudio }
      end

      class GenerateMidiResponse < AsyncTaskResponse
        optional :instruments, [ -> { MidiInstrument } ]
      end

      class ConvertAudioResponse < AsyncTaskResponse
        optional :wav_url, String
        optional :original_task_id, String
      end

      class VisualizeMusicResponse < AsyncTaskResponse
        optional :video_url, String
        optional :original_task_id, String
      end

      class GenerateLyricsResponse < AsyncTaskResponse
        optional :lyrics, [ -> { Lyric } ]
      end

      class GetTimestampedLyricsResponse < RunApi::Core::BaseModel
        optional :aligned_words, [ -> { AlignedWord } ]
        optional :waveform_data, [ Numeric ]
        optional :hoot_cer, Numeric
        optional :is_streamed
      end

      class ReplaceSectionResponse < AsyncTaskResponse
        optional :track, -> { Audio }
        optional :audios, [ -> { Audio } ]
      end

      class GeneratePersonaResponse < RunApi::Core::BaseModel
        required :persona, -> { Persona }
        optional :error, String
      end

      class BoostStyleResponse < RunApi::Core::BaseModel
        optional :style, String
        optional :error, String
      end

      class CreateMashupResponse < AsyncTaskResponse
        optional :audio, -> { Audio }
        optional :audios, [ -> { Audio } ]
      end

      class CompletedTextToMusicResponse < TextToMusicResponse
        required :audios, [ -> { Audio } ]
      end

      class CompletedExtendMusicResponse < ExtendMusicResponse
        required :audios, [ -> { Audio } ]
      end

      class CompletedGenerateArtworkResponse < GenerateArtworkResponse
        required :covers, [ -> { Cover } ]
      end

      class CompletedCoverAudioResponse < CoverAudioResponse
        required :audios, [ -> { Audio } ]
      end

      class CompletedAddInstrumentalResponse < AddInstrumentalResponse
        required :audios, [ -> { Audio } ]
      end

      class CompletedAddVocalsResponse < AddVocalsResponse
        required :audios, [ -> { Audio } ]
      end

      class CompletedSeparateAudioStemsResponse < SeparateAudioStemsResponse
        required :separated_audios, -> { SeparatedAudio }
      end

      class CompletedGenerateMidiResponse < GenerateMidiResponse
        required :instruments, [ -> { MidiInstrument } ]
      end

      class CompletedConvertAudioResponse < ConvertAudioResponse
        required :wav_url, String
      end

      class CompletedVisualizeMusicResponse < VisualizeMusicResponse
        required :video_url, String
      end

      class CompletedGenerateLyricsResponse < GenerateLyricsResponse
        required :lyrics, [ -> { Lyric } ]
      end

      class CompletedReplaceSectionResponse < ReplaceSectionResponse
        required :track, -> { Audio }
      end

      class CompletedCreateMashupResponse < CreateMashupResponse
        required :audios, [ -> { Audio } ]
      end

      class CompletedTextToSoundResponse < TextToSoundResponse
        required :audios, [ -> { Audio } ]
      end
    end
  end
end
