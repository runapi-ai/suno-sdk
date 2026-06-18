import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedExtendMusicResponse, ExtendMusicParams, ExtendMusicResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/extend_music';

/** Continues an existing track from a specified timestamp, inheriting or overriding its settings. */
export class ExtendMusic {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create an extend music task and wait until complete.
   * @param params Extend music parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed extend music response.
   */
  async run(params: ExtendMusicParams, options?: RequestOptions & PollingOptions): Promise<CompletedExtendMusicResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ExtendMusicResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedExtendMusicResponse;
  }

  /**
   * Create an extend music task; returns immediately with a task id.
   * @param params Extend music parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: ExtendMusicParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of an extend music task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current extend music task status.
   */
  async get(id: string, options?: RequestOptions): Promise<ExtendMusicResponse> {
    return this.http.request<ExtendMusicResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
