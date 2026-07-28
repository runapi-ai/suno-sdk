import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SunoClient } from '../../src/client';

describe('SunoClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with all resources', () => {
    const client = new SunoClient({
      apiKey: 'test-key',
      baseUrl: 'https://runapi.ai',
    });

    expect(client.textToMusic).toBeDefined();
    expect(client.extendMusic).toBeDefined();
    expect(client.generateArtwork).toBeDefined();
    expect(client.addInstrumental).toBeDefined();
    expect(client.separateAudioStems).toBeDefined();
    expect(client.convertAudio).toBeDefined();
    expect(client.visualizeMusic).toBeDefined();
    expect(client.generateLyrics).toBeDefined();
    expect(client.getTimestampedLyrics).toBeDefined();
    expect(client.replaceSection).toBeDefined();
    expect(client.generatePersona).toBeDefined();
    expect(client.boostStyle).toBeDefined();
  });

  it('should accept valid client options', () => {
    const client = new SunoClient({
      apiKey: 'sk-test-123',
      baseUrl: 'https://runapi.ai',
    });

    expect(client).toBeInstanceOf(SunoClient);
  });
});
