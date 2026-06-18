# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Retrieves word-level timing alignment for a track. Synchronous (run only, no create/get polling).
      class GetTimestampedLyrics
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/get_timestamped_lyrics"
        RESPONSE_CLASS = Types::GetTimestampedLyricsResponse

        def initialize(http)
          @http = http
        end

        def run(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        private

        def validate_params!(params)
          Validators.validate_get_timestamped_lyrics!(params, self)
        end
      end
    end
  end
end
