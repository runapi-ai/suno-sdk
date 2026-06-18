import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedTextToMusicResponse, TextToMusicParams, TextToMusicResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/text_to_music';

/** Generates songs from a text prompt with configurable vocal mode, style, and persona. */
export class TextToMusic {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a text to music task and wait until complete.
   * @param params Text to music parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed text to music response.
   */
  async run(params: TextToMusicParams, options?: RequestOptions & PollingOptions): Promise<CompletedTextToMusicResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<TextToMusicResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedTextToMusicResponse;
  }

  /**
   * Create a text to music task; returns immediately with a task id.
   * @param params Text to music parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: TextToMusicParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a text to music task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current text to music task status.
   */
  async get(id: string, options?: RequestOptions): Promise<TextToMusicResponse> {
    return this.http.request<TextToMusicResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
