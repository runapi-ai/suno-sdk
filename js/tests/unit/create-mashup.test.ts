import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { CreateMashup } from '../../src/resources/create-mashup';
import type { TaskCreateResponse } from '../../src/types';

describe('CreateMashup', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should include persona_type in create requests', async () => {
    const mockResponse: TaskCreateResponse = { id: 'mashup-123' };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

    const createMashup = new CreateMashup(mockHttp);
    const result = await createMashup.create({
      upload_url_list: ['https://cdn.runapi.ai/public/samples/audio.mp3', 'https://cdn.runapi.ai/public/samples/audio-2.mp3'],
      vocal_mode: 'exact_lyrics',
      lyrics: '[Verse] Blend both hooks',
      style: 'Pop',
      title: 'Mashup Song',
      model: 'suno-v5',
      persona_id: 'persona_123',
      persona_type: 'style',
    });

    expect(mockHttp.request).toHaveBeenCalledWith(
      'POST',
      '/api/v1/suno/create_mashup',
      {
        body: {
          upload_url_list: ['https://cdn.runapi.ai/public/samples/audio.mp3', 'https://cdn.runapi.ai/public/samples/audio-2.mp3'],
          vocal_mode: 'exact_lyrics',
          lyrics: '[Verse] Blend both hooks',
          style: 'Pop',
          title: 'Mashup Song',
          model: 'suno-v5',
          persona_id: 'persona_123',
          persona_type: 'style',
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

});
