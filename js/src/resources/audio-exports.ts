import type { HttpClient, PollingOptions, RequestOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type {
  AudioExportParams,
  AudioExportResponse,
  CompletedAudioExportResponse,
  TaskCreateResponse,
} from '../types';

const ENDPOINT = '/api/v1/audio_exports';

/** Exports an audio resource as a downloadable file. */
export class AudioExports {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create an audio export and wait until complete.
   * @param params Audio export parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed audio export response.
   */
  async run(params: AudioExportParams, options?: RequestOptions & PollingOptions): Promise<CompletedAudioExportResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<AudioExportResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedAudioExportResponse;
  }

  /**
   * Create an audio export; returns immediately with a task id.
   * @param params Audio export parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: AudioExportParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }

  /**
   * Fetch the current status of an audio export.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current audio export task status.
   */
  async get(id: string, options?: RequestOptions): Promise<AudioExportResponse> {
    return this.http.request<AudioExportResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
