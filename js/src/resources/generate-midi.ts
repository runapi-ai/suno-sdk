import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedGenerateMidiResponse, GenerateMidiParams, GenerateMidiResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_midi';

/** Extracts per-instrument MIDI note data from a generated track. */
export class GenerateMidi {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a generate midi task and wait until complete.
   * @param params Generate midi parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed generate midi response.
   */
  async run(params: GenerateMidiParams, options?: RequestOptions & PollingOptions): Promise<CompletedGenerateMidiResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<GenerateMidiResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedGenerateMidiResponse;
  }

  /**
   * Create a generate midi task; returns immediately with a task id.
   * @param params Generate midi parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: GenerateMidiParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a generate midi task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current generate midi task status.
   */
  async get(id: string, options?: RequestOptions): Promise<GenerateMidiResponse> {
    return this.http.request<GenerateMidiResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
