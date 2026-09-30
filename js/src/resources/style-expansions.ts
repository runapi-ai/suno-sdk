import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { BoostStyleResponse, StyleExpansionParams } from '../types';

const ENDPOINT = '/api/v1/style_expansions';

/** Expands a style description into genre tags for use in style fields. Synchronous (run only). */
export class StyleExpansions {
  constructor(private readonly http: HttpClient) {}

  /**
   * Expand a style description into genre tags (synchronous).
   * @param params Style expansion parameters.
   * @param options Per-request overrides.
   * @returns The expanded style tags.
   */
  async run(params: StyleExpansionParams, options?: RequestOptions): Promise<BoostStyleResponse> {
    const body = compactParams(params);
    return this.http.request<BoostStyleResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }
}
