import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedReplaceSectionResponse, ReplaceSectionParams, ReplaceSectionResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/replace_section';

export class ReplaceSection {
  constructor(private readonly http: HttpClient) {}

  async run(params: ReplaceSectionParams, options?: RequestOptions & PollingOptions): Promise<CompletedReplaceSectionResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ReplaceSectionResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedReplaceSectionResponse;
  }

  async create(params: ReplaceSectionParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<ReplaceSectionResponse> {
    return this.http.request<ReplaceSectionResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
