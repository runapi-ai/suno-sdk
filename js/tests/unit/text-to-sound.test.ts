import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TextToSound } from '../../src/resources/text-to-sound';
import type { HttpClient } from '@runapi.ai/core';
import type { TextToSoundResponse, TaskCreateResponse } from '../../src/types';

describe('TextToSound', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should send correct request for sound generation', async () => {
      const mockResponse: TaskCreateResponse = { id: 'sound-123', status: 'processing' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToSound = new TextToSound(mockHttp);
      const result = await textToSound.create({
        prompt: 'Rain on a tin roof',
        model: 'suno-v5',
        sound_loop: true,
        sound_tempo: 90,
        sound_key: 'Cm',
        grab_lyrics: false,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/text_to_sound',
        {
          body: {
            prompt: 'Rain on a tin roof',
            model: 'suno-v5',
            sound_loop: true,
            sound_tempo: 90,
            sound_key: 'Cm',
            grab_lyrics: false,
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should support suno-v5.5 model', async () => {
      const mockResponse: TaskCreateResponse = { id: 'sound-456', status: 'processing' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToSound = new TextToSound(mockHttp);
      await textToSound.create({
        prompt: 'Ambient pad',
        model: 'suno-v5.5',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/text_to_sound',
        {
          body: {
            prompt: 'Ambient pad',
            model: 'suno-v5.5',
          },
        }
      );
    });
  });

  describe('get', () => {
    it('should fetch sound task status', async () => {
      const mockResponse: TextToSoundResponse = {
        id: 'sound-123',
        status: 'completed',
        generation_stage: 'all_audios_ready',
        audios: [],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToSound = new TextToSound(mockHttp);
      const result = await textToSound.get('sound-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/text_to_sound/sound-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
