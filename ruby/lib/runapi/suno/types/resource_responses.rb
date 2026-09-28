# frozen_string_literal: true

module RunApi
  module Suno
    module Types
      module ResourceStatus
        AVAILABLE = "available"
        FAILED = "failed"

        ALL = [AVAILABLE, FAILED].freeze
      end

      class PersonaResource < RunApi::Core::BaseModel
        required :id, String
        optional :name, String
        optional :description, String
      end

      class VoiceResource < RunApi::Core::BaseModel
        required :id, String
        optional :name, String
      end

      class PersonaCreationResponse < RunApi::Core::BaseModel
        optional :persona, -> { PersonaResource }
        optional :id, String
        optional :status, String
        optional :error, String
      end

      class VoiceCreationResponse < RunApi::Core::BaseModel
        required :voice, -> { VoiceResource }
      end

      class TimestampedLyricsResponse < RunApi::Core::BaseModel
        optional :aligned_words, [-> { AlignedWord }]
        optional :waveform_data, [Numeric]
        optional :hoct_cer, Numeric
        optional :is_streamed
      end

      class PersonaResourceResponse < RunApi::Core::BaseModel
        required :persona, -> { PersonaResource }
        required :status, String, enum: -> { ResourceStatus::ALL }
      end

      class VoiceResourceResponse < RunApi::Core::BaseModel
        required :voice, -> { VoiceResource }
        required :status, String, enum: -> { ResourceStatus::ALL }
      end

      class AudioExportResponse < AsyncTaskResponse
        optional :wav_url, String
        optional :original_task_id, String
      end

      class MusicVisualizationResponse < AsyncTaskResponse
        optional :video_url, String
        optional :original_task_id, String
      end

      class MusicFromSampleResponse < AsyncTaskResponse
        optional :audios, [-> { Audio }]
      end

      class CompletedAudioExportResponse < AudioExportResponse
        required :wav_url, String
      end

      class CompletedMusicVisualizationResponse < MusicVisualizationResponse
        required :video_url, String
      end

      class CompletedMusicFromSampleResponse < MusicFromSampleResponse
        required :audios, [-> { Audio }]
      end
    end
  end
end
