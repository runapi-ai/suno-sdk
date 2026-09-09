import type { AsyncTaskStatus } from '@runapi.ai/core';

/** Suno music generation engine version. V5.5 has highest quality; V4 is the earliest available. */
export type SunoModel = 'suno-v5.5' | 'suno-v5' | 'suno-v4.5-plus' | 'suno-v4.5-all' | 'suno-v4.5' | 'suno-v4';
/** Model versions that support sound effect generation (subset of SunoModel). */
export type SoundModel = 'suno-v5' | 'suno-v5.5';
/** Language for the voice-cloning validation phrase the user must read back. */
export type ValidationPhraseLanguage = 'en' | 'zh' | 'es' | 'fr' | 'pt' | 'de' | 'ja' | 'ko' | 'hi' | 'ru';
/** Musical key for sound effect generation (major and minor keys). */
export type SoundKey =
  | 'Cm' | 'C#m' | 'Dm' | 'D#m' | 'Em' | 'Fm'
  | 'F#m' | 'Gm' | 'G#m' | 'Am' | 'A#m' | 'Bm'
  | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F'
  | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type VocalGender = 'male' | 'female';
/** `style` applies genre/mood without changing the voice; `voice` applies cloned voice characteristics. */
export type PersonaType = 'style' | 'voice';
/** `source` inherits style/title/continue_at from the original track; `custom` requires explicit values. */
export type ParameterMode = 'source' | 'custom';
/**
 * Controls how vocals are generated.
 * - `auto_lyrics`: generates lyrics automatically from the `prompt` field
 * - `exact_lyrics`: sings the exact text in the `lyrics` field
 * - `instrumental`: produces music with no vocals
 */
export type VocalMode = 'auto_lyrics' | 'exact_lyrics' | 'instrumental';
export type TaskStatus = AsyncTaskStatus;
/** Progress phase of a multi-step music generation task. */
export type GenerationStage = 'text_generated' | 'first_audio_ready' | 'all_audios_ready' | 'failed';
/** Singing ability of the voice being cloned; calibrates model expectations during voice generation. */
export type SingerSkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';


/**
 * Fields shared across most Suno music generation endpoints.
 * `style_weight`, `weirdness_constraint`, and `audio_weight` are 0-1 knobs (2 decimal places)
 * that tune style adherence, creative deviation, and audio fidelity respectively.
 */
export interface SunoBaseParams {
  callback_url?: string;
  model?: SunoModel;
  vocal_gender?: VocalGender;
  /** 0-1; higher values enforce stricter style adherence. */
  style_weight?: number;
  /** 0-1; higher values allow more creative deviation from the prompt. */
  weirdness_constraint?: number;
  /** 0-1; higher values prioritize audio fidelity over stylistic variation. */
  audio_weight?: number;
}
