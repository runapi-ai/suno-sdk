import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedVisualizeMusicResponse, VisualizeMusicParams, VisualizeMusicResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/visualize_music';

/** Generates a music visualization video from an existing track. */
export class VisualizeMusic {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a visualize music task and wait until complete.
   * @param params Visualize music parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed visualize music response.
   */
  async run(params: VisualizeMusicParams, options?: RequestOptions & PollingOptions): Promise<CompletedVisualizeMusicResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<VisualizeMusicResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedVisualizeMusicResponse;
  }

  /**
   * Create a visualize music task; returns immediately with a task id.
   * @param params Visualize music parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: VisualizeMusicParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a visualize music task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current visualize music task status.
   */
  async get(id: string, options?: RequestOptions): Promise<VisualizeMusicResponse> {
    return this.http.request<VisualizeMusicResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
