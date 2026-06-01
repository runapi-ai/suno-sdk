import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TextToMusic } from '../../src/resources/text-to-music';
import type { HttpClient } from '@runapi.ai/core';
import type { TextToMusicResponse, TaskCreateResponse } from '../../src/types';

describe('TextToMusic', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should send correct request for simple mode', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToMusic = new TextToMusic(mockHttp);
      const result = await textToMusic.create({
        vocal_mode: 'auto_lyrics',
        prompt: 'A chill lo-fi beat',
        model: 'suno-v4.5-plus',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/text_to_music',
        {
          body: {
            vocal_mode: 'auto_lyrics',
            prompt: 'A chill lo-fi beat',
            model: 'suno-v4.5-plus',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should send correct request with exact lyrics', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-456' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToMusic = new TextToMusic(mockHttp);
      const result = await textToMusic.create({
        vocal_mode: 'exact_lyrics',
        lyrics: '[Verse] Soft piano melodies',
        style: 'Classical',
        title: 'Peaceful Piano',
        model: 'suno-v4',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/text_to_music',
        {
          body: {
            vocal_mode: 'exact_lyrics',
            lyrics: '[Verse] Soft piano melodies',
            style: 'Classical',
            title: 'Peaceful Piano',
            model: 'suno-v4',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should include optional parameters', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-789' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToMusic = new TextToMusic(mockHttp);
      await textToMusic.create({
        vocal_mode: 'exact_lyrics',
        lyrics: '[Verse] Upbeat rhythm',
        style: 'Pop',
        title: 'Upbeat Rhythm',
        model: 'suno-v5',
        callback_url: 'https://example.com/webhook',
        vocal_gender: 'male',
        persona_id: 'persona_123',
        persona_type: 'style',
        style_weight: 0.65,
        weirdness_constraint: 0.72,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/text_to_music',
        {
          body: {
            vocal_mode: 'exact_lyrics',
            lyrics: '[Verse] Upbeat rhythm',
            style: 'Pop',
            title: 'Upbeat Rhythm',
            model: 'suno-v5',
            callback_url: 'https://example.com/webhook',
            vocal_gender: 'male',
            persona_id: 'persona_123',
            persona_type: 'style',
            style_weight: 0.65,
            weirdness_constraint: 0.72,
          },
        }
      );
    });

  });

  describe('get', () => {
    it('should fetch task status by ID', async () => {
      const mockResponse: TextToMusicResponse = {
        id: 'task-123',
        status: 'processing',
        generation_stage: 'text_generated',
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToMusic = new TextToMusic(mockHttp);
      const result = await textToMusic.get('task-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/text_to_music/task-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should return completed status with audios', async () => {
      const mockResponse: TextToMusicResponse = {
        id: 'task-123',
        status: 'completed',
        generation_stage: 'all_audios_ready',
        audios: [
          {
            id: 'audio-1',
            audio_url: 'https://cdn.runapi.ai/public/samples/audio.mp3',
            stream_audio_url: 'https://example.com/stream',
            image_url: 'https://cdn.runapi.ai/public/samples/cover.jpg',
            lyrics: '[Verse] Generated lyrics...',
            model_name: 'chirp-v4-5-plus',
            title: 'Song Title',
            tags: ['chill', 'lo-fi'],
            duration: 198.44,
          },
        ],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToMusic = new TextToMusic(mockHttp);
      const result = await textToMusic.get('task-123');

      expect(result.status).toBe('completed');
      expect(result.audios).toHaveLength(1);
      expect(result.audios?.[0].audio_url).toBe('https://cdn.runapi.ai/public/samples/audio.mp3');
    });

    it('should return failed status with error', async () => {
      const mockResponse: TextToMusicResponse = {
        id: 'task-123',
        status: 'failed',
        generation_stage: 'failed',
        error: 'Content policy violation',
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToMusic = new TextToMusic(mockHttp);
      const result = await textToMusic.get('task-123');

      expect(result.status).toBe('failed');
      expect(result.error).toBe('Content policy violation');
    });
  });

  describe('run', () => {
    it('should create and poll until completion', async () => {
      const createResponse: TaskCreateResponse = { id: 'task-123' };
      const processingResponse: TextToMusicResponse = {
        id: 'task-123',
        status: 'processing',
        generation_stage: 'text_generated',
      };
      const completedResponse: TextToMusicResponse = {
        id: 'task-123',
        status: 'completed',
        generation_stage: 'all_audios_ready',
        audios: [
          {
            id: 'audio-1',
            audio_url: 'https://cdn.runapi.ai/public/samples/audio.mp3',
            stream_audio_url: 'https://example.com/stream',
            image_url: 'https://cdn.runapi.ai/public/samples/cover.jpg',
            lyrics: '[Verse] Test lyrics',
            model_name: 'chirp-v5',
            title: 'Test Song',
            tags: ['test'],
            duration: 180.0,
          },
        ],
      };

      vi.mocked(mockHttp.request)
        .mockResolvedValueOnce(createResponse)
        .mockResolvedValueOnce(processingResponse)
        .mockResolvedValueOnce(completedResponse);

      const textToMusic = new TextToMusic(mockHttp);
      const result = await textToMusic.run({
        vocal_mode: 'auto_lyrics',
        prompt: 'Test music',
        model: 'suno-v5',
      });

      expect(result.status).toBe('completed');
      expect(result.audios).toHaveLength(1);
    });
  });
});
