import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedAddInstrumentalResponse, AddInstrumentalParams, AddInstrumentalResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/add_instrumental';

/** Generates and adds an instrumental backing track to uploaded audio. */
export class AddInstrumental {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create an add instrumental task and wait until complete.
   * @param params Add instrumental parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed add instrumental response.
   */
  async run(params: AddInstrumentalParams, options?: RequestOptions & PollingOptions): Promise<CompletedAddInstrumentalResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<AddInstrumentalResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedAddInstrumentalResponse;
  }

  /**
   * Create an add instrumental task; returns immediately with a task id.
   * @param params Add instrumental parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: AddInstrumentalParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of an add instrumental task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current add instrumental task status.
   */
  async get(id: string, options?: RequestOptions): Promise<AddInstrumentalResponse> {
    return this.http.request<AddInstrumentalResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
