import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddInstrumental } from '../../src/resources/add-instrumental';
import type { HttpClient } from '@runapi.ai/core';
import type { AddInstrumentalResponse, TaskCreateResponse } from '../../src/types';

describe('AddInstrumental', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should send correct request for instrumental', async () => {
      const mockResponse: TaskCreateResponse = { id: 'inst-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const addInstrumental = new AddInstrumental(mockHttp);
      const result = await addInstrumental.create({
        upload_url: 'https://example.com/addVocals.mp3',
        title: 'My Song',
        tags: 'Pop, Energetic',
        negative_tags: 'Heavy Metal',
        model: 'suno-v4.5-plus',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/add_instrumental',
        {
          body: {
            upload_url: 'https://example.com/addVocals.mp3',
            title: 'My Song',
            tags: 'Pop, Energetic',
            negative_tags: 'Heavy Metal',
            model: 'suno-v4.5-plus',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should fetch instrumental status', async () => {
      const mockResponse: AddInstrumentalResponse = {
        id: 'inst-123',
        status: 'completed',
        generation_stage: 'all_audios_ready',
        audios: [],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const addInstrumental = new AddInstrumental(mockHttp);
      const result = await addInstrumental.get('inst-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/add_instrumental/inst-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
