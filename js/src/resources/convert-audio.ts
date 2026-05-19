import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedConvertAudioResponse, ConvertAudioParams, ConvertAudioResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/convert_audio';

export class ConvertAudio {
  constructor(private readonly http: HttpClient) {}

  async run(params: ConvertAudioParams, options?: RequestOptions & PollingOptions): Promise<CompletedConvertAudioResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ConvertAudioResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedConvertAudioResponse;
  }

  async create(params: ConvertAudioParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<ConvertAudioResponse> {
    return this.http.request<ConvertAudioResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
