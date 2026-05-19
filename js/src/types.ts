import type { AsyncTaskStatus } from '@runapi.ai/core';

export type SunoModel = 'V5_5' | 'V5' | 'V4_5PLUS' | 'V4_5ALL' | 'V4_5' | 'V4' | 'V3_5';
export type SoundModel = 'V5' | 'V5_5';
export type SoundKey =
  | 'Cm' | 'C#m' | 'Dm' | 'D#m' | 'Em' | 'Fm'
  | 'F#m' | 'Gm' | 'G#m' | 'Am' | 'A#m' | 'Bm'
  | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F'
  | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type VocalGender = 'm' | 'f';
export type PersonaModel = 'style_persona' | 'voice_persona';
export type TaskStatus = AsyncTaskStatus;
export type GenerationStage = 'text_generated' | 'first_audio_ready' | 'all_audios_ready' | 'failed';

export interface SunoBaseParams {
  callback_url?: string;
  model?: SunoModel;
  vocal_gender?: VocalGender;
  style_weight?: number;
  weirdness_constraint?: number;
  audio_weight?: number;
}

export interface TextToMusicSimpleParams extends SunoBaseParams {
  custom_mode: false;
  instrumental: boolean;
  prompt: string;
}

export interface TextToMusicCustomParams extends SunoBaseParams {
  custom_mode: true;
  instrumental: boolean;
  style: string;
  title: string;
  prompt?: string;
  persona_id?: string;
  persona_model?: PersonaModel;
  negative_tags?: string;
  duration?: number;
  continue_at?: number;
  endpoint?: string;
}

export type TextToMusicParams = TextToMusicSimpleParams | TextToMusicCustomParams;

export interface ExtendMusicParams extends SunoBaseParams {
  task_id?: string;
  audio_id?: string;
  audio_url?: string;
  upload_url?: string;
  default_param_flag?: boolean;
  instrumental?: boolean;
  prompt?: string;
  style?: string;
  title?: string;
  continue_at?: number;
  persona_id?: string;
  persona_model?: PersonaModel;
  model?: SunoModel;
  negative_tags?: string;
}

export interface GenerateArtworkParams {
  task_id: string;
  callback_url?: string;
  [key: string]: unknown;
}

export interface CoverAudioSimpleParams extends SunoBaseParams {
  upload_url: string;
  custom_mode: false;
  instrumental: boolean;
  prompt: string;
  negative_tags?: string;
}

export interface CoverAudioCustomParams extends SunoBaseParams {
  upload_url: string;
  custom_mode: true;
  instrumental: boolean;
  style: string;
  title: string;
  prompt?: string;
  persona_id?: string;
  persona_model?: PersonaModel;
  negative_tags?: string;
}

export type CoverAudioParams = CoverAudioSimpleParams | CoverAudioCustomParams;

export interface AddInstrumentalParams extends SunoBaseParams {
  model?: SunoModel;
  upload_url: string;
  title: string;
  negative_tags: string;
  tags: string;
}

export interface AddVocalsParams extends SunoBaseParams {
  model?: SunoModel;
  upload_url: string;
  prompt: string;
  title: string;
  negative_tags: string;
  style: string;
}

export interface SeparateAudioStemsParams {
  task_id: string;
  audio_id: string;
  type?: 'separate_vocal' | 'split_stem' | string;
  callback_url?: string;
}

export interface GenerateMidiParams {
  task_id: string;
  callback_url?: string;
}

export interface ConvertAudioParams {
  task_id: string;
  audio_id?: string;
  callback_url?: string;
}

export interface VisualizeMusicParams {
  task_id: string;
  audio_id?: string;
  prompt?: string;
  callback_url?: string;
  author?: string;
  domain_name?: string;
}

export interface GenerateLyricsParams {
  prompt: string;
  callback_url?: string;
}

export interface GetTimestampedLyricsParams {
  task_id: string;
  audio_id: string;
  callback_url?: string;
}

