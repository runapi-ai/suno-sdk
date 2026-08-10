# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      class InspireMusic < AudioAction
        ENDPOINT = "/api/v1/suno/inspire_music"
        ACTION = "inspire-music"
        def create(options: nil, **params) = super
      end
    end
  end
end
