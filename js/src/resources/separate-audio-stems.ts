import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedSeparateAudioStemsResponse, SeparateAudioStemsParams, SeparateAudioStemsResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/separate_audio_stems';

export class SeparateAudioStems {
  constructor(private readonly http: HttpClient) {}

  async run(params: SeparateAudioStemsParams, options?: RequestOptions & PollingOptions): Promise<CompletedSeparateAudioStemsResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<SeparateAudioStemsResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedSeparateAudioStemsResponse;
  }

  async create(params: SeparateAudioStemsParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<SeparateAudioStemsResponse> {
    return this.http.request<SeparateAudioStemsResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
