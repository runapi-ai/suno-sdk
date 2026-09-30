# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Creates and retrieves voices a music request can reuse.
      #
      # A voice is an account-owned resource: create it from a recording, then pass its
      # ID wherever a voice persona is accepted. +get+ reports whether the voice is
      # ready, so readiness needs no separate request.
      class Voices
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/voices"
        RESPONSE_CLASS = Types::VoiceCreationResponse
        RESOURCE_RESPONSE_CLASS = Types::VoiceResourceResponse

        def initialize(http)
          @http = http
        end

        def run(options: nil, **params)
          params = compact_params(params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        # Retrieves a voice resource by its account-owned ID.
        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options, response_class: RESOURCE_RESPONSE_CLASS)
        end
      end
    end
  end
end
