# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Generates and adds an instrumental backing track to uploaded audio.
      class AddInstrumental
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/add_instrumental"
        RESPONSE_CLASS = Types::AddInstrumentalResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedAddInstrumentalResponse

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
          Validators.validate_add_instrumental!(params, self)
        end
      end
    end
  end
end
