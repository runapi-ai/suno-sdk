# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Step 3 of voice cloning: trains a custom voice from the user's recording of the validation phrase.
      class GenerateVoice
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/generate_voice"
        RESPONSE_CLASS = Types::VoiceGenerationResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedVoiceGenerationResponse

        def initialize(http)
          @http = http
        end

        def run(**params)
          task = create(**params)
          poll_until_complete { get(task.id) }
        end

        def create(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        def get(id)
          request(:get, "#{ENDPOINT}/#{id}")
        end

        private

        def validate_params!(params)
          Validators.validate_generate_voice!(params, self)
        end
      end
    end
  end
end
