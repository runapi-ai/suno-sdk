# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Blends two audio tracks into a single new composition.
      class CreateMashup
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/create_mashup"
        RESPONSE_CLASS = Types::CreateMashupResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedCreateMashupResponse

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
          Validators.validate_create_mashup!(params, self)
        end
      end
    end
  end
end
