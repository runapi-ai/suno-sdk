import type { HttpClient, PollingOptions, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { BlendLyricsParams, BlendLyricsResponse, CompletedBlendLyricsResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/blend_lyrics';

/** Blends two caller-authored lyrics texts into a new lyrics result. */
export class BlendLyrics {
  constructor(private readonly http: HttpClient) {}

  async run(params: BlendLyricsParams, options?: RequestOptions & PollingOptions): Promise<CompletedBlendLyricsResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<BlendLyricsResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedBlendLyricsResponse;
  }

  async create(params: BlendLyricsParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {body, ...options});
  }

  async get(id: string, options?: RequestOptions): Promise<BlendLyricsResponse> {
    return this.http.request<BlendLyricsResponse>('GET', `${ENDPOINT}/${id}`, {...options});
  }
}
