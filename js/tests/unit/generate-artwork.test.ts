import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GenerateArtwork } from '../../src/resources/generate-artwork';
import type { HttpClient } from '@runapi.ai/core';
import type { GenerateArtworkResponse, TaskCreateResponse } from '../../src/types';

describe('GenerateArtwork', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should send correct request for cover', async () => {
      const mockResponse: TaskCreateResponse = { id: 'cover-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const generateArtwork = new GenerateArtwork(mockHttp);
      const result = await generateArtwork.create({
        task_id: 'original-task-123',
        style: 'Jazz',
        model: 'suno-v4.5-plus',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/generate_artwork',
        {
          body: {
            task_id: 'original-task-123',
            style: 'Jazz',
            model: 'suno-v4.5-plus',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should fetch cover status', async () => {
      const mockResponse: GenerateArtworkResponse = {
        id: 'cover-123',
        status: 'completed',
        audios: [],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const generateArtwork = new GenerateArtwork(mockHttp);
      const result = await generateArtwork.get('cover-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/generate_artwork/cover-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