export interface ReplaceSectionParams {
  task_id: string;
  audio_id: string;
  prompt: string;
  tags: string;
  title: string;
  infill_start_time: number;
  infill_end_time: number;
  callback_url?: string;
  negative_tags?: string;
  full_lyrics?: string;
}

export interface GeneratePersonaParams {
  task_id: string;
  audio_id: string;
  name: string;
  description: string;
}

export interface BoostStyleParams {
  description: string;
  name?: string;
}

export interface TextToSoundParams {
  callback_url?: string;
  model: SoundModel;
  prompt: string;
  sound_loop?: boolean;
  sound_tempo?: number;
  sound_key?: SoundKey;
  grab_lyrics?: boolean;
}

export interface CreateMashupSimpleParams extends SunoBaseParams {
  upload_url_list: [string, string];
  custom_mode: false;
  model?: SunoModel;
  prompt: string;
  instrumental?: boolean;
}

export interface CreateMashupCustomParams extends SunoBaseParams {
  upload_url_list: [string, string];
  custom_mode: true;
  model?: SunoModel;
  style: string;
  title: string;
  prompt?: string;
  instrumental?: boolean;
}

export type CreateMashupParams = CreateMashupSimpleParams | CreateMashupCustomParams;

export interface TaskCreateResponse {
  id: string;
  status?: string;
  [key: string]: unknown;
}

export interface Audio {
  id: string;
  audio_url?: string;
  stream_audio_url?: string;
  image_url?: string;
  prompt?: string;
  model_name?: string;
  title?: string;
  tags?: string[];
  duration?: number;
  [key: string]: unknown;
}

export interface AsyncTaskResponse {
  id: string;
  status: TaskStatus;
  generation_stage?: GenerationStage;
  error?: string;
  [key: string]: unknown;
}

export interface TextToMusicResponse extends AsyncTaskResponse {
  audios?: Audio[];
}

export interface ExtendMusicResponse extends AsyncTaskResponse {
  original_task_id?: string;
  audios?: Audio[];
}

export interface GenerateArtworkResponse extends AsyncTaskResponse {
  covers?: Array<{ url: string }>;
}

export interface CoverAudioResponse extends AsyncTaskResponse {
  audios?: Audio[];
}

export interface AddInstrumentalResponse extends TextToMusicResponse {}
export interface AddVocalsResponse extends TextToMusicResponse {}
export interface TextToSoundResponse extends TextToMusicResponse {}

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

export interface SeparateAudioStemsResponse extends AsyncTaskResponse {
  separated_audios?: SeparatedAudio;
}

export interface MidiNote {
  pitch: number;
  start_time: number;
  end_time: number;
  velocity: number;
}

export interface MidiInstrument {
  name: string;
  notes: MidiNote[];
}

export interface GenerateMidiResponse extends AsyncTaskResponse {
  instruments?: MidiInstrument[];
}

export interface ConvertAudioResponse extends AsyncTaskResponse {
  wav_url?: string;
  original_task_id?: string;
}

export interface VisualizeMusicResponse extends AsyncTaskResponse {
  video_url?: string;
  original_task_id?: string;
}

export interface GenerateLyricsResponse extends AsyncTaskResponse {
  lyrics?: Array<{ title?: string; text: string }>;
}

export interface AlignedWord {
  word: string;
  success: boolean;
  start_time: number;
  end_time: number;
  palign: number;
}

export interface GetTimestampedLyricsResponse {
  aligned_words?: AlignedWord[];
  waveform_data?: number[];
  hoot_cer?: number;
  is_streamed?: boolean;
  [key: string]: unknown;
}

export interface ReplaceSectionResponse extends AsyncTaskResponse {
  track?: Audio;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  [key: string]: unknown;
}

export interface GeneratePersonaResponse {
  persona: Persona;
  error?: string;
  [key: string]: unknown;
}

export interface BoostStyleResponse {
  style: string;
  error?: string;
  [key: string]: unknown;
}

export interface CreateMashupResponse extends AsyncTaskResponse {
  audios?: Audio[];
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
export type CompletedTextToSoundResponse = TextToSoundResponse & { status: 'completed'; audios: Audio[] };
