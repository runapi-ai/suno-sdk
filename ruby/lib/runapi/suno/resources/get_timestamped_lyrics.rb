# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Retrieves word-level timing alignment for a track. Synchronous (run only, no create/get polling).
      #
      # @deprecated Use {RunApi::Suno::Resources::TimestampedLyrics} instead.
      class GetTimestampedLyrics
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/get_timestamped_lyrics"
        RESPONSE_CLASS = Types::GetTimestampedLyricsResponse

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
