import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedVisualizeMusicResponse, VisualizeMusicParams, VisualizeMusicResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/visualize_music';

export class VisualizeMusic {
  constructor(private readonly http: HttpClient) {}

  async run(params: VisualizeMusicParams, options?: RequestOptions & PollingOptions): Promise<CompletedVisualizeMusicResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<VisualizeMusicResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedVisualizeMusicResponse;
  }

  async create(params: VisualizeMusicParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<VisualizeMusicResponse> {
    return this.http.request<VisualizeMusicResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
