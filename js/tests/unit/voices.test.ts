import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { Voices } from '../../src/resources/voices';
import type { VoiceCreationResponse, VoiceResourceResponse } from '../../src/types';

describe('Voices', () => {
  const mockHttp: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('posts the voice request and decodes the created voice', async () => {
    const response: VoiceCreationResponse = {
      voice: { id: 'voice_123', name: 'Deep Narrator' },
      billing: {
        reservation: { amount_cents: 25 },
        settlement: { charged_amount_cents: 25, amount_micro_cents: 25_000_000 },
        refund: null,
      },
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(response);

    const result = await new Voices(mockHttp).run({
      source_audio_url: 'https://cdn.runapi.ai/public/samples/voice-take.mp3',
      name: 'Deep Narrator',
    });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/voices', {
      body: {
        source_audio_url: 'https://cdn.runapi.ai/public/samples/voice-take.mp3',
        name: 'Deep Narrator',
      },
    });
    expect(result.voice.id).toBe('voice_123');
    expect(result.billing?.settlement?.charged_amount_cents).toBe(25);
  });

  it('omits an absent voice name from the request body', async () => {
    vi.mocked(mockHttp.request).mockResolvedValueOnce({ voice: { id: 'voice_456' } });

    await new Voices(mockHttp).run({ source_audio_url: 'https://cdn.runapi.ai/public/samples/voice-take.mp3' });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/voices', {
      body: { source_audio_url: 'https://cdn.runapi.ai/public/samples/voice-take.mp3' },
    });
  });

  it('fetches a voice resource envelope', async () => {
    const envelope: VoiceResourceResponse = {
      voice: { id: 'voice_123', name: 'Deep Narrator' },
      status: 'failed',
      billing: {},
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(envelope);

    const result = await new Voices(mockHttp).get('voice_123');

    expect(mockHttp.request).toHaveBeenCalledWith('GET', '/api/v1/voices/voice_123', {});
    expect(result.status).toBe('failed');
    expect(result.billing).toEqual({});
  });
});
