# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Exports an existing track to a downloadable audio file.
      class AudioExports
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/audio_exports"
        RESPONSE_CLASS = Types::AudioExportResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedAudioExportResponse

        def initialize(http)
          @http = http
        end

        def run(options: nil, **params)
          task = create(options: options, **params)
          poll_until_complete { get(task.id, options: options) }
        end

        def create(options: nil, **params)
          params = compact_params(params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options)
        end
      end
    end
  end
end
