import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedAddVocalsResponse, AddVocalsParams, AddVocalsResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/add_vocals';

/** Generates and adds vocals to an uploaded instrumental track. */
export class AddVocals {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create an add vocals task and wait until complete.
   * @param params Add vocals parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed add vocals response.
   */
  async run(params: AddVocalsParams, options?: RequestOptions & PollingOptions): Promise<CompletedAddVocalsResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<AddVocalsResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedAddVocalsResponse;
  }

  /**
   * Create an add vocals task; returns immediately with a task id.
   * @param params Add vocals parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: AddVocalsParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of an add vocals task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current add vocals task status.
   */
  async get(id: string, options?: RequestOptions): Promise<AddVocalsResponse> {
    return this.http.request<AddVocalsResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
