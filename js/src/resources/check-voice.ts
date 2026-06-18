import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { CheckVoiceParams, CheckVoiceResponse } from '../types';

const ENDPOINT = '/api/v1/suno/check_voice';

/** Step 4 of voice cloning: checks whether a custom voice is ready for use. Synchronous (run only). */
export class CheckVoice {
  constructor(private readonly http: HttpClient) {}

  /**
   * Run check voice (synchronous).
   * @param params Check voice parameters.
   * @param options Per-request overrides.
   * @returns The check voice response.
   */
  async run(params: CheckVoiceParams, options?: RequestOptions): Promise<CheckVoiceResponse> {
    return this.http.request<CheckVoiceResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
