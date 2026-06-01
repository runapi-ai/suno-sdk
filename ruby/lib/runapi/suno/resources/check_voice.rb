# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      class CheckVoice
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/check_voice"
        RESPONSE_CLASS = Types::CheckVoiceResponse

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
          Validators.validate_check_voice!(params, self)
        end
      end
    end
  end
end
