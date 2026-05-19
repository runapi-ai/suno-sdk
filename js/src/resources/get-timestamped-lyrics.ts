import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { GetTimestampedLyricsParams, GetTimestampedLyricsResponse } from '../types';

const ENDPOINT = '/api/v1/suno/get_timestamped_lyrics';

export class GetTimestampedLyrics {
  constructor(private readonly http: HttpClient) {}

  async run(params: GetTimestampedLyricsParams, options?: RequestOptions): Promise<GetTimestampedLyricsResponse> {
    return this.http.request<GetTimestampedLyricsResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
