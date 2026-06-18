# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      # Generates a music visualization video from an existing track.
      class VisualizeMusic
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/suno/visualize_music"
        RESPONSE_CLASS = Types::VisualizeMusicResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedVisualizeMusicResponse

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
          Validators.validate_visualize_music!(params, self)
        end
      end
    end
  end
end
