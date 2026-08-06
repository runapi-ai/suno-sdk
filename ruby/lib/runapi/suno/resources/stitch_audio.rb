module RunApi
  module Suno
    module Resources
      class StitchAudio < AudioAction
        ENDPOINT = "/api/v1/suno/stitch_audio"
        ACTION = "stitch-audio"
        def create(options: nil, **params) = super
      end
    end
  end
end
