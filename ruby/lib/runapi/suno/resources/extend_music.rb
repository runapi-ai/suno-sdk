# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Continues an existing track from a specified timestamp, inheriting or overriding its settings.
      class ExtendMusic
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/extend_music"
        RESPONSE_CLASS = Types::ExtendMusicResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedExtendMusicResponse

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
          Validators.validate_extend_music!(params, self)
        end
      end
    end
  end
end
