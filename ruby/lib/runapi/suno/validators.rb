# frozen_string_literal: true

module RunApi
  module Suno
    module Validators
      module_function

      def validate_text_to_music!(params, resource)
        if param(resource, params, :custom_mode)
          require_param!(resource, params, :style)
          require_param!(resource, params, :title)
        else
          require_param!(resource, params, :prompt)
        end
        require_param!(resource, params, :model)
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
        validate_optional!(resource, params, :persona_model, Types::PERSONA_MODELS)
      end

      def validate_extend_music!(params, resource)
        unless %i[task_id audio_id audio_url upload_url].any? { |key| param(resource, params, key) }
          raise Core::ValidationError, "task_id, audio_id, audio_url, or upload_url is required"
        end
        require_param!(resource, params, :default_param_flag)
        require_param!(resource, params, :model)

        if truthy?(param(resource, params, :default_param_flag))
          require_param!(resource, params, :style)
          require_param!(resource, params, :title)
          require_param!(resource, params, :continue_at)
        end
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
        validate_optional!(resource, params, :persona_model, Types::PERSONA_MODELS)
      end

      def validate_generate_artwork!(params, resource)
        require_param!(resource, params, :task_id)
      end

      def validate_cover_audio!(params, resource)
        require_param!(resource, params, :upload_url)
        require_param!(resource, params, :model)
        if param(resource, params, :custom_mode)
          require_param!(resource, params, :style)
          require_param!(resource, params, :title)
        else
          require_param!(resource, params, :prompt)
        end
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
        validate_optional!(resource, params, :persona_model, Types::PERSONA_MODELS)
      end

      def validate_add_instrumental!(params, resource)
        require_all!(resource, params, :upload_url, :title, :negative_tags, :tags, :model)
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
      end

      def validate_add_vocals!(params, resource)
        require_all!(resource, params, :upload_url, :prompt, :title, :negative_tags, :style, :model)
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
      end

      def validate_separate_audio_stems!(params, resource)
        require_all!(resource, params, :task_id, :audio_id)
        validate_optional!(resource, params, :type, Types::SEPARATE_AUDIO_STEMS_TYPES)
      end

      def validate_generate_midi!(params, resource)
        require_param!(resource, params, :task_id)
      end

      def validate_convert_audio!(params, resource)
        require_all!(resource, params, :task_id, :audio_id)
      end

      def validate_visualize_music!(params, resource)
        require_all!(resource, params, :task_id, :audio_id)
      end

      def validate_generate_lyrics!(params, resource)
        require_param!(resource, params, :prompt)
      end

      def validate_get_timestamped_lyrics!(params, resource)
        require_all!(resource, params, :task_id, :audio_id)
      end

      def validate_replace_section!(params, resource)
        require_all!(resource, params, :task_id, :audio_id, :prompt, :tags, :title, :infill_start_time, :infill_end_time)
        if param(resource, params, :infill_end_time).to_f <= param(resource, params, :infill_start_time).to_f
          raise Core::ValidationError, "infill_end_time must be greater than infill_start_time"
        end
      end

      def validate_create_mashup!(params, resource)
        upload_url_list = param(resource, params, :upload_url_list)
        unless upload_url_list.is_a?(Array) && upload_url_list.size == 2
          raise Core::ValidationError, "upload_url_list must contain exactly 2 URLs"
        end
        require_param!(resource, params, :model)
        if param(resource, params, :custom_mode)
          require_all!(resource, params, :style, :title)
          require_param!(resource, params, :prompt) unless truthy?(param(resource, params, :instrumental))
        else
          require_param!(resource, params, :prompt)
        end
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
      end

      def validate_text_to_sound!(params, resource)
        require_all!(resource, params, :prompt, :model)
        validate_optional!(resource, params, :model, Types::SOUND_MODELS)
        validate_optional!(resource, params, :sound_key, Types::SOUND_KEYS)
        tempo = param(resource, params, :sound_tempo)
        if tempo && !(1..300).cover?(tempo.to_i)
          raise Core::ValidationError, "sound_tempo must be between 1 and 300"
        end
      end

      def validate_generate_persona!(params, resource)
        require_all!(resource, params, :task_id, :audio_id, :name, :description)
      end

      def validate_boost_style!(params, resource)
        require_param!(resource, params, :description)
      end

      def require_all!(resource, params, *keys)
        keys.each { |key| require_param!(resource, params, key) }
      end

      def require_param!(resource, params, key)
        raise Core::ValidationError, "#{key} is required" if param(resource, params, key).nil?
      end

      def param(resource, params, key)
        resource.send(:param, params, key)
      end

      def validate_optional!(resource, params, key, allowed)
        resource.send(:validate_optional!, params, key, allowed)
      end

      def truthy?(value)
        [ true, 1, "1", "true", "TRUE", "True" ].include?(value)
      end
    end
  end
end
