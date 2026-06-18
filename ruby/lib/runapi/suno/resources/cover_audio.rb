# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Re-records vocals over an uploaded audio file with a new style or voice.
      class CoverAudio
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/cover_audio"
        RESPONSE_CLASS = Types::CoverAudioResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedCoverAudioResponse

        def initialize(http)
          @http = http
        end

        def run(**params)
          task = create(**params)
          poll_until_complete { get(task.id) }
        end

        def create(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        def get(id)
          request(:get, "#{ENDPOINT}/#{id}")
        end

        private

        def validate_params!(params)
          Validators.validate_cover_audio!(params, self)
        end
      end
    end
  end
end
