import type { ActionSchema, HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { contract } from '../contract_gen';
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
    validateParams(contract['style-expansions'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request<BoostStyleResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }
}
