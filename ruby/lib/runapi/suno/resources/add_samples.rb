module RunApi
  module Suno
    module Resources
      # Adds a timed sample from an uploaded audio file to a music request.
      #
      # @deprecated Use {RunApi::Suno::Resources::MusicFromSample} instead.
      class AddSamples < AudioAction
        ENDPOINT = "/api/v1/suno/add_samples"
        ACTION = "add-samples"

        def create(options: nil, **params)
          super
        end
      end
    end
  end
end
