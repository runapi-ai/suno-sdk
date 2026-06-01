import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConvertAudio } from '../../src/resources/convert-audio';
import { VisualizeMusic } from '../../src/resources/visualize-music';
import { GenerateLyrics } from '../../src/resources/generate-lyrics';
import { GetTimestampedLyrics } from '../../src/resources/get-timestamped-lyrics';
import { ReplaceSection } from '../../src/resources/replace-section';
import { GeneratePersona } from '../../src/resources/generate-persona';
import { BoostStyle } from '../../src/resources/boost-style';
import { VoiceToValidationPhrase } from '../../src/resources/voice-to-validation-phrase';
import { RegenerateValidationPhrase } from '../../src/resources/regenerate-validation-phrase';
import { GenerateVoice } from '../../src/resources/generate-voice';
import { CheckVoice } from '../../src/resources/check-voice';
import type { HttpClient } from '@runapi.ai/core';

describe('Remaining Resources', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ConvertAudio', () => {
    it('should create wav conversion request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'wav-123' });

      const convertAudio = new ConvertAudio(mockHttp);
      const result = await convertAudio.create({
        task_id: 'gen-task-123',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/convert_audio',
        { body: { task_id: 'gen-task-123' } }
      );
      expect(result.id).toBe('wav-123');
    });

    it('should get wav conversion status', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        id: 'wav-123',
        status: 'completed',
        wav_url: 'https://cdn.runapi.ai/public/samples/audio.wav',
      });

      const convertAudio = new ConvertAudio(mockHttp);
      const result = await convertAudio.get('wav-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/convert_audio/wav-123',
        {}
      );
      expect(result.wav_url).toBe('https://cdn.runapi.ai/public/samples/audio.wav');
    });
  });

  describe('VisualizeMusic', () => {
    it('should create music video request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'video-123' });

      const visualizeMusic = new VisualizeMusic(mockHttp);
      const result = await visualizeMusic.create({
        task_id: 'music-task-123',
        prompt: 'Serene landscape',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/visualize_music',
        {
          body: {
            task_id: 'music-task-123',
            prompt: 'Serene landscape',
          },
        }
      );
      expect(result.id).toBe('video-123');
    });

    it('should get music video status', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        id: 'video-123',
        status: 'completed',
        video_url: 'https://cdn.runapi.ai/public/samples/source.mp4',
      });

      const visualizeMusic = new VisualizeMusic(mockHttp);
      const result = await visualizeMusic.get('video-123');

      expect(result.video_url).toBe('https://cdn.runapi.ai/public/samples/source.mp4');
    });
  });

  describe('GenerateLyrics', () => {
    it('should create lyrics generation request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'lyrics-123' });

      const generateLyrics = new GenerateLyrics(mockHttp);
      const result = await generateLyrics.create({
        prompt: 'Love song about summer',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/generate_lyrics',
        {
          body: {
            prompt: 'Love song about summer',
          },
        }
      );
      expect(result.id).toBe('lyrics-123');
    });

    it('should get lyrics status', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        id: 'lyrics-123',
        status: 'completed',
        lyrics: [
          {
            title: 'Summer Nights',
            text: 'Summer nights, starry skies...',
          },
        ],
      });

      const generateLyrics = new GenerateLyrics(mockHttp);
      const result = await generateLyrics.get('lyrics-123');

      expect(Array.isArray(result.lyrics)).toBe(true);
      expect(Array.isArray(result.lyrics) && result.lyrics[0].text).toContain('Summer nights');
    });
  });

  describe('GetTimestampedLyrics', () => {
    it('should run timestamped lyrics request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        aligned_words: [
          { word: 'First', success: true, start_time: 0.0, end_time: 0.4, palign: 0 },
          { word: 'line', success: true, start_time: 0.4, end_time: 0.8, palign: 0 },
        ],
        waveform_data: [0.1, 0.2, 0.3],
      });

      const getTimestampedLyrics = new GetTimestampedLyrics(mockHttp);
      const result = await getTimestampedLyrics.run({
        task_id: 'gen-task-123',
        audio_id: 'audio-123',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/get_timestamped_lyrics',
        { body: { task_id: 'gen-task-123', audio_id: 'audio-123' } }
      );
      expect(result.aligned_words).toHaveLength(2);
    });
  });

  describe('ReplaceSection', () => {
    it('should create section replacement request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'section-123' });

      const replaceSection = new ReplaceSection(mockHttp);
      const result = await replaceSection.create({
        task_id: 'gen-task-123',
        audio_id: 'audio-456',
        lyrics: 'Guitar solo',
        tags: 'Rock',
        title: 'Epic Solo',
        infill_start_time: 30.0,
        infill_end_time: 45.0,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/replace_section',
        {
          body: {
            task_id: 'gen-task-123',
            audio_id: 'audio-456',
            lyrics: 'Guitar solo',
            tags: 'Rock',
            title: 'Epic Solo',
            infill_start_time: 30.0,
            infill_end_time: 45.0,
          },
        }
      );
      expect(result.id).toBe('section-123');
    });

    it('should get section replacement status', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        id: 'section-123',
        status: 'completed',
        track: {
          id: 'audio-789',
          audio_url: 'https://cdn.runapi.ai/public/samples/audio.mp3',
        },
      });

      const replaceSection = new ReplaceSection(mockHttp);
      const result = await replaceSection.get('section-123');

      expect(result.status).toBe('completed');
      expect(result.track).toBeDefined();
      expect(result.track?.id).toBe('audio-789');
    });
  });

  describe('GeneratePersona', () => {
    it('should run persona creation', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        persona: {
          id: 'persona-123',
          name: 'Warm Voice',
          description: 'A warm male voice',
          gender: 'm',
        },
      });

      const generatePersona = new GeneratePersona(mockHttp);
      const result = await generatePersona.run({
        task_id: 'gen-task-123',
        audio_id: 'audio-123',
        name: 'Warm Voice',
        description: 'A warm male voice',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/generate_persona',
        {
          body: {
            task_id: 'gen-task-123',
            audio_id: 'audio-123',
            name: 'Warm Voice',
            description: 'A warm male voice',
          },
        }
      );
      expect(result.persona.name).toBe('Warm Voice');
    });
  });

  describe('BoostStyle', () => {
    it('should run style generation', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        style: 'Epic Orchestral',
      });

      const boostStyle = new BoostStyle(mockHttp);
      const result = await boostStyle.run({
        name: 'Epic Orchestral',
        description: 'Epic orchestral music',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/boost_style',
        {
          body: {
            name: 'Epic Orchestral',
            description: 'Epic orchestral music',
          },
        }
      );
      expect(result.style).toBe('Epic Orchestral');
    });
  });

  describe('VoiceToValidationPhrase', () => {
    it('should create validation phrase request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'validate-123' });

      const resource = new VoiceToValidationPhrase(mockHttp);
      const result = await resource.create({
        voice_url: 'https://files.runapi.ai/suno/source-vocal.mp3',
        vocal_start_seconds: 2,
        vocal_end_seconds: 12,
        language: 'en',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/voice_to_validation_phrase',
        {
          body: {
            voice_url: 'https://files.runapi.ai/suno/source-vocal.mp3',
            vocal_start_seconds: 2,
            vocal_end_seconds: 12,
            language: 'en',
          },
        }
      );
      expect(result.id).toBe('validate-123');
    });

    it('should get validation phrase status', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        id: 'validate-123',
        status: 'completed',
        provider_status: 'wait_validating',
        validation_phrase: 'Harmonies fill the air with joyful melodies tonight',
      });

      const resource = new VoiceToValidationPhrase(mockHttp);
      const result = await resource.get('validate-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/voice_to_validation_phrase/validate-123',
        {}
      );
      expect(result.validation_phrase).toContain('Harmonies');
    });
  });

  describe('RegenerateValidationPhrase', () => {
    it('should create regeneration request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'regenerate-123' });

      const resource = new RegenerateValidationPhrase(mockHttp);
      const result = await resource.create({
        task_id: 'validate-123',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/regenerate_validation_phrase',
        {
          body: {
            task_id: 'validate-123',
          },
        }
      );
      expect(result.id).toBe('regenerate-123');
    });
  });

  describe('GenerateVoice', () => {
    it('should create custom voice request', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'voice-task-123' });

      const resource = new GenerateVoice(mockHttp);
      const result = await resource.create({
        task_id: 'validate-123',
        verify_url: 'https://files.runapi.ai/suno/verify-read.mp3',
        voice_name: 'Warm Test Voice',
        singer_skill_level: 'advanced',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/generate_voice',
        {
          body: {
            task_id: 'validate-123',
            verify_url: 'https://files.runapi.ai/suno/verify-read.mp3',
            voice_name: 'Warm Test Voice',
            singer_skill_level: 'advanced',
          },
        }
      );
      expect(result.id).toBe('voice-task-123');
    });

    it('should get custom voice status', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({
        id: 'voice-task-123',
        status: 'completed',
        provider_status: 'success',
        voice_id: 'voice_custom_123',
      });

      const resource = new GenerateVoice(mockHttp);
      const result = await resource.get('voice-task-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/suno/generate_voice/voice-task-123',
        {}
      );
      expect(result.voice_id).toBe('voice_custom_123');
    });
  });

  describe('CheckVoice', () => {
    it('should check custom voice availability', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ is_available: true });

      const resource = new CheckVoice(mockHttp);
      const result = await resource.run({
        task_id: 'voice-task-123',
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/suno/check_voice',
        {
          body: {
            task_id: 'voice-task-123',
          },
        }
      );
      expect(result.is_available).toBe(true);
    });
  });
});
