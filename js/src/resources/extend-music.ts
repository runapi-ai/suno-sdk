import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type { CompletedExtendMusicResponse, ExtendMusicParams, ExtendMusicResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/extend_music';

export class ExtendMusic {
  constructor(private readonly http: HttpClient) {}

  async run(params: ExtendMusicParams, options?: RequestOptions & PollingOptions): Promise<CompletedExtendMusicResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ExtendMusicResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedExtendMusicResponse;
  }

  async create(params: ExtendMusicParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<ExtendMusicResponse> {
    return this.http.request<ExtendMusicResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
