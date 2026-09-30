# frozen_string_literal: true

require "runapi/core"
require_relative "suno/types"
require_relative "suno/types/completed_responses"
require_relative "suno/types/resource_responses"
require_relative "suno/resources/text_to_music"
require_relative "suno/resources/extend_music"
require_relative "suno/resources/audio_action"
require_relative "suno/resources/stitch_audio"
require_relative "suno/resources/remaster_audio"
require_relative "suno/resources/add_samples"
require_relative "suno/resources/inspire_music"
require_relative "suno/resources/generate_artwork"
require_relative "suno/resources/cover_audio"
require_relative "suno/resources/add_instrumental"
require_relative "suno/resources/add_vocals"
require_relative "suno/resources/separate_audio_stems"
require_relative "suno/resources/generate_midi"
require_relative "suno/resources/convert_audio"
require_relative "suno/resources/visualize_music"
require_relative "suno/resources/generate_lyrics"
require_relative "suno/resources/blend_lyrics"
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
require_relative "suno/resources/personas"
require_relative "suno/resources/voices"
require_relative "suno/resources/style_expansions"
require_relative "suno/resources/timestamped_lyrics"
require_relative "suno/resources/audio_exports"
require_relative "suno/resources/music_visualizations"
require_relative "suno/resources/music_from_sample"
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
