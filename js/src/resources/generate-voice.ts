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

/** Step 3 of voice cloning: trains a custom voice from the user's recording of the validation phrase. */
export class GenerateVoice {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a generate voice task and wait until complete.
   * @param params Generate voice parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed generate voice response.
   */
  async run(params: GenerateVoiceParams, options?: RequestOptions & PollingOptions): Promise<CompletedVoiceGenerationResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<VoiceGenerationResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedVoiceGenerationResponse;
  }

  /**
   * Create a generate voice task; returns immediately with a task id.
   * @param params Generate voice parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: GenerateVoiceParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a generate voice task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current generate voice task status.
   */
  async get(id: string, options?: RequestOptions): Promise<VoiceGenerationResponse> {
    return this.http.request<VoiceGenerationResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
