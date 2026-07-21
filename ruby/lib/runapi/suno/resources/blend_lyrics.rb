# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Blends two caller-authored lyrics texts into a new lyrics result.
      class BlendLyrics
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/blend_lyrics"
        RESPONSE_CLASS = Types::BlendLyricsResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedBlendLyricsResponse

        def initialize(http)
          @http = http
        end

        def run(options: nil, **params)
          task = create(options: options, **params)
          poll_until_complete { get(task.id, options: options) }
        end

        def create(options: nil, **params)
          params = compact_params(params)
          validate_contract!(CONTRACT["blend-lyrics"], params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options)
        end
      end
    end
  end
end
