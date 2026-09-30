import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { TextToMusicResponse, TaskCreateResponse } from '../types';
const ENDPOINT = '/api/v1/suno/add_samples';
export interface AddSamplesParams { model: string; audio_url: string; prompt?: string; start_seconds: number; end_seconds: number; callback_url?: string }
/**
 * Creates new music guided by a sample of an uploaded audio file.
 * @deprecated Use {@link MusicFromSample}, the canonical way to sample an uploaded audio file.
 */
export class AddSamples {
  constructor(private readonly http: HttpClient) {}
  async create(params: AddSamplesParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    return this.http.request('POST', ENDPOINT, { body, ...options });
  }
  async get(id: string, options?: RequestOptions): Promise<TextToMusicResponse> { return this.http.request('GET', `${ENDPOINT}/${id}`, options); }
  async run(params: AddSamplesParams, options?: RequestOptions & PollingOptions): Promise<TextToMusicResponse> { const { id } = await this.create(params, options); return pollUntilComplete(() => this.get(id, options), options); }
}
