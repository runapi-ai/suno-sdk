import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedGenerateArtworkResponse, GenerateArtworkParams, GenerateArtworkResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_artwork';

/** Creates cover artwork for an existing music task. */
export class GenerateArtwork {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a generate artwork task and wait until complete.
   * @param params Generate artwork parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed generate artwork response.
   */
  async run(params: GenerateArtworkParams, options?: RequestOptions & PollingOptions): Promise<CompletedGenerateArtworkResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<GenerateArtworkResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedGenerateArtworkResponse;
  }

  /**
   * Create a generate artwork task; returns immediately with a task id.
   * @param params Generate artwork parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: GenerateArtworkParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a generate artwork task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current generate artwork task status.
   */
  async get(id: string, options?: RequestOptions): Promise<GenerateArtworkResponse> {
    return this.http.request<GenerateArtworkResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
