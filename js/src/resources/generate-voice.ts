import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type {
  CompletedVoiceGenerationResponse,
  GenerateVoiceParams,
  TaskCreateResponse,
  VoiceGenerationResponse,
} from '../types';

const ENDPOINT = '/api/v1/suno/generate_voice';

export class GenerateVoice {
  constructor(private readonly http: HttpClient) {}

  async run(params: GenerateVoiceParams, options?: RequestOptions & PollingOptions): Promise<CompletedVoiceGenerationResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<VoiceGenerationResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedVoiceGenerationResponse;
  }

  async create(params: GenerateVoiceParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<VoiceGenerationResponse> {
    return this.http.request<VoiceGenerationResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
