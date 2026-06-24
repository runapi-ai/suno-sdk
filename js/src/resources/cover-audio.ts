import type { HttpClient, RequestOptions, PollingOptions, ActionSchema } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type { CompletedCoverAudioResponse, CoverAudioParams, CoverAudioResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/cover_audio';

/** Re-records vocals over an uploaded audio file with a new style or voice. */
export class CoverAudio {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a cover audio task and wait until complete.
   * @param params Cover audio parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed cover audio response.
   */
  async run(params: CoverAudioParams, options?: RequestOptions & PollingOptions): Promise<CompletedCoverAudioResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<CoverAudioResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedCoverAudioResponse;
  }

  /**
   * Create a cover audio task; returns immediately with a task id.
   * @param params Cover audio parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: CoverAudioParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['cover-audio'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }

  /**
   * Fetch the current status of a cover audio task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current cover audio task status.
   */
  async get(id: string, options?: RequestOptions): Promise<CoverAudioResponse> {
    return this.http.request<CoverAudioResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
