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

        def run(options: nil, **params)
          task = create(options: options, **params)
          poll_until_complete { get(task.id, options: options) }
        end

        def create(options: nil, **params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options)
        end

        private

        def validate_params!(params)
          Validators.validate_cover_audio!(params, self)
        end
      end
    end
  end
end
