import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { BoostStyleParams, BoostStyleResponse } from '../types';

const ENDPOINT = '/api/v1/suno/boost_style';

export class BoostStyle {
  constructor(private readonly http: HttpClient) {}

  async run(params: BoostStyleParams, options?: RequestOptions): Promise<BoostStyleResponse> {
    return this.http.request<BoostStyleResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
