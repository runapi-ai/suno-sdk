# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Retrieves word-level timing alignment for an existing track.
      # Synchronous (run only, no create/get polling).
      class TimestampedLyrics
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/timestamped_lyrics"
        RESPONSE_CLASS = Types::TimestampedLyricsResponse

        def initialize(http)
          @http = http
        end

        def run(options: nil, **params)
          params = compact_params(params)
          request(:post, ENDPOINT, body: params, options: options)
        end
      end
    end
  end
end
