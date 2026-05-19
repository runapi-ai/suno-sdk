import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedCreateMashupResponse, CreateMashupParams, CreateMashupResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/create_mashup';

export class CreateMashup {
  constructor(private readonly http: HttpClient) {}

  async run(params: CreateMashupParams, options?: RequestOptions & PollingOptions): Promise<CompletedCreateMashupResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<CreateMashupResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedCreateMashupResponse;
  }

  async create(params: CreateMashupParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<CreateMashupResponse> {
    return this.http.request<CreateMashupResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
