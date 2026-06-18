import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedReplaceSectionResponse, ReplaceSectionParams, ReplaceSectionResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/replace_section';

/** Re-generates a time range within an existing track with new lyrics and style. */
export class ReplaceSection {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a replace section task and wait until complete.
   * @param params Replace section parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed replace section response.
   */
  async run(params: ReplaceSectionParams, options?: RequestOptions & PollingOptions): Promise<CompletedReplaceSectionResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ReplaceSectionResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedReplaceSectionResponse;
  }

  /**
   * Create a replace section task; returns immediately with a task id.
   * @param params Replace section parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: ReplaceSectionParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a replace section task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current replace section task status.
   */
  async get(id: string, options?: RequestOptions): Promise<ReplaceSectionResponse> {
    return this.http.request<ReplaceSectionResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
