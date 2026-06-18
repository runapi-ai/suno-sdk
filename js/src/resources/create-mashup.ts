import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedCreateMashupResponse, CreateMashupParams, CreateMashupResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/create_mashup';

/** Blends two audio tracks into a single new composition. */
export class CreateMashup {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a create mashup task and wait until complete.
   * @param params Create mashup parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed create mashup response.
   */
  async run(params: CreateMashupParams, options?: RequestOptions & PollingOptions): Promise<CompletedCreateMashupResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<CreateMashupResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedCreateMashupResponse;
  }

  /**
   * Create a create mashup task; returns immediately with a task id.
   * @param params Create mashup parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: CreateMashupParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a create mashup task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current create mashup task status.
   */
  async get(id: string, options?: RequestOptions): Promise<CreateMashupResponse> {
    return this.http.request<CreateMashupResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
