import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { MusicFromSample } from '../../src/resources/music-from-sample';
import type { MusicFromSampleResponse, TaskCreateResponse } from '../../src/types';

describe('MusicFromSample', () => {
  const mockHttp: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('posts the sample request and returns the task acceptance', async () => {
    const acceptance: TaskCreateResponse = { id: 'sample_123', status: 'pending' };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(acceptance);

    const result = await new MusicFromSample(mockHttp).create({
      model: 'suno-v5',
      audio_url: 'https://cdn.runapi.ai/public/samples/source.mp3',
      prompt: 'Add a crisp handclap sample to the chorus',
      start_seconds: 5,
      end_seconds: 20,
    });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/music_from_sample', {
      body: {
        model: 'suno-v5',
        audio_url: 'https://cdn.runapi.ai/public/samples/source.mp3',
        prompt: 'Add a crisp handclap sample to the chorus',
        start_seconds: 5,
        end_seconds: 20,
      },
    });
    expect(result.id).toBe('sample_123');
  });

  it('rejects a sample window that does not advance', async () => {
    await expect(
      new MusicFromSample(mockHttp).create({
        model: 'suno-v5',
        audio_url: 'https://cdn.runapi.ai/public/samples/source.mp3',
        start_seconds: 20,
        end_seconds: 20,
      })
    ).rejects.toThrow('end_seconds must be greater than start_seconds');
    expect(mockHttp.request).not.toHaveBeenCalled();
  });

  it('fetches a sample task by id', async () => {
    const completed: MusicFromSampleResponse = {
      id: 'sample_123',
      status: 'completed',
      audios: [{ id: 'audio_789', audio_url: 'https://cdn.runapi.ai/public/samples/sampled.mp3' }],
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(completed);

    const result = await new MusicFromSample(mockHttp).get('sample_123');

    expect(mockHttp.request).toHaveBeenCalledWith('GET', '/api/v1/music_from_sample/sample_123', {});
    expect(result.audios?.[0].audio_url).toBe('https://cdn.runapi.ai/public/samples/sampled.mp3');
  });

  it('creates a sample and polls until it completes', async () => {
    vi.mocked(mockHttp.request)
      .mockResolvedValueOnce({ id: 'sample_123', status: 'pending' })
      .mockResolvedValueOnce({
        id: 'sample_123',
        status: 'completed',
        audios: [{ id: 'audio_789', audio_url: 'https://cdn.runapi.ai/public/samples/sampled.mp3' }],
      });

    const result = await new MusicFromSample(mockHttp).run(
      {
        model: 'suno-v5',
        audio_url: 'https://cdn.runapi.ai/public/samples/source.mp3',
        start_seconds: 5,
        end_seconds: 20,
      },
      { pollIntervalMs: 1 }
    );

    expect(mockHttp.request).toHaveBeenCalledTimes(2);
    expect(result.audios).toHaveLength(1);
  });
});
