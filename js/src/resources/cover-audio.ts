import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedCoverAudioResponse, CoverAudioParams, CoverAudioResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/cover_audio';

export class CoverAudio {
  constructor(private readonly http: HttpClient) {}

  async run(params: CoverAudioParams, options?: RequestOptions & PollingOptions): Promise<CompletedCoverAudioResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<CoverAudioResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedCoverAudioResponse;
  }

  async create(params: CoverAudioParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<CoverAudioResponse> {
    return this.http.request<CoverAudioResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
