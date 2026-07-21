import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { BlendLyrics } from '../../src/resources/blend-lyrics';

describe('BlendLyrics', () => {
  const http: HttpClient = {request: vi.fn()};

  beforeEach(() => vi.clearAllMocks());

  it('creates a task with the flat lyrics pair', async () => {
    vi.mocked(http.request).mockResolvedValueOnce({id: 'blend-123', status: 'processing'});

    await new BlendLyrics(http).create({lyrics_a: 'First verse', lyrics_b: 'Second verse'});

    expect(http.request).toHaveBeenCalledWith('POST', '/api/v1/suno/blend_lyrics', {
      body: {lyrics_a: 'First verse', lyrics_b: 'Second verse'},
    });
  });

  it('fetches a task by id', async () => {
    vi.mocked(http.request).mockResolvedValueOnce({id: 'blend-123', status: 'completed', lyrics: []});

    await new BlendLyrics(http).get('blend-123');

    expect(http.request).toHaveBeenCalledWith('GET', '/api/v1/suno/blend_lyrics/blend-123', {});
  });
});
