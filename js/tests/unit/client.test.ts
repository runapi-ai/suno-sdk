import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthenticationError } from '@runapi.ai/core';
import { SunoClient } from '../../src/client';

describe('SunoClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw error if apiKey is missing', () => {
    expect(() => {
      new SunoClient({ apiKey: '' });
    }).toThrow(AuthenticationError);
  });

  it('should initialize with all resources', () => {
    const client = new SunoClient({
      apiKey: 'test-key',
      baseUrl: 'https://api.test.com',
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
      baseUrl: 'https://api.example.com',
    });

    expect(client).toBeInstanceOf(SunoClient);
  });
});
