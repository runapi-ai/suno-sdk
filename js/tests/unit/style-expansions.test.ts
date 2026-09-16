import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@runapi.ai/core';
import { StyleExpansions } from '../../src/resources/style-expansions';
import type { BoostStyleResponse } from '../../src/types';

describe('StyleExpansions', () => {
  const mockHttp: HttpClient = { request: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('posts the style description and decodes the expanded tags', async () => {
    const response: BoostStyleResponse = {
      style: 'upbeat summer pop, acoustic guitar, bright vocals',
      billing: {
        reservation: { amount_cents: 4 },
        settlement: { charged_amount_cents: 4, amount_micro_cents: 4_000_000 },
        refund: null,
      },
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(response);

    const result = await new StyleExpansions(mockHttp).run({ description: 'upbeat summer pop with acoustic guitar' });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/style_expansions', {
      body: { description: 'upbeat summer pop with acoustic guitar' },
    });
    expect(result.style).toContain('upbeat summer pop');
    expect(result.billing?.reservation?.amount_cents).toBe(4);
  });
});
