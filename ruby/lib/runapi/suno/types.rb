# frozen_string_literal: true

module RunApi
  module Suno
    # Suno type definitions, response models, and enum constants.
    module Types
      # Suno music generation engine versions. V5.5 has highest quality; V4 is the earliest available.
      MODELS = %w[suno-v5.5 suno-v5 suno-v4.5-plus suno-v4.5-all suno-v4.5 suno-v4].freeze
      # Model versions that support sound effect generation (subset of MODELS).
      SOUND_MODELS = %w[suno-v5 suno-v5.5].freeze
      # Musical keys (major and minor) for sound effect generation.
      SOUND_KEYS = %w[
        Cm C#m Dm D#m Em Fm F#m Gm G#m Am A#m Bm
        C C# D D# E F F# G G# A A# B
      ].freeze
      VOCAL_GENDERS = %w[female male].freeze
      # "style" applies genre/mood without changing voice; "voice" applies cloned voice characteristics.
      PERSONA_TYPES = %w[style voice].freeze
      # "source" inherits settings from the original track; "custom" requires explicit values.
      PARAMETER_MODES = %w[source custom].freeze
      # auto_lyrics: generates from prompt; exact_lyrics: sings literal lyrics; instrumental: no vocals.
      VOCAL_MODES = %w[auto_lyrics exact_lyrics instrumental].freeze
      # separate_vocal: isolates vocals+instrumental; split_stem: splits into all individual instruments.
      SEPARATE_AUDIO_STEMS_TYPES = %w[separate_vocal split_stem].freeze
      # Language for the voice-cloning validation phrase the user must read back.
      VALIDATION_PHRASE_LANGUAGES = %w[en zh es fr pt de ja ko hi ru].freeze
      # Singing ability of the voice being cloned; calibrates model expectations.
      SINGER_SKILL_LEVELS = %w[beginner intermediate advanced professional].freeze

      # Metadata and URLs for a generated music track.
      class Audio < RunApi::Core::BaseModel
        optional :id, String
        optional :audio_url, String
        optional :stream_audio_url, String
        optional :image_url, String
        optional :lyrics, String
        optional :model_name, String
        optional :title, String
        optional :tags, [String]
        optional :duration, Numeric
      end

      # Metadata and URLs for a generated sound effect (distinct from music Audio).
      class SoundAudio < RunApi::Core::BaseModel
        optional :id, String
        optional :audio_url, String
        optional :stream_audio_url, String
        optional :image_url, String
        optional :prompt, String
        optional :model_name, String
        optional :title, String
        optional :tags, [String]
        optional :duration, Numeric
      end

      # A URL to a generated cover artwork image.
      class Cover < RunApi::Core::BaseModel
        required :url, String
      end

      # Word-level timing alignment for a single word in a track.
      class AlignedWord < RunApi::Core::BaseModel
        required :word, String
        required :success
        required :start_time, Numeric
        required :end_time, Numeric
        required :palign, Numeric
      end

      # URLs for each isolated instrument stem after separation. Only populated stems have URLs.
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

      # A single MIDI note event within an instrument track.
      class MidiNote < RunApi::Core::BaseModel
        required :pitch, Numeric
        required :start_time, Numeric
        required :end_time, Numeric
        required :velocity, Numeric
      end

      # All notes for a single instrument extracted from a track.
      class MidiInstrument < RunApi::Core::BaseModel
        required :name, String
        optional :notes, [-> { MidiNote }]
      end

      # A section of generated lyrics with an optional section title (e.g. "Chorus", "Verse 1").
      class Lyric < RunApi::Core::BaseModel
        optional :title, String
        required :text, String
      end

      # A reusable style or voice persona, referenced by ID in generation params.
      class Persona < RunApi::Core::BaseModel
        required :id, String
        required :name, String
        required :description, String
      end

      # Base response for all Suno async tasks, carrying lifecycle status and generation progress.
      class AsyncTaskResponse < RunApi::Core::TaskResponse
        required :id, String
        required :status, String, enum: -> { RunApi::Core::TaskResponse::Status::ALL }
        optional :generation_stage, String
        optional :error, String
      end

      # Result of a text-to-music generation task.
      class TextToMusicResponse < AsyncTaskResponse
        optional :audios, [-> { Audio }]
        optional :audio_url, String
      end

      # Result of a music extension task. +original_task_id+ references the source track.
      class ExtendMusicResponse < AsyncTaskResponse
        optional :audios, [-> { Audio }]
        optional :original_task_id, String
      end

      # Result of an artwork generation task containing cover image URLs.
      class GenerateArtworkResponse < AsyncTaskResponse
        optional :covers, [-> { Cover }]
      end

      # Result of a cover audio task.
      class CoverAudioResponse < AsyncTaskResponse
        optional :audios, [-> { Audio }]
      end

      # Result of adding an instrumental backing track.
      class AddInstrumentalResponse < TextToMusicResponse; end
      # Result of adding vocals to a track.
      class AddVocalsResponse < TextToMusicResponse; end

      # Result of a sound effect generation task (uses SoundAudio instead of Audio).
      class TextToSoundResponse < AsyncTaskResponse
        optional :audios, [-> { SoundAudio }]
      end

      # Result of a stem separation task.
      class SeparateAudioStemsResponse < AsyncTaskResponse
        optional :separated_audios, -> { SeparatedAudio }
      end

      # Result of a MIDI extraction task with per-instrument note data.
      class GenerateMidiResponse < AsyncTaskResponse
        optional :instruments, [-> { MidiInstrument }]
      end

      # Result of a WAV conversion task.
      class ConvertAudioResponse < AsyncTaskResponse
        optional :wav_url, String
        optional :original_task_id, String
      end

      # Result of a music visualization task containing the generated video URL.
      class VisualizeMusicResponse < AsyncTaskResponse
        optional :video_url, String
        optional :original_task_id, String
      end

      # Result of a lyrics generation task with sectioned lyrics.
      class GenerateLyricsResponse < AsyncTaskResponse
        optional :lyrics, [-> { Lyric }]
      end

      # Synchronous response containing word-level timing data and waveform for a track.
      class GetTimestampedLyricsResponse < RunApi::Core::BaseModel
        optional :aligned_words, [-> { AlignedWord }]
        optional :waveform_data, [Numeric]
        optional :hoot_cer, Numeric
        optional :is_streamed
      end

      # Result of a section replacement task.
      class ReplaceSectionResponse < AsyncTaskResponse
        optional :track, -> { Audio }
        optional :audios, [-> { Audio }]
      end

      # Synchronous result of persona creation.
      class GeneratePersonaResponse < RunApi::Core::BaseModel
        required :persona, -> { Persona }
        optional :error, String
      end

      # Synchronous result of style tag generation. +style+ contains the generated tags string.
      class BoostStyleResponse < RunApi::Core::BaseModel
        optional :style, String
        optional :error, String
      end

      # Result of a mashup task.
      class CreateMashupResponse < AsyncTaskResponse
        optional :audio, -> { Audio }
        optional :audios, [-> { Audio }]
      end

      # Result of a voice-cloning validation phrase task. The user must re-record this phrase.
      class ValidationPhraseResponse < AsyncTaskResponse
        optional :provider_status, String
        optional :validation_phrase, String
      end

      # Result of a voice generation (training) task. +voice_id+ is usable in subsequent generation params.
      class VoiceGenerationResponse < AsyncTaskResponse
        optional :provider_status, String
        optional :voice_id, String
      end

      # Synchronous result indicating whether a custom voice is ready for use.
      class CheckVoiceResponse < RunApi::Core::BaseModel
        optional :is_available
        optional :error, String
      end

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
