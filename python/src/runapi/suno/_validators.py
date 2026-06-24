"""Shared Suno request validators.

Ported from the Ruby ``RunApi::Suno::Validators`` module. Each ``validate_*``
function mirrors its Ruby counterpart, including the exact ``ValidationError``
message strings. Resources call these from their ``_validate_params`` hook.
"""

from __future__ import annotations

from typing import Any, Dict, Sequence

from runapi.core import ValidationError

from . import types

_TRUTHY_VALUES = [True, 1, "1", "true", "TRUE", "True"]


def _param(params: Dict[str, Any], key: str) -> Any:
    return params.get(key)


def _truthy(value: Any) -> bool:
    return value in _TRUTHY_VALUES


def _truthy_presence(value: Any) -> bool:
    if hasattr(value, "__len__"):
        return len(value) > 0
    return value is not None


def _to_i(value: Any) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        if isinstance(value, str):
            digits = ""
            for ch in value.strip():
                if ch in "+-" and not digits:
                    digits += ch
                elif ch.isdigit():
                    digits += ch
                else:
                    break
            try:
                return int(digits)
            except ValueError:
                return 0
        return 0


def _to_f(value: Any) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def require_param(params: Dict[str, Any], key: str) -> None:
    if _param(params, key) is None:
        raise ValidationError(f"{key} is required")


def require_all(params: Dict[str, Any], *keys: str) -> None:
    for key in keys:
        require_param(params, key)


def validate_optional(params: Dict[str, Any], key: str, allowed: Sequence[Any]) -> None:
    value = params.get(key)
    if value is None:
        return
    if value not in allowed:
        joined = ", ".join(str(option) for option in allowed)
        raise ValidationError(f"Invalid {key}: {value}. Must be one of: {joined}")


def validate_extend_music_prompt_shape(params: Dict[str, Any]) -> None:
    if not _truthy_presence(_param(params, "lyrics")):
        return

    if _truthy_presence(_param(params, "prompt")):
        raise ValidationError("prompt cannot be combined with lyrics")

    if _truthy(_param(params, "instrumental")):
        raise ValidationError("lyrics cannot be used when instrumental is true")

    upload_mode = any(_truthy_presence(_param(params, key)) for key in ("audio_url", "upload_url"))
    if _param(params, "parameter_mode") == "custom" and upload_mode:
        return

    raise ValidationError("lyrics can only be used when extending uploaded audio with custom parameters")


def validate_extend_music(params: Dict[str, Any]) -> None:
    if not any(_param(params, key) for key in ("task_id", "audio_id", "audio_url", "upload_url")):
        raise ValidationError("task_id, audio_id, audio_url, or upload_url is required")
    require_param(params, "parameter_mode")
    require_param(params, "model")

    validate_optional(params, "parameter_mode", types.PARAMETER_MODES)
    if _param(params, "parameter_mode") == "custom":
        require_param(params, "style")
        require_param(params, "title")
        require_param(params, "continue_at")
    validate_extend_music_prompt_shape(params)
    validate_optional(params, "model", types.MODELS)
    validate_optional(params, "vocal_gender", types.VOCAL_GENDERS)
    validate_optional(params, "persona_type", types.PERSONA_TYPES)


def validate_generate_artwork(params: Dict[str, Any]) -> None:
    require_param(params, "task_id")


def validate_add_instrumental(params: Dict[str, Any]) -> None:
    require_all(params, "upload_url", "title", "negative_tags", "tags", "model")
    validate_optional(params, "model", types.MODELS)
    validate_optional(params, "vocal_gender", types.VOCAL_GENDERS)


def validate_add_vocals(params: Dict[str, Any]) -> None:
    require_all(params, "upload_url", "lyrics", "title", "negative_tags", "style", "model")
    validate_optional(params, "model", types.MODELS)
    validate_optional(params, "vocal_gender", types.VOCAL_GENDERS)


def validate_separate_audio_stems(params: Dict[str, Any]) -> None:
    require_all(params, "task_id", "audio_id")
    validate_optional(params, "type", types.SEPARATE_AUDIO_STEMS_TYPES)


def validate_generate_midi(params: Dict[str, Any]) -> None:
    require_param(params, "task_id")


def validate_convert_audio(params: Dict[str, Any]) -> None:
    require_all(params, "task_id", "audio_id")


def validate_visualize_music(params: Dict[str, Any]) -> None:
    require_all(params, "task_id", "audio_id")


def validate_generate_lyrics(params: Dict[str, Any]) -> None:
    require_param(params, "prompt")


def validate_get_timestamped_lyrics(params: Dict[str, Any]) -> None:
    require_all(params, "task_id", "audio_id")


def validate_replace_section(params: Dict[str, Any]) -> None:
    require_all(
        params,
        "task_id",
        "audio_id",
        "lyrics",
        "tags",
        "title",
        "infill_start_time",
        "infill_end_time",
    )
    if _to_f(_param(params, "infill_end_time")) <= _to_f(_param(params, "infill_start_time")):
        raise ValidationError("infill_end_time must be greater than infill_start_time")


def validate_text_to_sound(params: Dict[str, Any]) -> None:
    require_all(params, "prompt", "model")
    validate_optional(params, "model", types.SOUND_MODELS)
    validate_optional(params, "sound_key", types.SOUND_KEYS)
    tempo = _param(params, "sound_tempo")
    if tempo is not None and not (1 <= _to_i(tempo) <= 300):
        raise ValidationError("sound_tempo must be between 1 and 300")


def validate_voice_to_validation_phrase(params: Dict[str, Any]) -> None:
    require_all(params, "voice_url", "vocal_start_seconds", "vocal_end_seconds")
    validate_optional(params, "language", types.VALIDATION_PHRASE_LANGUAGES)

    start_seconds = _to_i(_param(params, "vocal_start_seconds"))
    end_seconds = _to_i(_param(params, "vocal_end_seconds"))
    if end_seconds > start_seconds:
        return

    raise ValidationError("vocal_end_seconds must be greater than vocal_start_seconds")


def validate_regenerate_validation_phrase(params: Dict[str, Any]) -> None:
    require_param(params, "task_id")


def validate_generate_voice(params: Dict[str, Any]) -> None:
    require_all(params, "task_id", "verify_url")
    validate_optional(params, "singer_skill_level", types.SINGER_SKILL_LEVELS)


def validate_check_voice(params: Dict[str, Any]) -> None:
    require_param(params, "task_id")


def validate_generate_persona(params: Dict[str, Any]) -> None:
    require_all(params, "task_id", "audio_id", "name", "description")


def validate_boost_style(params: Dict[str, Any]) -> None:
    require_param(params, "description")
