import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { GetTimestampedLyricsParams, GetTimestampedLyricsResponse } from '../types';

const ENDPOINT = '/api/v1/suno/get_timestamped_lyrics';

/** Retrieves word-level timing alignment for a track. Synchronous (run only, no create/get polling). */
export class GetTimestampedLyrics {
  constructor(private readonly http: HttpClient) {}

  /**
   * Run get timestamped lyrics (synchronous).
   * @param params Get timestamped lyrics parameters.
   * @param options Per-request overrides.
   * @returns The get timestamped lyrics response.
   */
  async run(params: GetTimestampedLyricsParams, options?: RequestOptions): Promise<GetTimestampedLyricsResponse> {
    return this.http.request<GetTimestampedLyricsResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
