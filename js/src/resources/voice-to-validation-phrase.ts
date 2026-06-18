import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type {
  CompletedValidationPhraseResponse,
  TaskCreateResponse,
  ValidationPhraseResponse,
  VoiceToValidationPhraseParams,
} from '../types';

const ENDPOINT = '/api/v1/suno/voice_to_validation_phrase';

/** Step 1 of voice cloning: extracts a validation phrase from a voice recording for the user to re-record. */
export class VoiceToValidationPhrase {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a voice to validation phrase task and wait until complete.
   * @param params Voice to validation phrase parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed voice to validation phrase response.
   */
  async run(params: VoiceToValidationPhraseParams, options?: RequestOptions & PollingOptions): Promise<CompletedValidationPhraseResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ValidationPhraseResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedValidationPhraseResponse;
  }

  /**
   * Create a voice to validation phrase task; returns immediately with a task id.
   * @param params Voice to validation phrase parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: VoiceToValidationPhraseParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a voice to validation phrase task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current voice to validation phrase task status.
   */
  async get(id: string, options?: RequestOptions): Promise<ValidationPhraseResponse> {
    return this.http.request<ValidationPhraseResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
