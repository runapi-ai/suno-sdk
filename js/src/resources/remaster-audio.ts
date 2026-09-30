import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { TextToMusicResponse, TaskCreateResponse } from '../types';
const ENDPOINT = '/api/v1/suno/remaster_audio';
export interface RemasterAudioParams { model: string; source_task_id: string; audio_id: string; variation_category?: 'subtle' | 'normal' | 'high'; callback_url?: string }
export class RemasterAudio {
  constructor(private readonly http: HttpClient) {}
  async create(params: RemasterAudioParams, options?: RequestOptions): Promise<TaskCreateResponse> { const body = compactParams(params); return this.http.request('POST', ENDPOINT, { body, ...options }); }
  async get(id: string, options?: RequestOptions): Promise<TextToMusicResponse> { return this.http.request('GET', `${ENDPOINT}/${id}`, options); }
  async run(params: RemasterAudioParams, options?: RequestOptions & PollingOptions): Promise<TextToMusicResponse> { const { id } = await this.create(params, options); return pollUntilComplete(() => this.get(id, options), options); }
}
