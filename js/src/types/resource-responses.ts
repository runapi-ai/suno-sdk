import type { TaskBillingResponse } from '@runapi.ai/core';
import type { AsyncTaskResponse, Audio } from './responses';

/** Availability of a RunAPI-owned resource. */
export type ResourceStatus = 'available' | 'failed';

/**
 * Billing envelope returned when retrieving a RunAPI-owned resource.
 * Resource provenance is intentionally opaque and is not exposed in this response.
 */
export interface ResourceBilling {}

/** A reusable persona resource. Pass `id` in the `persona_id` field of music generation params. */
export interface PersonaResource {
  id: string;
  name?: string;
  description?: string;
  [key: string]: unknown;
}

/** A reusable voice resource. Pass `id` wherever a voice persona is accepted. */
export interface VoiceResource {
  id: string;
  name?: string;
  [key: string]: unknown;
}

/** Result of creating a persona or its accepted local task. */
export interface PersonaCreationResponse extends TaskBillingResponse {
  persona: PersonaResource;
  id?: string;
  status?: string;
  error?: string;
  [key: string]: unknown;
}

/** Result of creating a voice. */
export interface VoiceCreationResponse extends TaskBillingResponse {
  voice: VoiceResource;
  error?: string;
  [key: string]: unknown;
}

/** Result of retrieving a persona resource. Resource provenance remains opaque. */
export interface PersonaResourceResponse {
  persona: PersonaResource;
  status: ResourceStatus;
  billing: ResourceBilling;
}

/** Result of retrieving a voice resource. `status` reports whether the voice is ready to use. */
export interface VoiceResourceResponse {
  voice: VoiceResource;
  status: ResourceStatus;
  billing: ResourceBilling;
}

/** Result of an audio export task. */
export interface AudioExportResponse extends AsyncTaskResponse {
  wav_url?: string;
  original_task_id?: string;
}

/** Result of a music visualization task. */
export interface MusicVisualizationResponse extends AsyncTaskResponse {
  video_url?: string;
  original_task_id?: string;
}

/** Result of a music-from-sample task. */
export interface MusicFromSampleResponse extends AsyncTaskResponse {
  audios?: Audio[];
}

export type CompletedAudioExportResponse = AudioExportResponse & { status: 'completed'; wav_url: string };
export type CompletedMusicVisualizationResponse = MusicVisualizationResponse & { status: 'completed'; video_url: string };
export type CompletedMusicFromSampleResponse = MusicFromSampleResponse & { status: 'completed'; audios: Audio[] };
