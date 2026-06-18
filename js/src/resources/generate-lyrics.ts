import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedGenerateLyricsResponse, GenerateLyricsParams, GenerateLyricsResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_lyrics';

/** Produces AI-generated lyrics from a text prompt. */
export class GenerateLyrics {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a generate lyrics task and wait until complete.
   * @param params Generate lyrics parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed generate lyrics response.
   */
  async run(params: GenerateLyricsParams, options?: RequestOptions & PollingOptions): Promise<CompletedGenerateLyricsResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<GenerateLyricsResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedGenerateLyricsResponse;
  }

  /**
   * Create a generate lyrics task; returns immediately with a task id.
   * @param params Generate lyrics parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: GenerateLyricsParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a generate lyrics task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current generate lyrics task status.
   */
  async get(id: string, options?: RequestOptions): Promise<GenerateLyricsResponse> {
    return this.http.request<GenerateLyricsResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
