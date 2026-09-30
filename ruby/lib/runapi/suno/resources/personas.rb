# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Creates and retrieves the personas a music request can reuse.
      #
      # A persona is an account-owned resource: create it once, then pass its ID in
      # the persona_id field of music generation params. Holding the resource ID
      # instead of the creating request keeps a workflow resumable after that request
      # is gone. A request handled inline returns the persona; a request accepted for
      # deferred execution is followed to its stored result.
      class Personas
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/personas"
        RESPONSE_CLASS = Types::PersonaCreationResponse
        RESOURCE_RESPONSE_CLASS = Types::PersonaResourceResponse

        def initialize(http)
          @http = http
        end

        def run(options: nil, **params)
          params = compact_params(params)
          run_hybrid(ENDPOINT, body: params, options: options, response_class: RESPONSE_CLASS)
        end

        # Submits a persona request. A request handled inline carries the finished
        # persona; a request accepted for deferred execution carries its task ID
        # and status, plus Location and Retry-After response headers.
        def create(options: nil, **params)
          params = compact_params(params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        def subscribe(options: nil, **params)
          params = compact_params(params)
          subscribe_hybrid(ENDPOINT, body: params, options: options, response_class: RESPONSE_CLASS)
        end

        # Retrieves a persona resource by its account-owned ID.
        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options, response_class: RESOURCE_RESPONSE_CLASS)
        end
      end
    end
  end
end
