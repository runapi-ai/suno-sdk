import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { CheckVoiceParams, CheckVoiceResponse } from '../types';

const ENDPOINT = '/api/v1/suno/check_voice';

export class CheckVoice {
  constructor(private readonly http: HttpClient) {}

  async run(params: CheckVoiceParams, options?: RequestOptions): Promise<CheckVoiceResponse> {
    return this.http.request<CheckVoiceResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
