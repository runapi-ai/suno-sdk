import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedAddVocalsResponse, AddVocalsParams, AddVocalsResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/add_vocals';

export class AddVocals {
  constructor(private readonly http: HttpClient) {}

  async run(params: AddVocalsParams, options?: RequestOptions & PollingOptions): Promise<CompletedAddVocalsResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<AddVocalsResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedAddVocalsResponse;
  }

  async create(params: AddVocalsParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<AddVocalsResponse> {
    return this.http.request<AddVocalsResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
