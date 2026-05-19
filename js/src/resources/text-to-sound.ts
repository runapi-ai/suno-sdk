import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedTextToSoundResponse, TextToSoundParams, TextToSoundResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/text_to_sound';

export class TextToSound {
  constructor(private readonly http: HttpClient) {}

  async run(params: TextToSoundParams, options?: RequestOptions & PollingOptions): Promise<CompletedTextToSoundResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<TextToSoundResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedTextToSoundResponse;
  }

  async create(params: TextToSoundParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<TextToSoundResponse> {
    return this.http.request<TextToSoundResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
