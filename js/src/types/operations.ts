import type { SingerSkillLevel, SoundKey, SoundModel, SunoBaseParams, SunoModel, ValidationPhraseLanguage } from './common';

/**
 * Params for generating and adding an instrumental backing track to uploaded audio.
 * `tags` and `negative_tags` control the generated style; pass empty strings if no preference.
 */
export interface AddInstrumentalParams extends SunoBaseParams {
  model?: SunoModel;
  upload_url: string;
  title: string;
  /** Styles to avoid (required, but can be empty string). */
  negative_tags: string;
  /** Style/genre tags for the generated instrumental. */
  tags: string;
}

/** Params for generating and adding vocals to an uploaded instrumental track. */
export interface AddVocalsParams extends SunoBaseParams {
  model?: SunoModel;
  upload_url: string;
  /** Vocal lyrics to sing over the instrumental. */
  lyrics: string;
  title: string;
  /** Styles to avoid (required, but can be empty string). */
  negative_tags: string;
  style: string;
}

/** Params for splitting a track into individual instrument stems (vocals, drums, bass, etc.). */
export interface SeparateAudioStemsParams {
  task_id: string;
  audio_id: string;
  /** Separation mode. Accepted values are validated by the Input Contract. */
  type?: string;
  /** Target stem. Required when `type` is `split_stem_advanced`. */
  stem_name?: string;
  callback_url?: string;
}

/** Params for extracting per-instrument MIDI note data from a generated track. */
export interface GenerateMidiParams {
  task_id: string;
  callback_url?: string;
}

/** Params for converting a generated track to WAV format. */
export interface ConvertAudioParams {
  task_id: string;
  audio_id?: string;
  callback_url?: string;
}

/** Params for generating a music visualization video from an existing track. */
export interface VisualizeMusicParams {
  task_id: string;
  audio_id?: string;
  prompt?: string;
  callback_url?: string;
  /** Author name displayed in the visualization video. */
  author?: string;
  /** Domain name watermark overlaid on the video. */
  domain_name?: string;
}

/** Params for AI-powered lyrics generation from a text prompt. */
export interface GenerateLyricsParams {
  prompt: string;
  callback_url?: string;
}

/** Params for blending two caller-authored lyrics texts. */
export interface BlendLyricsParams {
  lyrics_a: string;
  lyrics_b: string;
  callback_url?: string;
}

/** Params for retrieving word-level timing alignment for a track. Synchronous -- use `run()` directly. */
export interface GetTimestampedLyricsParams {
  task_id: string;
  audio_id: string;
  callback_url?: string;
}

interface ReplaceSectionBaseParams {
  /** Replacement lyrics for the specified section. */
  lyrics: string;
  /** Style/genre tags for the replacement section. */
  tags: string;
  title: string;
  /** Section start time in seconds. The replacement duration must be at least 10 seconds. */
  infill_start_time: number;
  /** Section end time in seconds; must be greater than infill_start_time. */
  infill_end_time: number;
  callback_url?: string;
  negative_tags?: string;
  /** Complete song lyrics for context; helps maintain coherence across sections. */
  full_lyrics: string;
}

/** Replace a section using an existing generated audio track. */
export interface ReplaceSectionExistingAudioParams extends ReplaceSectionBaseParams {
  task_id: string;
  audio_id: string;
  upload_url?: never;
  model?: never;
}

/** Replace a section using an uploaded source audio file. */
export interface ReplaceSectionUploadedAudioParams extends ReplaceSectionBaseParams {
  upload_url: string;
  model: SunoModel;
  task_id?: never;
  audio_id?: never;
}

/**
 * Params for re-generating a time range within a track with new lyrics and style.
 * Provide either `task_id` + `audio_id` for an existing generated track, or `upload_url` + `model` for uploaded audio.
 */
export type ReplaceSectionParams = ReplaceSectionExistingAudioParams | ReplaceSectionUploadedAudioParams;

/**
 * Params for creating a reusable persona from an existing track's vocals.
 * The persona can be referenced by ID in subsequent generation params. Synchronous -- use `run()` directly.
 */
export interface GeneratePersonaParams {
  /** Source task ID containing reference vocals. */
  task_id: string;
  audio_id: string;
  name: string;
  description: string;
}

/**
 * Params for generating style/genre tags from a text description.
 * Useful for filling `style` fields in other params. Synchronous -- use `run()` directly.
 */
export interface BoostStyleParams {
  /** Style description to generate tags from (e.g. "upbeat summer pop with acoustic guitar"). */
  description: string;
  name?: string;
}

/**
 * Params for sound effect generation (not music -- use {@link TextToMusicParams} for songs).
 * Supports loopable audio, BPM control, and musical key selection.
 */
export interface TextToSoundParams {
  callback_url?: string;
  model: SoundModel;
  /** Sound description, max 500 characters. */
  prompt: string;
  /** When true, generates seamlessly loopable audio. */
  sound_loop?: boolean;
  /** BPM (1-300) for rhythmic sound effects. */
  sound_tempo?: number;
  sound_key?: SoundKey;
  /** When true, captures lyric subtitles from the generated audio. */
  grab_lyrics?: boolean;
}

/**
 * Step 1 of voice cloning: upload a voice recording and specify vocal segment boundaries.
 * Returns a validation phrase the user must re-record and submit via {@link GenerateVoiceParams}.
 *
 * Voice cloning workflow: VoiceToValidationPhrase -> RegenerateValidationPhrase (optional) -> GenerateVoice -> CheckVoice.
 */
export interface VoiceToValidationPhraseParams {
  /** URL of the source voice recording. */
  voice_url: string;
  /** Start of the vocal segment in the recording (seconds). */
  vocal_start_seconds: number;
  /** End of the vocal segment in the recording (seconds). */
  vocal_end_seconds: number;
  language?: ValidationPhraseLanguage;
  callback_url?: string;
}

/**
 * Step 2 (optional) of voice cloning: requests a new, easier validation phrase for an
 * in-progress voice cloning task, if the original phrase was too difficult.
 */
export interface RegenerateValidationPhraseParams {
  /** Task ID from a prior VoiceToValidationPhrase call. */
  task_id: string;
  callback_url?: string;
}

/**
 * Step 3 of voice cloning: submits the user's recording of the validation phrase to train a custom voice.
 * `task_id` is from the prior VoiceToValidationPhrase task; `verify_url` is the user's recording.
 */
export interface GenerateVoiceParams {
  task_id: string;
  /** URL of the user's recording of the validation phrase. */
  verify_url: string;
  voice_name?: string;
  description?: string;
  style?: string;
  singer_skill_level?: SingerSkillLevel;
  callback_url?: string;
}

/**
 * Step 4 (final) of voice cloning: checks whether a custom voice from GenerateVoice is ready.
 * Synchronous -- use `run()` directly.
 */
export interface CheckVoiceParams {
  /** Task ID from a prior GenerateVoice call. */
  task_id: string;
}
