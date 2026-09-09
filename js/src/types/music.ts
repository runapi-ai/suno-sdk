import type { ParameterMode, PersonaType, SunoBaseParams, SunoModel } from './common';

/** Auto-lyrics variant: generates lyrics automatically from `prompt`. */
export interface TextToMusicPromptParams extends SunoBaseParams {
  vocal_mode: 'auto_lyrics';
  /** Song brief used for automatic lyrics generation. */
  prompt: string;
  lyrics?: never;
  style?: never;
  title?: never;
  persona_id?: string;
  persona_type?: PersonaType;
}

/** Exact-lyrics variant: sings the literal `lyrics` text with explicit style/title. */
export interface TextToMusicLyricsParams extends SunoBaseParams {
  vocal_mode: 'exact_lyrics';
  prompt?: never;
  lyrics: string;
  style: string;
  title: string;
  persona_id?: string;
  persona_type?: PersonaType;
  /** Styles to avoid (e.g. "heavy metal, screamo"). */
  negative_tags?: string;
  duration_seconds?: number;
  /** Timestamp in seconds to continue generation from. */
  continue_at?: number;
  endpoint?: string;
}

/** Instrumental variant: produces music with no vocals. Requires explicit style/title. */
export interface TextToMusicInstrumentalParams extends SunoBaseParams {
  vocal_mode: 'instrumental';
  prompt?: never;
  lyrics?: never;
  style: string;
  title: string;
  persona_id?: string;
  persona_type?: PersonaType;
  negative_tags?: string;
  duration_seconds?: number;
  continue_at?: number;
  endpoint?: string;
}

/**
 * Params for text-to-music generation. The discriminated union on `vocal_mode` determines
 * which fields are required: `auto_lyrics` needs `prompt`, `exact_lyrics` needs `lyrics` + `style` + `title`,
 * and `instrumental` needs `style` + `title`.
 */
export type TextToMusicParams = TextToMusicPromptParams | TextToMusicLyricsParams | TextToMusicInstrumentalParams;

/**
 * Params for extending an existing track from a specified timestamp.
 * Provide exactly one source: `task_id`, `audio_id`, `audio_url`, or `upload_url`.
 * `parameter_mode` controls whether to inherit the source track's settings (`source`)
 * or override style, title, and continue_at (`custom`).
 */
export interface ExtendMusicParams extends SunoBaseParams {
  task_id?: string;
  audio_id?: string;
  audio_url?: string;
  upload_url?: string;
  parameter_mode: ParameterMode;
  /** When true, produces an instrumental extension with no vocals. */
  instrumental?: boolean;
  prompt?: string;
  lyrics?: string;
  /** Required when parameter_mode is `custom`. */
  style?: string;
  /** Required when parameter_mode is `custom`. Max ~80-100 characters. */
  title?: string;
  /** Required when parameter_mode is `custom`. Seconds, must be > 0 and < source duration. */
  continue_at?: number;
  persona_id?: string;
  persona_type?: PersonaType;
  model?: SunoModel;
  negative_tags?: string;
}

/** Params for generating cover artwork for an existing music task. */
export interface GenerateArtworkParams {
  /** Source music task ID to generate artwork for. */
  task_id: string;
  callback_url?: string;
  [key: string]: unknown;
}

/** Cover audio with auto-generated lyrics from a prompt. */
export interface CoverAudioPromptParams extends SunoBaseParams {
  /** URL of the audio file to re-record vocals over. */
  upload_url: string;
  vocal_mode: 'auto_lyrics';
  prompt: string;
  lyrics?: never;
  style?: never;
  title?: never;
  persona_id?: string;
  persona_type?: PersonaType;
  negative_tags?: string;
}

/** Cover audio with exact lyrics sung over the uploaded track. */
export interface CoverAudioLyricsParams extends SunoBaseParams {
  upload_url: string;
  vocal_mode: 'exact_lyrics';
  prompt?: never;
  lyrics: string;
  style: string;
  title: string;
  persona_id?: string;
  persona_type?: PersonaType;
  negative_tags?: string;
}

/** Cover audio as instrumental (no vocals) over the uploaded track. */
export interface CoverAudioInstrumentalParams extends SunoBaseParams {
  upload_url: string;
  vocal_mode: 'instrumental';
  prompt?: never;
  lyrics?: never;
  style: string;
  title: string;
  persona_id?: string;
  persona_type?: PersonaType;
  negative_tags?: string;
}

/**
 * Params for re-recording vocals over an uploaded audio file. Discriminated on `vocal_mode`
 * the same way as {@link TextToMusicParams}.
 */
export type CoverAudioParams = CoverAudioPromptParams | CoverAudioLyricsParams | CoverAudioInstrumentalParams;

/** Mashup with auto-generated lyrics. */
export interface CreateMashupPromptParams extends SunoBaseParams {
  /** Exactly two audio URLs to blend into one composition. */
  upload_url_list: [string, string];
  model?: SunoModel;
  vocal_mode: 'auto_lyrics';
  prompt: string;
  lyrics?: never;
  style?: never;
  title?: never;
  persona_id?: string;
  persona_type?: PersonaType;
}

/** Mashup with exact lyrics sung over the blended tracks. */
export interface CreateMashupLyricsParams extends SunoBaseParams {
  upload_url_list: [string, string];
  model?: SunoModel;
  vocal_mode: 'exact_lyrics';
  prompt?: never;
  lyrics: string;
  style: string;
  title: string;
  persona_id?: string;
  persona_type?: PersonaType;
}

/** Mashup as instrumental (no vocals). */
export interface CreateMashupInstrumentalParams extends SunoBaseParams {
  upload_url_list: [string, string];
  model?: SunoModel;
  vocal_mode: 'instrumental';
  prompt?: never;
  lyrics?: never;
  style: string;
  title: string;
  persona_id?: string;
  persona_type?: PersonaType;
}

/**
 * Params for blending exactly two audio tracks into a single new composition.
 * Discriminated on `vocal_mode` the same way as {@link TextToMusicParams}.
 */
export type CreateMashupParams = CreateMashupPromptParams | CreateMashupLyricsParams | CreateMashupInstrumentalParams;
