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

    it('should send advanced stem separation parameters', async () => {
      const mockResponse: TaskCreateResponse = { id: 'advanced-stem-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const separateAudioStems = new SeparateAudioStems(mockHttp);
      await separateAudioStems.create({
        task_id: 'gen-task-123',
        audio_id: 'audio-123',
        type: 'split_stem_advanced',
        stem_name: 'Bass',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/separate_audio_stems',
        {
          body: {
            task_id: 'gen-task-123',
            audio_id: 'audio-123',
            type: 'split_stem_advanced',
            stem_name: 'Bass',
          },
        }
      );
    });

    it('should require stem_name for advanced separation', async () => {
      const separateAudioStems = new SeparateAudioStems(mockHttp);

      await expect(separateAudioStems.create({
        task_id: 'gen-task-123',
        audio_id: 'audio-123',
        type: 'split_stem_advanced',
      })).rejects.toThrow('stem_name is required when type is split_stem_advanced');

      expect(mockHttp.request).not.toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should fetch vocal removal status', async () => {
      const mockResponse: SeparateAudioStemsResponse = {
        id: 'vocal-rem-123',
        status: 'completed',
        separated_audios: {
          instrumental_url: 'https://cdn.runapi.ai/public/samples/instrumental.mp3',
          vocal_url: 'https://cdn.runapi.ai/public/samples/vocals.mp3',
          piano_url: 'https://cdn.runapi.ai/public/samples/piano.mp3',
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

    it('should decode advanced extracted and remaining audio pairs', async () => {
      const mockResponse: SeparateAudioStemsResponse = {
        id: 'advanced-stem-123',
        status: 'completed',
        separated_audios: {
          pairs: [{
            stem_name: 'Bass',
            extracted_audio: {
              id: 'audio-bass',
              duration_seconds: 116.28,
              audio_url: 'https://file.runapi.ai/bass.mp3',
            },
            remaining_audio: {
              id: 'audio-without-bass',
              duration_seconds: 116.28,
              audio_url: 'https://file.runapi.ai/without-bass.mp3',
            },
          }],
        },
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const result = await new SeparateAudioStems(mockHttp).get('advanced-stem-123');
      const pair = result.separated_audios?.pairs?.[0];

      expect(pair?.stem_name).toBe('Bass');
      expect(pair?.extracted_audio.id).toBe('audio-bass');
      expect(pair?.remaining_audio.audio_url).toBe('https://file.runapi.ai/without-bass.mp3');
    });
  });
});
