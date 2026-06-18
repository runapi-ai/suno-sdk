# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Generates songs from a text prompt with configurable vocal mode, style, and persona.
      class TextToMusic
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/text_to_music"
        RESPONSE_CLASS = Types::TextToMusicResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedTextToMusicResponse

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
          Validators.validate_text_to_music!(params, self)
        end
      end
    end
  end
end
