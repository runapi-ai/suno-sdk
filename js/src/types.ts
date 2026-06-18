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

/** Auto-lyrics variant: generates lyrics automatically from `prompt`. */
export interface TextToMusicPromptParams extends SunoBaseParams {
  vocal_mode: 'auto_lyrics';
  /** Song brief used for automatic lyrics generation. */
  prompt: string;
  lyrics?: never;
  style?: never;
  title?: never;
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
  /** `separate_vocal` isolates vocals+instrumental; `split_stem` splits into all individual instruments. */
  type?: 'separate_vocal' | 'split_stem' | string;
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

/** Params for retrieving word-level timing alignment for a track. Synchronous -- use `run()` directly. */
export interface GetTimestampedLyricsParams {
  task_id: string;
  audio_id: string;
  callback_url?: string;
}

/**
 * Params for re-generating a time range within an existing track with new lyrics and style.
 * `infill_start_time` and `infill_end_time` define the section boundaries in seconds.
 */
export interface ReplaceSectionParams {
  task_id: string;
  audio_id: string;
  /** Replacement lyrics for the specified section. */
  lyrics: string;
  /** Style/genre tags for the replacement section. */
  tags: string;
  title: string;
  /** Section start time in seconds. */
  infill_start_time: number;
  /** Section end time in seconds. */
  infill_end_time: number;
  callback_url?: string;
  negative_tags?: string;
  /** Complete song lyrics for context; helps maintain coherence across sections. */
  full_lyrics?: string;
}

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

/** Initial response from task creation with the assigned task ID. */
export interface TaskCreateResponse {
  id: string;
  status?: string;
  [key: string]: unknown;
}

/** Metadata and URLs for a generated music track. */
export interface Audio {
  id: string;
  audio_url?: string;
  /** Progressive streaming URL; available before the full file is ready. */
  stream_audio_url?: string;
  image_url?: string;
  lyrics?: string;
  model_name?: string;
  title?: string;
  tags?: string[];
  /** Track duration in seconds. */
  duration?: number;
  [key: string]: unknown;
}

/** Metadata and URLs for a generated sound effect (distinct from music {@link Audio}). */
export interface SoundAudio {
  id: string;
  audio_url?: string;
  stream_audio_url?: string;
  image_url?: string;
  /** The prompt that was used to generate this sound effect. */
  prompt?: string;
  model_name?: string;
  title?: string;
  tags?: string[];
  duration?: number;
  [key: string]: unknown;
}

/** Base response for all Suno async tasks, carrying lifecycle status and generation progress. */
export interface AsyncTaskResponse {
  id: string;
  status: TaskStatus;
  generation_stage?: GenerationStage;
  error?: string;
  [key: string]: unknown;
}

/** Result of a text-to-music generation task. */
export interface TextToMusicResponse extends AsyncTaskResponse {
  audios?: Audio[];
}

/** Result of a music extension task. `original_task_id` references the source track. */
export interface ExtendMusicResponse extends AsyncTaskResponse {
  original_task_id?: string;
  audios?: Audio[];
}

/** Result of an artwork generation task containing cover image URLs. */
export interface GenerateArtworkResponse extends AsyncTaskResponse {
  covers?: Array<{ url: string }>;
}

/** Result of a cover audio task. */
export interface CoverAudioResponse extends AsyncTaskResponse {
  audios?: Audio[];
}

/** Result of adding an instrumental backing track. */
export interface AddInstrumentalResponse extends TextToMusicResponse {}
/** Result of adding vocals to a track. */
export interface AddVocalsResponse extends TextToMusicResponse {}
/** Result of a sound effect generation task (uses {@link SoundAudio} instead of {@link Audio}). */
export interface TextToSoundResponse extends AsyncTaskResponse {
  audios?: SoundAudio[];
}

/** URLs for each isolated instrument stem after separation. Only populated stems have URLs. */
export interface SeparatedAudio {
  vocal_url?: string;
  instrumental_url?: string;
  backing_vocals_url?: string;
  bass_url?: string;
  brass_url?: string;
  drums_url?: string;
  fx_url?: string;
  guitar_url?: string;
  keyboard_url?: string;
  percussion_url?: string;
  piano_url?: string;
  strings_url?: string;
  synth_url?: string;
  woodwinds_url?: string;
}

/** Result of a stem separation task. */
export interface SeparateAudioStemsResponse extends AsyncTaskResponse {
  separated_audios?: SeparatedAudio;
}

/** A single MIDI note event within an instrument track. */
export interface MidiNote {
  /** MIDI pitch number (0-127). */
  pitch: number;
  start_time: number;
  end_time: number;
  /** Note velocity (0-1 normalized). */
  velocity: number;
}

/** All notes for a single instrument extracted from a track. */
export interface MidiInstrument {
  name: string;
  notes: MidiNote[];
}

/** Result of a MIDI extraction task with per-instrument note data. */
export interface GenerateMidiResponse extends AsyncTaskResponse {
  instruments?: MidiInstrument[];
}

/** Result of a WAV conversion task. */
export interface ConvertAudioResponse extends AsyncTaskResponse {
  /** Download URL for the converted WAV file. */
  wav_url?: string;
  original_task_id?: string;
}

/** Result of a music visualization task containing the generated video URL. */
export interface VisualizeMusicResponse extends AsyncTaskResponse {
  video_url?: string;
  original_task_id?: string;
}

/** Result of a lyrics generation task with sectioned lyrics. */
export interface GenerateLyricsResponse extends AsyncTaskResponse {
  /** Generated lyrics, split by section (e.g. "Chorus", "Verse 1"). */
  lyrics?: Array<{ title?: string; text: string }>;
}

/** Word-level timing alignment for a single word in a track. */
export interface AlignedWord {
  word: string;
  /** Whether alignment succeeded for this word. */
  success: boolean;
  start_time: number;
  end_time: number;
  /** Alignment confidence score. */
  palign: number;
}

/** Synchronous response containing word-level timing data and waveform for a track. */
export interface GetTimestampedLyricsResponse {
  aligned_words?: AlignedWord[];
  /** Waveform amplitude data for visualization. */
  waveform_data?: number[];
  /** Character error rate of the lyrics alignment. */
  hoot_cer?: number;
  is_streamed?: boolean;
  [key: string]: unknown;
}

/** Result of a section replacement task. */
export interface ReplaceSectionResponse extends AsyncTaskResponse {
  track?: Audio;
}

/** A reusable style or voice persona, referenced by ID in generation params. */
export interface Persona {
  id: string;
  name: string;
  description: string;
  [key: string]: unknown;
}

/** Synchronous result of persona creation. */
export interface GeneratePersonaResponse {
  persona: Persona;
  error?: string;
  [key: string]: unknown;
}

/** Synchronous result of style tag generation. `style` contains the generated tags string. */
export interface BoostStyleResponse {
  style: string;
  error?: string;
  [key: string]: unknown;
}

/** Result of a mashup task. */
export interface CreateMashupResponse extends AsyncTaskResponse {
  audios?: Audio[];
}

/** Result of a voice-cloning validation phrase task. The user must re-record this phrase. */
export interface ValidationPhraseResponse extends AsyncTaskResponse {
  provider_status?: string;
  /** The validation phrase text the user must read back for voice cloning. */
  validation_phrase?: string;
}

/** Result of a voice generation (training) task. `voice_id` is usable in subsequent generation params. */
export interface VoiceGenerationResponse extends AsyncTaskResponse {
  provider_status?: string;
  /** Custom voice identifier, usable as persona in subsequent music generation. */
  voice_id?: string;
}

/** Synchronous result indicating whether a custom voice is ready for use. */
export interface CheckVoiceResponse {
  is_available?: boolean;
  error?: string;
  [key: string]: unknown;
}

export type CompletedTextToMusicResponse = TextToMusicResponse & { status: 'completed'; audios: Audio[] };
export type CompletedExtendMusicResponse = ExtendMusicResponse & { status: 'completed'; audios: Audio[] };
export type CompletedGenerateArtworkResponse = GenerateArtworkResponse & { status: 'completed'; covers: Array<{ url: string }> };
export type CompletedCoverAudioResponse = CoverAudioResponse & { status: 'completed'; audios: Audio[] };
export type CompletedAddInstrumentalResponse = AddInstrumentalResponse & { status: 'completed'; audios: Audio[] };
export type CompletedAddVocalsResponse = AddVocalsResponse & { status: 'completed'; audios: Audio[] };
export type CompletedSeparateAudioStemsResponse = SeparateAudioStemsResponse & { status: 'completed'; separated_audios: SeparatedAudio };
export type CompletedGenerateMidiResponse = GenerateMidiResponse & { status: 'completed'; instruments: MidiInstrument[] };
export type CompletedConvertAudioResponse = ConvertAudioResponse & { status: 'completed'; wav_url: string };
export type CompletedVisualizeMusicResponse = VisualizeMusicResponse & { status: 'completed'; video_url: string };
export type CompletedGenerateLyricsResponse = GenerateLyricsResponse & { status: 'completed'; lyrics: Array<{ title?: string; text: string }> };
export type CompletedReplaceSectionResponse = ReplaceSectionResponse & { status: 'completed'; track: Audio };
export type CompletedCreateMashupResponse = CreateMashupResponse & { status: 'completed'; audios: Audio[] };
export type CompletedTextToSoundResponse = TextToSoundResponse & { status: 'completed'; audios: SoundAudio[] };
export type CompletedValidationPhraseResponse = ValidationPhraseResponse & { status: 'completed'; validation_phrase: string };
export type CompletedVoiceGenerationResponse = VoiceGenerationResponse & { status: 'completed'; voice_id: string };
