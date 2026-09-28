import type { ActionSchema, HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { contract } from '../contract_gen';
import type { GetTimestampedLyricsResponse, TimestampedLyricsParams } from '../types';

const ENDPOINT = '/api/v1/timestamped_lyrics';

/** Retrieves word-level timing alignment for an audio resource. Synchronous (run only). */
export class TimestampedLyrics {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieve word-level timing alignment for an audio resource (synchronous).
   * @param params Timestamped lyrics parameters.
   * @param options Per-request overrides.
   * @returns The alignment and waveform for the request.
   */
  async run(params: TimestampedLyricsParams, options?: RequestOptions): Promise<GetTimestampedLyricsResponse> {
    const body = compactParams(params);
    validateParams(contract['timestamped-lyrics'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request<GetTimestampedLyricsResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }
}
