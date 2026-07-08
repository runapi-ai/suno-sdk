import type { HttpClient, RequestOptions, PollingOptions, ActionSchema } from '@runapi.ai/core';
import { compactParams, validateParams, ValidationError } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import { contract } from '../contract_gen';
import type { CompletedReplaceSectionResponse, ReplaceSectionParams, ReplaceSectionResponse, TaskCreateResponse } from '../types';

const ENDPOINT = '/api/v1/suno/replace_section';

/** Re-generates a time range within an existing track with new lyrics and style. */
export class ReplaceSection {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a replace section task and wait until complete.
   * @param params Replace section parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed replace section response.
   */
  async run(params: ReplaceSectionParams, options?: RequestOptions & PollingOptions): Promise<CompletedReplaceSectionResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ReplaceSectionResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedReplaceSectionResponse;
  }

  /**
   * Create a replace section task; returns immediately with a task id.
   * @param params Replace section parameters.
   * @param options Per-request overrides.
   * @returns The task creation result.
   */
  async create(params: ReplaceSectionParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    const body = compactParams(params);
    validateParams(contract['replace-section'] as ActionSchema, body as Record<string, unknown>);
    validateReplaceSection(body as Record<string, unknown>);
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body,
      ...options,
    });
  }

  /**
   * Fetch the current status of a replace section task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current replace section task status.
   */
  async get(id: string, options?: RequestOptions): Promise<ReplaceSectionResponse> {
    return this.http.request<ReplaceSectionResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}

function validateReplaceSection(body: Record<string, unknown>): void {
  validateReplaceSectionSource(body);

  const startTime = body.infill_start_time;
  const endTime = body.infill_end_time;
  if (typeof startTime !== 'number' || Number.isNaN(startTime)) {
    throw new ValidationError('infill_start_time must be a number');
  }
  if (typeof endTime !== 'number' || Number.isNaN(endTime)) {
    throw new ValidationError('infill_end_time must be a number');
  }
  if (endTime <= startTime) {
    throw new ValidationError('infill_end_time must be greater than infill_start_time');
  }

  const duration = endTime - startTime;
  if (duration < 6 || duration > 60) {
    throw new ValidationError('replacement duration must be between 6 and 60 seconds');
  }
}

function validateReplaceSectionSource(body: Record<string, unknown>): void {
  const hasExistingSource = isPresent(body.task_id) || isPresent(body.audio_id);
  const hasUploadedSource = isPresent(body.upload_url) || isPresent(body.model);

  if (hasExistingSource && hasUploadedSource) {
    throw new ValidationError('task_id/audio_id cannot be combined with upload_url/model');
  }

  if (hasExistingSource) {
    requireField(body, 'task_id');
    requireField(body, 'audio_id');
    return;
  }

  if (hasUploadedSource) {
    requireField(body, 'upload_url');
    requireField(body, 'model');
    return;
  }

  throw new ValidationError('task_id and audio_id, or upload_url and model are required');
}

function requireField(body: Record<string, unknown>, field: string): void {
  if (!isPresent(body[field])) {
    throw new ValidationError(`${field} is required`);
  }
}

function isPresent(value: unknown): boolean {
  if (value === undefined || value === null) {
    return false;
  }
  if (typeof value === 'string') {
    return value.length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return true;
}
