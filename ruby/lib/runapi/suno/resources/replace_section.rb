# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      class ReplaceSection
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/replace_section"
        RESPONSE_CLASS = Types::ReplaceSectionResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedReplaceSectionResponse

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
          Validators.validate_replace_section!(params, self)
        end
      end
    end
  end
end
