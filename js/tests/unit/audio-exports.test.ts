import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { AudioExports } from '../../src/resources/audio-exports';
import type { AudioExportResponse, TaskCreateResponse } from '../../src/types';

describe('AudioExports', () => {
  const mockHttp: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('posts the export request and returns the task acceptance', async () => {
    const acceptance: TaskCreateResponse = { id: 'export_123', status: 'pending' };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(acceptance);

    const result = await new AudioExports(mockHttp).create({
      source_audio_id: 'audio_456',
      source_task_id: 'task_123',
      callback_url: 'https://your-domain.com/webhook',
    });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/audio_exports', {
      body: {
        source_audio_id: 'audio_456',
        source_task_id: 'task_123',
        callback_url: 'https://your-domain.com/webhook',
      },
    });
    expect(result.id).toBe('export_123');
  });

  it('fetches an export task by id', async () => {
    const completed: AudioExportResponse = {
      id: 'export_123',
      status: 'completed',
      wav_url: 'https://cdn.runapi.ai/public/samples/export.wav',
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(completed);

    const result = await new AudioExports(mockHttp).get('export_123');

    expect(mockHttp.request).toHaveBeenCalledWith('GET', '/api/v1/audio_exports/export_123', {});
    expect(result.wav_url).toBe('https://cdn.runapi.ai/public/samples/export.wav');
  });

  it('creates an export and polls until it completes', async () => {
    vi.mocked(mockHttp.request)
      .mockResolvedValueOnce({ id: 'export_123', status: 'pending' })
      .mockResolvedValueOnce({ id: 'export_123', status: 'processing' })
      .mockResolvedValueOnce({
        id: 'export_123',
        status: 'completed',
        wav_url: 'https://cdn.runapi.ai/public/samples/export.wav',
      });

    const result = await new AudioExports(mockHttp).run({ source_audio_id: 'audio_456' }, { pollIntervalMs: 1 });

    expect(mockHttp.request).toHaveBeenCalledTimes(3);
    expect(result.status).toBe('completed');
    expect(result.wav_url).toBe('https://cdn.runapi.ai/public/samples/export.wav');
  });
});
