# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      class GeneratePersona
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/generate_persona"
        RESPONSE_CLASS = Types::GeneratePersonaResponse

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
          Validators.validate_generate_persona!(params, self)
        end
      end
    end
  end
end
