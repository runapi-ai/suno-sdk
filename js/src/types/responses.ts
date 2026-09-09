import type { TaskBillingResponse, TaskResponse } from '@runapi.ai/core';
import type { GenerationStage, TaskStatus } from './common';

/** Initial response from task creation with the assigned task ID. */
export interface TaskCreateResponse extends TaskBillingResponse {
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
export interface AsyncTaskResponse extends TaskResponse {
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
  pairs?: AdvancedStemPair[];
}

/** One audio result in an advanced stem extraction pair. */
export interface AdvancedStemAudio {
  id: string;
  duration_seconds: number;
  audio_url: string;
}

/** Extracted target stem and the remaining audio after removing it. */
export interface AdvancedStemPair {
  stem_name: string;
  extracted_audio: AdvancedStemAudio;
  remaining_audio: AdvancedStemAudio;
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

/** Result of blending two lyrics texts. */
export interface BlendLyricsResponse extends AsyncTaskResponse {
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
export interface GetTimestampedLyricsResponse extends TaskBillingResponse {
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
export interface GeneratePersonaResponse extends TaskBillingResponse {
  persona: Persona;
  error?: string;
  [key: string]: unknown;
}

/** Synchronous result of style tag generation. `style` contains the generated tags string. */
export interface BoostStyleResponse extends TaskBillingResponse {
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
export interface CheckVoiceResponse extends TaskBillingResponse {
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
export type CompletedBlendLyricsResponse = BlendLyricsResponse & { status: 'completed'; lyrics: Array<{ title?: string; text: string }> };
export type CompletedReplaceSectionResponse = ReplaceSectionResponse & { status: 'completed'; track: Audio };
export type CompletedCreateMashupResponse = CreateMashupResponse & { status: 'completed'; audios: Audio[] };
export type CompletedTextToSoundResponse = TextToSoundResponse & { status: 'completed'; audios: SoundAudio[] };
export type CompletedValidationPhraseResponse = ValidationPhraseResponse & { status: 'completed'; validation_phrase: string };
export type CompletedVoiceGenerationResponse = VoiceGenerationResponse & { status: 'completed'; voice_id: string };
