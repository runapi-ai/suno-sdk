module RunApi
  module Suno
    module Resources
      class AddSamples < AudioAction
        ENDPOINT = "/api/v1/suno/add_samples"
        ACTION = "add-samples"

        def create(options: nil, **params)
          if params[:end_seconds].to_f <= params[:start_seconds].to_f
            raise RunApi::Core::ValidationError, "end_seconds must be greater than start_seconds"
          end

          super
        end
      end
    end
  end
end
