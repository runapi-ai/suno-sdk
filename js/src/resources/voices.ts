import type { ActionSchema, HttpClient, RequestOptions } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { contract } from '../contract_gen';
import type { VoiceCreationResponse, VoiceParams, VoiceResourceResponse } from '../types';

const ENDPOINT = '/api/v1/voices';

/**
 * Creates and retrieves reusable voices a music request can reference by ID.
 *
 * A voice is a RunAPI-owned resource: create it from a recording, then pass its ID
 * wherever a voice persona is accepted. {@link Voices.get} reports whether the voice
 * is ready, so no separate availability request is needed.
 */
export class Voices {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a voice from a recording (synchronous).
   * @param params Voice parameters.
   * @param options Per-request overrides.
   * @returns The created voice.
   */
  async run(params: VoiceParams, options?: RequestOptions): Promise<VoiceCreationResponse> {
    const body = compactParams(params);
    validateParams(contract['voices'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request<VoiceCreationResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }

  /**
   * Fetch a voice resource by its RunAPI-owned ID.
   * @param id The voice resource id.
   * @param options Per-request overrides.
   * @returns The voice resource and whether it is ready to use.
   */
  async get(id: string, options?: RequestOptions): Promise<VoiceResourceResponse> {
    return this.http.request<VoiceResourceResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
