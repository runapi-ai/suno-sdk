import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { BoostStyleParams, BoostStyleResponse } from '../types';

const ENDPOINT = '/api/v1/suno/boost_style';

/** Generates style/genre tags from a text description for use in style fields. Synchronous (run only). */
export class BoostStyle {
  constructor(private readonly http: HttpClient) {}

  /**
   * Run boost style (synchronous).
   * @param params Boost style parameters.
   * @param options Per-request overrides.
   * @returns The boost style response.
   */
  async run(params: BoostStyleParams, options?: RequestOptions): Promise<BoostStyleResponse> {
    return this.http.request<BoostStyleResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
