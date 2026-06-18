import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedConvertAudioResponse, ConvertAudioParams, ConvertAudioResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/convert_audio';

/** Converts a generated track to WAV format. */
export class ConvertAudio {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a convert audio task and wait until complete.
   * @param params Convert audio parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed convert audio response.
   */
  async run(params: ConvertAudioParams, options?: RequestOptions & PollingOptions): Promise<CompletedConvertAudioResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ConvertAudioResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedConvertAudioResponse;
  }

  /**
   * Create a convert audio task; returns immediately with a task id.
   * @param params Convert audio parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: ConvertAudioParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a convert audio task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current convert audio task status.
   */
  async get(id: string, options?: RequestOptions): Promise<ConvertAudioResponse> {
    return this.http.request<ConvertAudioResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
