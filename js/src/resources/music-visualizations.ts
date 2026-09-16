import type { ActionSchema, HttpClient, PollingOptions, RequestOptions } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type {
  CompletedMusicVisualizationResponse,
  MusicVisualizationParams,
  MusicVisualizationResponse,
  TaskCreateResponse,
} from '../types';

const ENDPOINT = '/api/v1/music_visualizations';

/** Renders a visualization video for an audio resource. */
export class MusicVisualizations {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a visualization request and wait until complete.
   * @param params Music visualization parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed visualization response.
   */
  async run(params: MusicVisualizationParams, options?: RequestOptions & PollingOptions): Promise<CompletedMusicVisualizationResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<MusicVisualizationResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedMusicVisualizationResponse;
  }

  /**
   * Create a visualization request; returns immediately with a task id.
   * @param params Music visualization parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: MusicVisualizationParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['music-visualizations'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }

  /**
   * Fetch the current status of a visualization request.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current visualization task status.
   */
  async get(id: string, options?: RequestOptions): Promise<MusicVisualizationResponse> {
    return this.http.request<MusicVisualizationResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
