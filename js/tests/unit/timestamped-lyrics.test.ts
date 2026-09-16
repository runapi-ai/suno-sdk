import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { TimestampedLyrics } from '../../src/resources/timestamped-lyrics';
import type { GetTimestampedLyricsResponse } from '../../src/types';

describe('TimestampedLyrics', () => {
  const mockHttp: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('posts the audio resource and decodes the alignment', async () => {
    const response: GetTimestampedLyricsResponse = {
      aligned_words: [
        { word: 'First', success: true, start_time: 0.0, end_time: 0.4, palign: 0 },
        { word: 'line', success: true, start_time: 0.4, end_time: 0.8, palign: 0 },
      ],
      waveform_data: [0.1, 0.2, 0.3],
      is_streamed: false,
      billing: {
        reservation: { amount_cents: 5 },
        settlement: { charged_amount_cents: 5, amount_micro_cents: 5_000_000 },
        refund: null,
      },
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(response);

    const result = await new TimestampedLyrics(mockHttp).run({ source_audio_id: 'audio_456' });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/timestamped_lyrics', {
      body: { source_audio_id: 'audio_456' },
    });
    expect(result.aligned_words).toHaveLength(2);
    expect(result.billing?.reservation?.amount_cents).toBe(5);
  });

  it('sends the source task alongside the audio resource when supplied', async () => {
    vi.mocked(mockHttp.request).mockResolvedValueOnce({});

    await new TimestampedLyrics(mockHttp).run({ source_audio_id: 'audio_456', source_task_id: 'task_123' });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/timestamped_lyrics', {
      body: { source_audio_id: 'audio_456', source_task_id: 'task_123' },
    });
  });
});
