import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { MusicVisualizations } from '../../src/resources/music-visualizations';
import type { MusicVisualizationResponse, TaskCreateResponse } from '../../src/types';

describe('MusicVisualizations', () => {
  const mockHttp: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('posts the visualization request and returns the task acceptance', async () => {
    const acceptance: TaskCreateResponse = { id: 'visualization_123', status: 'pending' };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(acceptance);

    const result = await new MusicVisualizations(mockHttp).create({
      source_audio_id: 'audio_456',
      author: 'RunAPI',
      domain_name: 'runapi.ai',
    });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/music_visualizations', {
      body: {
        source_audio_id: 'audio_456',
        author: 'RunAPI',
        domain_name: 'runapi.ai',
      },
    });
    expect(result.id).toBe('visualization_123');
  });

  it('fetches a visualization task by id', async () => {
    const completed: MusicVisualizationResponse = {
      id: 'visualization_123',
      status: 'completed',
      video_url: 'https://cdn.runapi.ai/public/samples/visualization.mp4',
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(completed);

    const result = await new MusicVisualizations(mockHttp).get('visualization_123');

    expect(mockHttp.request).toHaveBeenCalledWith('GET', '/api/v1/music_visualizations/visualization_123', {});
    expect(result.video_url).toBe('https://cdn.runapi.ai/public/samples/visualization.mp4');
  });

  it('creates a visualization and polls until it completes', async () => {
    vi.mocked(mockHttp.request)
      .mockResolvedValueOnce({ id: 'visualization_123', status: 'pending' })
      .mockResolvedValueOnce({
        id: 'visualization_123',
        status: 'completed',
        video_url: 'https://cdn.runapi.ai/public/samples/visualization.mp4',
      });

    const result = await new MusicVisualizations(mockHttp).run(
      { source_audio_id: 'audio_456' },
      { pollIntervalMs: 1 }
    );

    expect(mockHttp.request).toHaveBeenCalledTimes(2);
    expect(result.video_url).toBe('https://cdn.runapi.ai/public/samples/visualization.mp4');
  });
});
