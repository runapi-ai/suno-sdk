# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Expands a style description into genre tags for use in style fields.
      # Synchronous (run only, no create/get polling).
      class StyleExpansions
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/style_expansions"
        RESPONSE_CLASS = Types::BoostStyleResponse

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
