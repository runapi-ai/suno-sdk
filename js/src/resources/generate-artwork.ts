import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedGenerateArtworkResponse, GenerateArtworkParams, GenerateArtworkResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/generate_artwork';

export class GenerateArtwork {
  constructor(private readonly http: HttpClient) {}

  async run(params: GenerateArtworkParams, options?: RequestOptions & PollingOptions): Promise<CompletedGenerateArtworkResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<GenerateArtworkResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedGenerateArtworkResponse;
  }

  async create(params: GenerateArtworkParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<GenerateArtworkResponse> {
    return this.http.request<GenerateArtworkResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
