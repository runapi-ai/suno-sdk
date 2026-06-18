"""Suno model lists, enums, and response models."""

from __future__ import annotations

from runapi.core import BaseModel, TaskResponse, optional, required

MODELS = [
    "suno-v5.5",
    "suno-v5",
    "suno-v4.5-plus",
    "suno-v4.5-all",
    "suno-v4.5",
    "suno-v4",
]
SOUND_MODELS = ["suno-v5", "suno-v5.5"]
SOUND_KEYS = [
    "Cm",
    "C#m",
    "Dm",
    "D#m",
    "Em",
    "Fm",
    "F#m",
    "Gm",
    "G#m",
    "Am",
    "A#m",
    "Bm",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
]
VOCAL_GENDERS = ["female", "male"]
PERSONA_TYPES = ["style", "voice"]
PARAMETER_MODES = ["source", "custom"]
VOCAL_MODES = ["auto_lyrics", "exact_lyrics", "instrumental"]
SEPARATE_AUDIO_STEMS_TYPES = ["separate_vocal", "split_stem"]
VALIDATION_PHRASE_LANGUAGES = ["en", "zh", "es", "fr", "pt", "de", "ja", "ko", "hi", "ru"]
SINGER_SKILL_LEVELS = ["beginner", "intermediate", "advanced", "professional"]


class Audio(BaseModel):
    id = optional(str)
    audio_url = optional(str)
    stream_audio_url = optional(str)
    image_url = optional(str)
    lyrics = optional(str)
    model_name = optional(str)
    title = optional(str)
    tags = optional([str])
    duration = optional(float)


class SoundAudio(BaseModel):
    id = optional(str)
    audio_url = optional(str)
    stream_audio_url = optional(str)
    image_url = optional(str)
    prompt = optional(str)
    model_name = optional(str)
    title = optional(str)
    tags = optional([str])
    duration = optional(float)


class Cover(BaseModel):
    url = required(str)


class AlignedWord(BaseModel):
    word = required(str)
    success = required()
    start_time = required(float)
    end_time = required(float)
    palign = required(float)


class SeparatedAudio(BaseModel):
    vocal_url = optional(str)
    instrumental_url = optional(str)
    backing_vocals_url = optional(str)
    bass_url = optional(str)
    brass_url = optional(str)
    drums_url = optional(str)
    fx_url = optional(str)
    guitar_url = optional(str)
    keyboard_url = optional(str)
    percussion_url = optional(str)
    piano_url = optional(str)
    strings_url = optional(str)
    synth_url = optional(str)
    woodwinds_url = optional(str)


class MidiNote(BaseModel):
    pitch = required(float)
    start_time = required(float)
    end_time = required(float)
    velocity = required(float)


class MidiInstrument(BaseModel):
    name = required(str)
    notes = optional([lambda: MidiNote])


class Lyric(BaseModel):
    title = optional(str)
    text = required(str)


class Persona(BaseModel):
    id = required(str)
    name = required(str)
    description = required(str)


class AsyncTaskResponse(TaskResponse):
    """Suno async task status response."""

    id = required(str)
    # status is optional to match the base TaskResponse and every other line: a
    # response that omits status must coerce cleanly and let polling decide,
    # rather than raising "status is required" before polling ever runs.
    status = optional(str, enum=lambda: TaskResponse.Status.ALL)
    generation_stage = optional(str)
    error = optional(str)


class TextToMusicResponse(AsyncTaskResponse):
    """Suno text-to-music task status response."""

    audios = optional([lambda: Audio])
    audio_url = optional(str)


class ExtendMusicResponse(AsyncTaskResponse):
    """Suno extend-music task status response."""

    audios = optional([lambda: Audio])
    original_task_id = optional(str)


class GenerateArtworkResponse(AsyncTaskResponse):
    """Suno artwork task status response."""

    covers = optional([lambda: Cover])


class CoverAudioResponse(AsyncTaskResponse):
    """Suno cover-audio task status response."""

    audios = optional([lambda: Audio])


class AddInstrumentalResponse(TextToMusicResponse):
    """Suno add-instrumental task status response."""

    pass


class AddVocalsResponse(TextToMusicResponse):
    """Suno add-vocals task status response."""

    pass


class TextToSoundResponse(AsyncTaskResponse):
    """Suno text-to-sound task status response."""

    audios = optional([lambda: SoundAudio])


class SeparateAudioStemsResponse(AsyncTaskResponse):
    """Suno stem separation task status response."""

    separated_audios = optional(lambda: SeparatedAudio)


