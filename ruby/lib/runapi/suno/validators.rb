# frozen_string_literal: true

module RunApi
  module Suno
    module Validators
      module_function

      def validate_text_to_music!(params, resource)
        resource.send(:validate_contract!, CONTRACT["text-to-music"], params)
      end

      def validate_extend_music!(params, resource)
        unless %i[task_id audio_id audio_url upload_url].any? { |key| param(resource, params, key) }
          raise Core::ValidationError, "task_id, audio_id, audio_url, or upload_url is required"
        end
        require_param!(resource, params, :parameter_mode)
        require_param!(resource, params, :model)

        validate_optional!(resource, params, :parameter_mode, Types::PARAMETER_MODES)
        if param(resource, params, :parameter_mode) == "custom"
          require_param!(resource, params, :style)
          require_param!(resource, params, :title)
          require_param!(resource, params, :continue_at)
        end
        validate_extend_music_prompt_shape!(params, resource)
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
        validate_optional!(resource, params, :persona_type, Types::PERSONA_TYPES)
      end

      def validate_generate_artwork!(params, resource)
        require_param!(resource, params, :task_id)
      end

      def validate_cover_audio!(params, resource)
        resource.send(:validate_contract!, CONTRACT["cover-audio"], params)
      end

      def validate_add_instrumental!(params, resource)
        require_all!(resource, params, :upload_url, :title, :negative_tags, :tags, :model)
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
      end

      def validate_add_vocals!(params, resource)
        require_all!(resource, params, :upload_url, :lyrics, :title, :negative_tags, :style, :model)
        validate_optional!(resource, params, :model, Types::MODELS)
        validate_optional!(resource, params, :vocal_gender, Types::VOCAL_GENDERS)
      end

      def validate_separate_audio_stems!(params, resource)
        resource.send(:validate_contract!, CONTRACT["separate-audio-stems"], params)
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
        resource.send(:validate_contract!, CONTRACT["replace-section"], params)
        validate_replace_section_source!(params, resource)
        start_time = replace_section_time!(params, resource, :infill_start_time)
        end_time = replace_section_time!(params, resource, :infill_end_time)
        if end_time <= start_time
          raise Core::ValidationError, "infill_end_time must be greater than infill_start_time"
        end

        duration = end_time - start_time
        return if duration.between?(6, 60)

        raise Core::ValidationError, "replacement duration must be between 6 and 60 seconds"
      end

      def validate_create_mashup!(params, resource)
        resource.send(:validate_contract!, CONTRACT["create-mashup"], params)
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

      def validate_voice_to_validation_phrase!(params, resource)
        require_all!(resource, params, :voice_url, :vocal_start_seconds, :vocal_end_seconds)
        validate_optional!(resource, params, :language, Types::VALIDATION_PHRASE_LANGUAGES)

        start_seconds = param(resource, params, :vocal_start_seconds).to_i
        end_seconds = param(resource, params, :vocal_end_seconds).to_i
        return if end_seconds > start_seconds

        raise Core::ValidationError, "vocal_end_seconds must be greater than vocal_start_seconds"
      end

      def validate_regenerate_validation_phrase!(params, resource)
        require_param!(resource, params, :task_id)
      end

      def validate_generate_voice!(params, resource)
        require_all!(resource, params, :task_id, :verify_url)
        validate_optional!(resource, params, :singer_skill_level, Types::SINGER_SKILL_LEVELS)
      end

      def validate_check_voice!(params, resource)
        require_param!(resource, params, :task_id)
      end

      def validate_generate_persona!(params, resource)
        require_all!(resource, params, :task_id, :audio_id, :name, :description)
      end

      def validate_boost_style!(params, resource)
        require_param!(resource, params, :description)
      end

      def validate_extend_music_prompt_shape!(params, resource)
        return unless truthy_presence?(param(resource, params, :lyrics))

        if truthy_presence?(param(resource, params, :prompt))
          raise Core::ValidationError, "prompt cannot be combined with lyrics"
        end

        if truthy?(param(resource, params, :instrumental))
          raise Core::ValidationError, "lyrics cannot be used when instrumental is true"
        end

        upload_mode = %i[audio_url upload_url].any? { |key| truthy_presence?(param(resource, params, key)) }
        return if param(resource, params, :parameter_mode) == "custom" && upload_mode

        raise Core::ValidationError, "lyrics can only be used when extending uploaded audio with custom parameters"
      end

      def validate_replace_section_source!(params, resource)
        has_existing_source = %i[task_id audio_id].any? { |key| truthy_presence?(param(resource, params, key)) }
        has_uploaded_source = %i[upload_url model].any? { |key| truthy_presence?(param(resource, params, key)) }

        if has_existing_source && has_uploaded_source
          raise Core::ValidationError, "task_id/audio_id cannot be combined with upload_url/model"
        end

        if has_existing_source
          require_all!(resource, params, :task_id, :audio_id)
        elsif has_uploaded_source
          require_all!(resource, params, :upload_url, :model)
        else
          raise Core::ValidationError, "task_id and audio_id, or upload_url and model are required"
        end
      end

      def replace_section_time!(params, resource, key)
        value = param(resource, params, key)
        return value.to_f if value.is_a?(Numeric)

        raise Core::ValidationError, "#{key} must be a number"
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
        [true, 1, "1", "true", "TRUE", "True"].include?(value)
      end

      def truthy_presence?(value)
        return !value.empty? if value.respond_to?(:empty?)

        !value.nil?
      end
    end
  end
end
