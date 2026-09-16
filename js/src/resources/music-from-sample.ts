import type { ActionSchema, HttpClient, PollingOptions, RequestOptions } from '@runapi.ai/core';
import { compactParams, validateParams, ValidationError } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type {
  CompletedMusicFromSampleResponse,
  MusicFromSampleParams,
  MusicFromSampleResponse,
  TaskCreateResponse,
} from '../types';

const ENDPOINT = '/api/v1/music_from_sample';

/** Creates new music guided by a sample of an uploaded audio file. */
export class MusicFromSample {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a music-from-sample task and wait until complete.
   * @param params Music from sample parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed music from sample response.
   */
  async run(params: MusicFromSampleParams, options?: RequestOptions & PollingOptions): Promise<CompletedMusicFromSampleResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<MusicFromSampleResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedMusicFromSampleResponse;
  }

  /**
   * Create a music-from-sample task; returns immediately with a task id.
   * @param params Music from sample parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: MusicFromSampleParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['music-from-sample'] as ActionSchema, body as Record<string, unknown>);
    if (params.end_seconds <= params.start_seconds) {
      throw new ValidationError('end_seconds must be greater than start_seconds');
    }
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }

  /**
   * Fetch the current status of a music-from-sample task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current music from sample task status.
   */
  async get(id: string, options?: RequestOptions): Promise<MusicFromSampleResponse> {
    return this.http.request<MusicFromSampleResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
