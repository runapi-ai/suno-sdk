"""Suno model lists, enums, and response models."""

from __future__ import annotations

from typing import TypedDict

from runapi.core import BaseModel, TaskResponse, optional, required

MODELS = [
    "suno-v6",
    "suno-v6-wild",
    "suno-v6-mini",
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


class AdvancedStemAudio(BaseModel):
    """One audio result in an advanced stem extraction pair."""

    id = required(str)
    duration_seconds = required(float)
    audio_url = required(str)


class AdvancedStemPair(BaseModel):
    """Extracted target stem and the remaining audio after removing it."""

    stem_name = required(str)
    extracted_audio = required(lambda: AdvancedStemAudio)
    remaining_audio = required(lambda: AdvancedStemAudio)


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
    pairs = optional([lambda: AdvancedStemPair])


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


class BlendLyricsResponse(AsyncTaskResponse):
    """Suno lyrics blending task status response."""

    lyrics = optional([lambda: Lyric])


class GetTimestampedLyricsResponse(TaskResponse):
    """Suno timestamped-lyrics result."""

    aligned_words = optional([lambda: AlignedWord])
    waveform_data = optional([float])
    hoot_cer = optional(float)
    is_streamed = optional()


class ReplaceSectionResponse(AsyncTaskResponse):
    """Suno replace-section task status response."""

    track = optional(lambda: Audio)
    audios = optional([lambda: Audio])


class GeneratePersonaResponse(TaskResponse):
    """Suno persona result."""

    persona = required(lambda: Persona)
    error = optional(str)


class BoostStyleResponse(TaskResponse):
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


class CheckVoiceResponse(TaskResponse):
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


class CompletedBlendLyricsResponse(BlendLyricsResponse):
    """Narrowed lyrics blending response once polling observes completion."""

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


# --- Provider-neutral resources -------------------------------------------
#
# The models below are the RunAPI-owned surface for Suno workflows. They name
# the audio, persona, and voice a request works on instead of the provider
# operation that produced it, so a caller can create once and continue,
# recover, or export later without tracking provider operation names.


class PersonaParams(TypedDict):
    """Parameters for creating a reusable persona from an existing track."""

    source_task_id: str
    source_audio_id: str
    name: str
    description: str


class _VoiceRequiredParams(TypedDict):
    source_audio_url: str


class VoiceParams(_VoiceRequiredParams, total=False):
    """Parameters for creating a reusable voice from a recording."""

    name: str


class StyleExpansionParams(TypedDict):
    """Parameters for expanding a style description into genre tags."""

    description: str


class _AudioReferenceRequiredParams(TypedDict):
    source_audio_id: str


class TimestampedLyricsParams(_AudioReferenceRequiredParams, total=False):
    """Parameters for retrieving word-level timing data for a track."""

    source_task_id: str


class AudioExportParams(_AudioReferenceRequiredParams, total=False):
    """Parameters for exporting a track to a downloadable audio file."""

    source_task_id: str
    callback_url: str


class MusicVisualizationParams(_AudioReferenceRequiredParams, total=False):
    """Parameters for rendering a visualization video for a track."""

    source_task_id: str
    callback_url: str
    author: str
    domain_name: str


class _MusicFromSampleRequiredParams(TypedDict):
    model: str
    audio_url: str
    start_seconds: float
    end_seconds: float


class MusicFromSampleParams(_MusicFromSampleRequiredParams, total=False):
    """Parameters for creating music guided by an uploaded audio sample."""

    prompt: str
    callback_url: str


class ResourceStatus:
    """Availability of a RunAPI-owned resource."""

    AVAILABLE = "available"
    FAILED = "failed"

    ALL = [AVAILABLE, FAILED]


class PersonaResource(BaseModel):
    """A RunAPI-owned persona handle, reusable as ``persona_id`` in generation params."""

    id = required(str)
    name = optional(str)
    description = optional(str)


class VoiceResource(BaseModel):
    """A RunAPI-owned voice handle."""

    id = required(str)
    name = optional(str)


class PersonaCreationResponse(TaskResponse):
    """Suno persona creation result.

    A completed request carries ``persona``; a request the service accepted for
    local execution carries the task acceptance (``id``, ``status``) instead and
    is read from ``GET /api/v1/tasks/{id}``.
    """

    persona = optional(lambda: PersonaResource)
    error = optional(str)


class VoiceCreationResponse(TaskResponse):
    """Suno voice creation result."""

    voice = optional(lambda: VoiceResource)
    error = optional(str)


class PersonaResourceResponse(BaseModel):
    """Suno persona resource envelope."""

    persona = required(lambda: PersonaResource)
    status = required(str, enum=lambda: ResourceStatus.ALL)


class VoiceResourceResponse(BaseModel):
    """Suno voice resource envelope. ``status`` reports whether the voice is ready."""

    voice = required(lambda: VoiceResource)
    status = required(str, enum=lambda: ResourceStatus.ALL)


class AudioExportResponse(AsyncTaskResponse):
    """Suno audio-export task status response."""

    wav_url = optional(str)
    original_task_id = optional(str)


class CompletedAudioExportResponse(AudioExportResponse):
    """Narrowed audio-export response once polling observes completion."""

    wav_url = required(str)


class MusicVisualizationResponse(AsyncTaskResponse):
    """Suno music-visualization task status response."""

    video_url = optional(str)
    original_task_id = optional(str)


class CompletedMusicVisualizationResponse(MusicVisualizationResponse):
    """Narrowed music-visualization response once polling observes completion."""

    video_url = required(str)


class MusicFromSampleResponse(AsyncTaskResponse):
    """Suno music-from-sample task status response."""

    audios = optional([lambda: Audio])


class CompletedMusicFromSampleResponse(MusicFromSampleResponse):
    """Narrowed music-from-sample response once polling observes completion."""

    audios = required([lambda: Audio])
