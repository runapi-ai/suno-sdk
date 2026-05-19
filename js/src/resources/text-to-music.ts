import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedTextToMusicResponse, TextToMusicParams, TextToMusicResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/text_to_music';

export class TextToMusic {
  constructor(private readonly http: HttpClient) {}

  async run(params: TextToMusicParams, options?: RequestOptions & PollingOptions): Promise<CompletedTextToMusicResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<TextToMusicResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedTextToMusicResponse;
  }

  async create(params: TextToMusicParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<TextToMusicResponse> {
    return this.http.request<TextToMusicResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
