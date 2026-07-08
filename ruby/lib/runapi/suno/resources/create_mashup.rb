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
          Validators.validate_create_mashup!(params, self)
        end
      end
    end
  end
end
