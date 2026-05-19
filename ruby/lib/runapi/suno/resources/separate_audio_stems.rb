# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      class SeparateAudioStems
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/separate_audio_stems"
        RESPONSE_CLASS = Types::SeparateAudioStemsResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedSeparateAudioStemsResponse

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
          Validators.validate_separate_audio_stems!(params, self)
        end
      end
    end
  end
end
