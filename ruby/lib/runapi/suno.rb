# frozen_string_literal: true

require "runapi/core"
require_relative "suno/types"
require_relative "suno/contract_gen"
require_relative "suno/validators"
require_relative "suno/resources/text_to_music"
require_relative "suno/resources/extend_music"
require_relative "suno/resources/generate_artwork"
require_relative "suno/resources/cover_audio"
require_relative "suno/resources/add_instrumental"
require_relative "suno/resources/add_vocals"
require_relative "suno/resources/separate_audio_stems"
require_relative "suno/resources/generate_midi"
require_relative "suno/resources/convert_audio"
require_relative "suno/resources/visualize_music"
require_relative "suno/resources/generate_lyrics"
require_relative "suno/resources/get_timestamped_lyrics"
require_relative "suno/resources/replace_section"
require_relative "suno/resources/create_mashup"
require_relative "suno/resources/text_to_sound"
require_relative "suno/resources/voice_to_validation_phrase"
require_relative "suno/resources/regenerate_validation_phrase"
require_relative "suno/resources/generate_voice"
require_relative "suno/resources/check_voice"
require_relative "suno/resources/generate_persona"
require_relative "suno/resources/boost_style"
require_relative "suno/client"

module RunApi
  module Suno
    AuthenticationError = RunApi::Core::AuthenticationError
    RateLimitError = RunApi::Core::RateLimitError
    InsufficientCreditsError = RunApi::Core::InsufficientCreditsError
    ValidationError = RunApi::Core::ValidationError
    NotFoundError = RunApi::Core::NotFoundError
    TaskFailedError = RunApi::Core::TaskFailedError
    TaskTimeoutError = RunApi::Core::TaskTimeoutError
  end
end
