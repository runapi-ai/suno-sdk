import type { HttpClient, HybridTaskOptions, RequestOptions } from '@runapi.ai/core';
import { compactParams, createHybridTask } from '@runapi.ai/core';
import type { PersonaCreationResponse, PersonaParams, PersonaResourceResponse } from '../types';

const ENDPOINT = '/api/v1/personas';

/**
 * Creates and retrieves the reusable personas a music request can reference by ID.
 *
 * A persona is a RunAPI-owned resource: create it once, then pass its ID in the
 * `persona_id` field of music generation params. Holding the resource ID instead of
 * the creating request keeps a workflow resumable after that request is gone.
 */
export class Personas {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a persona and wait for its terminal result.
   * @param params Persona parameters.
   * @param options Per-request and polling overrides.
   * @returns The created persona.
   */
  async run(params: PersonaParams, options?: HybridTaskOptions): Promise<PersonaCreationResponse> {
    const body = compactParams(params);
    return (await createHybridTask<PersonaCreationResponse>(this.http, ENDPOINT, { body, ...options })).run();
  }

  /**
   * Fetch a persona resource by its RunAPI-owned ID.
   * @param id The persona resource id.
   * @param options Per-request overrides.
   * @returns The persona resource and its availability.
   */
  async get(id: string, options?: RequestOptions): Promise<PersonaResourceResponse> {
    return this.http.request<PersonaResourceResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
