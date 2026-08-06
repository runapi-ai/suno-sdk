# frozen_string_literal: true

module RunApi
  module Suno
    module Resources
      class AudioAction
        include RunApi::Core::ResourceHelpers

        def initialize(http) = @http = http

        def create(options: nil, **params)
          params = compact_params(params)
          validate_contract!(CONTRACT.fetch(self.class::ACTION), params)
          request(:post, self.class::ENDPOINT, body: params, options: options)
        end

        def get(id, options: nil) = request(:get, "#{self.class::ENDPOINT}/#{id}", options: options)

        def run(options: nil, **params)
          task = create(options: options, **params)
          poll_until_complete { get(task.id, options: options) }
        end
      end
    end
  end
end
