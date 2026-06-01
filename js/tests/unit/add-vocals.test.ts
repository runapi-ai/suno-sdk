import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddVocals } from '../../src/resources/add-vocals';
import type { HttpClient } from '@runapi.ai/core';
import type { TaskCreateResponse } from '../../src/types';

describe('AddVocals', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends lyrics for vocal generation', async () => {
    const mockResponse: TaskCreateResponse = { id: 'vocals-123' };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

    const addVocals = new AddVocals(mockHttp);
    const result = await addVocals.create({
      upload_url: 'https://cdn.runapi.ai/public/samples/instrumental.mp3',
      lyrics: '[Verse] sing this',
      title: 'Song',
      negative_tags: 'screaming',
      style: 'Pop',
      model: 'suno-v5',
    });

    expect(mockHttp.request).toHaveBeenCalledWith(
      'POST',
      '/api/v1/suno/add_vocals',
      {
        body: {
          upload_url: 'https://cdn.runapi.ai/public/samples/instrumental.mp3',
          lyrics: '[Verse] sing this',
          title: 'Song',
          negative_tags: 'screaming',
          style: 'Pop',
          model: 'suno-v5',
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });
});
