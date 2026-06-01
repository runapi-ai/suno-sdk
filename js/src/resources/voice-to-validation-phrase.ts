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

export class VoiceToValidationPhrase {
  constructor(private readonly http: HttpClient) {}

  async run(params: VoiceToValidationPhraseParams, options?: RequestOptions & PollingOptions): Promise<CompletedValidationPhraseResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ValidationPhraseResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedValidationPhraseResponse;
  }

  async create(params: VoiceToValidationPhraseParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<ValidationPhraseResponse> {
    return this.http.request<ValidationPhraseResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