class GenerateMidiResponse(AsyncTaskResponse):
    """Suno MIDI task status response."""

    instruments = optional([lambda: MidiInstrument])


class ConvertAudioResponse(AsyncTaskResponse):
    """Suno convert-audio task status response."""

    wav_url = optional(str)
    original_task_id = optional(str)


class VisualizeMusicResponse(AsyncTaskResponse):
    """Suno visualization task status response."""

    video_url = optional(str)
    original_task_id = optional(str)


class GenerateLyricsResponse(AsyncTaskResponse):
    """Suno lyrics task status response."""

    lyrics = optional([lambda: Lyric])


class GetTimestampedLyricsResponse(BaseModel):
    """Suno timestamped-lyrics result."""

    aligned_words = optional([lambda: AlignedWord])
    waveform_data = optional([float])
    hoot_cer = optional(float)
    is_streamed = optional()


class ReplaceSectionResponse(AsyncTaskResponse):
    """Suno replace-section task status response."""

    track = optional(lambda: Audio)
    audios = optional([lambda: Audio])


class GeneratePersonaResponse(BaseModel):
    """Suno persona result."""

    persona = required(lambda: Persona)
    error = optional(str)


class BoostStyleResponse(BaseModel):
    """Suno boost-style result."""

    style = optional(str)
    error = optional(str)


class CreateMashupResponse(AsyncTaskResponse):
    """Suno mashup task status response."""

    audio = optional(lambda: Audio)
    audios = optional([lambda: Audio])


class ValidationPhraseResponse(AsyncTaskResponse):
    """Suno validation-phrase task status response."""

    provider_status = optional(str)
    validation_phrase = optional(str)


class VoiceGenerationResponse(AsyncTaskResponse):
    """Suno voice generation task status response."""

    provider_status = optional(str)
    voice_id = optional(str)


class CheckVoiceResponse(BaseModel):
    """Suno check-voice result."""

    is_available = optional()
    error = optional(str)


class CompletedTextToMusicResponse(TextToMusicResponse):
    """Narrowed text-to-music response once polling observes completion."""

    audios = required([lambda: Audio])


class CompletedExtendMusicResponse(ExtendMusicResponse):
    """Narrowed extend-music response once polling observes completion."""

    audios = required([lambda: Audio])


class CompletedGenerateArtworkResponse(GenerateArtworkResponse):
    """Narrowed artwork response once polling observes completion."""

    covers = required([lambda: Cover])


class CompletedCoverAudioResponse(CoverAudioResponse):
    """Narrowed cover-audio response once polling observes completion."""

    audios = required([lambda: Audio])


class CompletedAddInstrumentalResponse(AddInstrumentalResponse):
    """Narrowed add-instrumental response once polling observes completion."""

    audios = required([lambda: Audio])


class CompletedAddVocalsResponse(AddVocalsResponse):
    """Narrowed add-vocals response once polling observes completion."""

    audios = required([lambda: Audio])


class CompletedSeparateAudioStemsResponse(SeparateAudioStemsResponse):
    """Narrowed stem separation response once polling observes completion."""

    separated_audios = required(lambda: SeparatedAudio)


class CompletedGenerateMidiResponse(GenerateMidiResponse):
    """Narrowed MIDI response once polling observes completion."""

    instruments = required([lambda: MidiInstrument])


class CompletedConvertAudioResponse(ConvertAudioResponse):
    """Narrowed convert-audio response once polling observes completion."""

    wav_url = required(str)


class CompletedVisualizeMusicResponse(VisualizeMusicResponse):
    """Narrowed visualization response once polling observes completion."""

    video_url = required(str)


class CompletedGenerateLyricsResponse(GenerateLyricsResponse):
    """Narrowed lyrics response once polling observes completion."""

    lyrics = required([lambda: Lyric])


class CompletedReplaceSectionResponse(ReplaceSectionResponse):
    """Narrowed replace-section response once polling observes completion."""

    track = required(lambda: Audio)


class CompletedCreateMashupResponse(CreateMashupResponse):
    """Narrowed mashup response once polling observes completion."""

    audios = required([lambda: Audio])


class CompletedTextToSoundResponse(TextToSoundResponse):
    """Narrowed text-to-sound response once polling observes completion."""

    audios = required([lambda: SoundAudio])


class CompletedValidationPhraseResponse(ValidationPhraseResponse):
    """Narrowed validation-phrase response once polling observes completion."""

    validation_phrase = required(str)


class CompletedVoiceGenerationResponse(VoiceGenerationResponse):
    """Narrowed voice generation response once polling observes completion."""

    voice_id = required(str)
