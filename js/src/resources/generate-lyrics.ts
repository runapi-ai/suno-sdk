import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedGenerateLyricsResponse, GenerateLyricsParams, GenerateLyricsResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_lyrics';

export class GenerateLyrics {
  constructor(private readonly http: HttpClient) {}

  async run(params: GenerateLyricsParams, options?: RequestOptions & PollingOptions): Promise<CompletedGenerateLyricsResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<GenerateLyricsResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedGenerateLyricsResponse;
  }

  async create(params: GenerateLyricsParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<GenerateLyricsResponse> {
    return this.http.request<GenerateLyricsResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
