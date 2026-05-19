import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedAddInstrumentalResponse, AddInstrumentalParams, AddInstrumentalResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/add_instrumental';

export class AddInstrumental {
  constructor(private readonly http: HttpClient) {}

  async run(params: AddInstrumentalParams, options?: RequestOptions & PollingOptions): Promise<CompletedAddInstrumentalResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<AddInstrumentalResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedAddInstrumentalResponse;
  }

  async create(params: AddInstrumentalParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<AddInstrumentalResponse> {
    return this.http.request<AddInstrumentalResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
