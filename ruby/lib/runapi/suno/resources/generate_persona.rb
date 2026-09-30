# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Creates a reusable style or voice persona from an existing track's vocals. Synchronous (run only).
      #
      # @deprecated Use {RunApi::Suno::Resources::Personas} instead, which returns an
      #   account-owned persona resource that later requests reference by ID.
      class GeneratePersona
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/generate_persona"
        RESPONSE_CLASS = Types::GeneratePersonaResponse

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
