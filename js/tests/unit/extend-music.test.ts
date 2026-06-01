import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExtendMusic } from '../../src/resources/extend-music';
import type { HttpClient } from '@runapi.ai/core';
import type { ExtendMusicResponse, TaskCreateResponse } from '../../src/types';

describe('ExtendMusic', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should send correct request for extension', async () => {
      const mockResponse: TaskCreateResponse = { id: 'ext-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const extendMusic = new ExtendMusic(mockHttp);
      const result = await extendMusic.create({
        task_id: 'original-task-123',
        parameter_mode: 'custom',
        model: 'suno-v5',
        prompt: 'Continue with uplifting chorus',
        style: 'Pop',
        title: 'Uplifting Chorus',
        continue_at: 30,
        persona_id: 'persona_123',
        persona_type: 'style',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/extend_music',
        {
          body: {
            task_id: 'original-task-123',
            parameter_mode: 'custom',
            model: 'suno-v5',
            prompt: 'Continue with uplifting chorus',
            style: 'Pop',
            title: 'Uplifting Chorus',
            continue_at: 30,
            persona_id: 'persona_123',
            persona_type: 'style',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

  });

  describe('get', () => {
    it('should fetch extension status', async () => {
      const mockResponse: ExtendMusicResponse = {
        id: 'ext-123',
        status: 'completed',
        original_task_id: 'original-task-123',
        audios: [],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const extendMusic = new ExtendMusic(mockHttp);
      const result = await extendMusic.get('ext-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/extend_music/ext-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
