import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { CoverAudio } from '../../src/resources/cover-audio';
import type { TaskCreateResponse } from '../../src/types';

describe('CoverAudio', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should include persona_type in create requests', async () => {
    const mockResponse: TaskCreateResponse = { id: 'cover-123' };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

    const coverAudio = new CoverAudio(mockHttp);
    const result = await coverAudio.create({
      upload_url: 'https://cdn.runapi.ai/public/samples/source.mp3',
      vocal_mode: 'exact_lyrics',
      lyrics: '[Verse] New lyrics',
      style: 'Pop',
      title: 'Cover Song',
      model: 'suno-v4',
      persona_id: 'persona_123',
      persona_type: 'style',
    });

    expect(mockHttp.request).toHaveBeenCalledWith(
      'POST',
      '/api/v1/suno/cover_audio',
      {
        body: {
          upload_url: 'https://cdn.runapi.ai/public/samples/source.mp3',
          vocal_mode: 'exact_lyrics',
          lyrics: '[Verse] New lyrics',
          style: 'Pop',
          title: 'Cover Song',
          model: 'suno-v4',
          persona_id: 'persona_123',
          persona_type: 'style',
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

});
