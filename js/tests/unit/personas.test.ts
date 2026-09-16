import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { Personas } from '../../src/resources/personas';
import type { PersonaCreationResponse, PersonaResourceResponse } from '../../src/types';

describe('Personas', () => {
  const mockHttp: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  const params = {
    source_task_id: 'task_123',
    source_audio_id: 'audio_456',
    name: 'Warm Baritone',
    description: 'A warm male lead vocal',
  };

  it('posts the persona request and decodes the created persona', async () => {
    const response: PersonaCreationResponse = {
      persona: { id: 'persona_123', name: 'Warm Baritone', description: 'A warm male lead vocal' },
      billing: {
        reservation: { amount_cents: 12 },
        settlement: { charged_amount_cents: 12, amount_micro_cents: 12_000_000 },
        refund: null,
      },
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(response);

    const result = await new Personas(mockHttp).run(params);

    expect(mockHttp.request).toHaveBeenCalledWith(
      'POST',
      '/api/v1/personas',
      expect.objectContaining({ body: params })
    );
    expect(result.persona.id).toBe('persona_123');
    expect(result.billing?.reservation?.amount_cents).toBe(12);
  });

  it('rejects a persona request without a name', async () => {
    await expect(new Personas(mockHttp).run({ ...params, name: '' })).rejects.toThrow('name is required');
    expect(mockHttp.request).not.toHaveBeenCalled();
  });

  it('follows an accepted task to its stored persona', async () => {
    const stored: PersonaCreationResponse = {
      persona: { id: 'persona_789', name: 'Bright Tenor', description: 'A bright tenor lead' },
      billing: { reservation: null, settlement: null, refund: null },
    };
    const request = vi.fn(
      async (
        method: string,
        _path: string,
        options?: { captureResponseHeaders?: Record<string, string>; captureResponseStatus?: { status?: number } }
      ) => {
        if (method === 'POST') {
          if (options?.captureResponseStatus) options.captureResponseStatus.status = 202;
          if (options?.captureResponseHeaders) options.captureResponseHeaders.location = '/api/v1/tasks/task_789';
          return { id: 'task_789', status: 'pending' };
        }

        return {
          id: 'task_789',
          status: 'completed',
          response: {
            status: 200,
            content_type: 'application/json',
            headers: {},
            body: JSON.stringify(stored),
          },
        };
      }
    );
    const http = { request } as unknown as HttpClient;

    const result = await new Personas(http).run(params);

    expect(request.mock.calls[0]?.[0]).toBe('POST');
    expect(request.mock.calls[0]?.[1]).toBe('/api/v1/personas');
    expect(request.mock.calls[1]?.[0]).toBe('GET');
    expect(request.mock.calls[1]?.[1]).toBe('/api/v1/tasks/task_789');
    expect(result.persona.id).toBe('persona_789');
  });

  it('fetches a persona resource envelope', async () => {
    const envelope: PersonaResourceResponse = {
      persona: { id: 'persona_123', name: 'Warm Baritone', description: 'A warm male lead vocal' },
      status: 'available',
      billing: {},
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(envelope);

    const result = await new Personas(mockHttp).get('persona_123');

    expect(mockHttp.request).toHaveBeenCalledWith('GET', '/api/v1/personas/persona_123', {});
    expect(result.status).toBe('available');
    expect(result.billing).toEqual({});
  });
});
