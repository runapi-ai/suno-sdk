# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Step 1 of voice cloning: extracts a validation phrase from a voice recording for the user to re-record.
      class VoiceToValidationPhrase
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/voice_to_validation_phrase"
        RESPONSE_CLASS = Types::ValidationPhraseResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedValidationPhraseResponse

        def initialize(http)
          @http = http
        end

        def run(options: nil, **params)
          task = create(options: options, **params)
          poll_until_complete { get(task.id, options: options) }
        end

        def create(options: nil, **params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options)
        end

        private

        def validate_params!(params)
          Validators.validate_voice_to_validation_phrase!(params, self)
        end
      end
    end
  end
end
