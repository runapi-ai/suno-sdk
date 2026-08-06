module RunApi
  module Suno
    module Resources
      class RemasterAudio < AudioAction
        ENDPOINT = "/api/v1/suno/remaster_audio"
        ACTION = "remaster-audio"
        def create(options: nil, **params) = super
      end
    end
  end
end
