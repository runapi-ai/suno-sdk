import type { HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import type { GeneratePersonaParams, GeneratePersonaResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_persona';

export class GeneratePersona {
  constructor(private readonly http: HttpClient) {}

  async run(params: GeneratePersonaParams, options?: RequestOptions): Promise<GeneratePersonaResponse> {
    return this.http.request<GeneratePersonaResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }
}
