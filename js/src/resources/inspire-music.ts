import type { HttpClient, RequestOptions, PollingOptions, ActionSchema } from '@runapi.ai/core';
import { compactParams, validateParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type { TextToMusicResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/inspire_music';

export interface InspireMusicParams {
  model: string;
  audio_urls: string[];
  callback_url?: string;
}

export class InspireMusic {
  constructor(private readonly http: HttpClient) {}

  async create(params: InspireMusicParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['inspire-music'] as ActionSchema, body as Record<string, unknown>);
    return this.http.request('POST', ENDPOINT, { body, ...options });
  }

  async get(id: string, options?: RequestOptions): Promise<TextToMusicResponse> {
    return this.http.request('GET', `${ENDPOINT}/${id}`, options);
  }

  async run(params: InspireMusicParams, options?: RequestOptions & PollingOptions): Promise<TextToMusicResponse> {
    const { id } = await this.create(params, options);
    return pollUntilComplete(() => this.get(id, options), options);
  }
}
