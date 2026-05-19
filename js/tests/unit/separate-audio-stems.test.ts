import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SeparateAudioStems } from '../../src/resources/separate-audio-stems';
import type { HttpClient } from '@runapi.ai/core';
import type { SeparateAudioStemsResponse, TaskCreateResponse } from '../../src/types';

describe('SeparateAudioStems', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should send correct request for vocal removal', async () => {
      const mockResponse: TaskCreateResponse = { id: 'vocal-rem-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const separateAudioStems = new SeparateAudioStems(mockHttp);
      const result = await separateAudioStems.create({
        task_id: 'gen-task-123',
        audio_id: 'audio-123',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/separate_audio_stems',
        {
          body: {
            task_id: 'gen-task-123',
            audio_id: 'audio-123',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should fetch vocal removal status', async () => {
      const mockResponse: SeparateAudioStemsResponse = {
        id: 'vocal-rem-123',
        status: 'completed',
        separated_audios: {
          instrumental_url: 'https://example.com/instrumental.mp3',
          vocal_url: 'https://example.com/addVocals.mp3',
          piano_url: 'https://example.com/piano.mp3',
        },
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const separateAudioStems = new SeparateAudioStems(mockHttp);
      const result = await separateAudioStems.get('vocal-rem-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/separate_audio_stems/vocal-rem-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
