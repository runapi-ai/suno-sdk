# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Generates style/genre tags from a text description for use in style fields. Synchronous (run only).
      class BoostStyle
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/boost_style"
        RESPONSE_CLASS = Types::BoostStyleResponse

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
          Validators.validate_boost_style!(params, self)
        end
      end
    end
  end
end
