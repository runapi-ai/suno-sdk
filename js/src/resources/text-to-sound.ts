import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedTextToSoundResponse, TextToSoundParams, TextToSoundResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/text_to_sound';

/** Generates sound effects (not music) from a text description with optional looping and BPM control. */
export class TextToSound {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a text to sound task and wait until complete.
   * @param params Text to sound parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed text to sound response.
   */
  async run(params: TextToSoundParams, options?: RequestOptions & PollingOptions): Promise<CompletedTextToSoundResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<TextToSoundResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedTextToSoundResponse;
  }

  /**
   * Create a text to sound task; returns immediately with a task id.
   * @param params Text to sound parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: TextToSoundParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a text to sound task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current text to sound task status.
   */
  async get(id: string, options?: RequestOptions): Promise<TextToSoundResponse> {
    return this.http.request<TextToSoundResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
