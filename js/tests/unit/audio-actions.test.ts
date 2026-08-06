import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { ValidationError } from '@runapi.ai/core';
import { AddSamples } from '../../src/resources/add-samples';
import { RemasterAudio } from '../../src/resources/remaster-audio';
import { StitchAudio } from '../../src/resources/stitch-audio';

describe('audio actions', () => {
  const http: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('posts the public request shapes', async () => {
    vi.mocked(http.request).mockResolvedValue({ id: 'task' });
    const owned = { model: 'suno-v5', source_task_id: 'source', audio_id: 'audio' };
    const samples = {
      model: 'suno-v5', audio_url: 'https://file.runapi.ai/source.mp3',
      start_seconds: 5, end_seconds: 20,
    };

    await new StitchAudio(http).create(owned);
    await new RemasterAudio(http).create(owned);
    await new AddSamples(http).create(samples);

    expect(http.request).toHaveBeenNthCalledWith(1, 'POST', '/api/v1/suno/stitch_audio', { body: owned });
    expect(http.request).toHaveBeenNthCalledWith(2, 'POST', '/api/v1/suno/remaster_audio', { body: owned });
    expect(http.request).toHaveBeenNthCalledWith(3, 'POST', '/api/v1/suno/add_samples', { body: samples });
  });

  it('rejects an invalid samples window before the request', async () => {
    await expect(new AddSamples(http).create({
      model: 'suno-v5', audio_url: 'https://file.runapi.ai/source.mp3',
      start_seconds: 20, end_seconds: 20,
    })).rejects.toThrow(new ValidationError('end_seconds must be greater than start_seconds'));
    expect(http.request).not.toHaveBeenCalled();
  });
});
