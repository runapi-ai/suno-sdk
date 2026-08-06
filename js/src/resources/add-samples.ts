import type { HttpClient, RequestOptions, PollingOptions, ActionSchema } from '@runapi.ai/core';
import { compactParams, validateParams, ValidationError } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type { TextToMusicResponse, TaskCreateResponse } from '../types';
const ENDPOINT = '/api/v1/suno/add_samples';
export interface AddSamplesParams { model: string; audio_url: string; start_seconds: number; end_seconds: number; callback_url?: string }
export class AddSamples {
  constructor(private readonly http: HttpClient) {}
  async create(params: AddSamplesParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['add-samples'] as ActionSchema, body as Record<string, unknown>);
    if (params.end_seconds <= params.start_seconds) {
      throw new ValidationError('end_seconds must be greater than start_seconds');
    }
    return this.http.request('POST', ENDPOINT, { body, ...options });
  }
  async get(id: string, options?: RequestOptions): Promise<TextToMusicResponse> { return this.http.request('GET', `${ENDPOINT}/${id}`, options); }
  async run(params: AddSamplesParams, options?: RequestOptions & PollingOptions): Promise<TextToMusicResponse> { const { id } = await this.create(params, options); return pollUntilComplete(() => this.get(id, options), options); }
}
