import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type {
  CompletedValidationPhraseResponse,
  RegenerateValidationPhraseParams,
  TaskCreateResponse,
  ValidationPhraseResponse,
} from '../types';

const ENDPOINT = '/api/v1/suno/regenerate_validation_phrase';

/** Step 2 (optional) of voice cloning: requests a new, easier validation phrase. */
export class RegenerateValidationPhrase {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a regenerate validation phrase task and wait until complete.
   * @param params Regenerate validation phrase parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed regenerate validation phrase response.
   */
  async run(params: RegenerateValidationPhraseParams, options?: RequestOptions & PollingOptions): Promise<CompletedValidationPhraseResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ValidationPhraseResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedValidationPhraseResponse;
  }

  /**
   * Create a regenerate validation phrase task; returns immediately with a task id.
   * @param params Regenerate validation phrase parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: RegenerateValidationPhraseParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a regenerate validation phrase task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current regenerate validation phrase task status.
   */
  async get(id: string, options?: RequestOptions): Promise<ValidationPhraseResponse> {
    return this.http.request<ValidationPhraseResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
