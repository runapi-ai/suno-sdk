import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedSeparateAudioStemsResponse, SeparateAudioStemsParams, SeparateAudioStemsResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/separate_audio_stems';

/** Splits a track into individual instrument stems (vocals, drums, bass, guitar, etc.). */
export class SeparateAudioStems {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a separate audio stems task and wait until complete.
   * @param params Separate audio stems parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed separate audio stems response.
   */
  async run(params: SeparateAudioStemsParams, options?: RequestOptions & PollingOptions): Promise<CompletedSeparateAudioStemsResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<SeparateAudioStemsResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedSeparateAudioStemsResponse;
  }

  /**
   * Create a separate audio stems task; returns immediately with a task id.
   * @param params Separate audio stems parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: SeparateAudioStemsParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a separate audio stems task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current separate audio stems task status.
   */
  async get(id: string, options?: RequestOptions): Promise<SeparateAudioStemsResponse> {
    return this.http.request<SeparateAudioStemsResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
