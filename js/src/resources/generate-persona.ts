import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { GeneratePersonaParams, GeneratePersonaResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_persona';

/** Creates a reusable style or voice persona from an existing track's vocals. Synchronous (run only). */
export class GeneratePersona {
  constructor(private readonly http: HttpClient) {}

  /**
   * Run generate persona (synchronous).
   * @param params Generate persona parameters.
   * @param options Per-request overrides.
   * @returns The generate persona response.
   */
  async run(params: GeneratePersonaParams, options?: RequestOptions): Promise<GeneratePersonaResponse> {
    return this.http.request<GeneratePersonaResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
