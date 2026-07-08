# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Re-generates a time range within an existing track with new lyrics and style.
      class ReplaceSection
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/replace_section"
        RESPONSE_CLASS = Types::ReplaceSectionResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedReplaceSectionResponse

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
          Validators.validate_replace_section!(params, self)
        end
      end
    end
  end
end
