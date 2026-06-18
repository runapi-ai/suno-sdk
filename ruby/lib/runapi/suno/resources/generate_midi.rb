# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Extracts per-instrument MIDI note data from a generated track.
      class GenerateMidi
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/generate_midi"
        RESPONSE_CLASS = Types::GenerateMidiResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedGenerateMidiResponse

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
          Validators.validate_generate_midi!(params, self)
        end
      end
    end
  end
end
