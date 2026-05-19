import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedGenerateMidiResponse, GenerateMidiParams, GenerateMidiResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_midi';

export class GenerateMidi {
  constructor(private readonly http: HttpClient) {}

  async run(params: GenerateMidiParams, options?: RequestOptions & PollingOptions): Promise<CompletedGenerateMidiResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<GenerateMidiResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedGenerateMidiResponse;
  }

  async create(params: GenerateMidiParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<GenerateMidiResponse> {
    return this.http.request<GenerateMidiResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
