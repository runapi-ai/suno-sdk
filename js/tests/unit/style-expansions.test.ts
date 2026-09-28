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
    };
    vi.mocked(mockHttp.request).mockResolvedValueOnce(response);

    const result = await new StyleExpansions(mockHttp).run({ description: 'upbeat summer pop with acoustic guitar' });

    expect(mockHttp.request).toHaveBeenCalledWith('POST', '/api/v1/style_expansions', {
      body: { description: 'upbeat summer pop with acoustic guitar' },
    });
    expect(result.style).toContain('upbeat summer pop');
    expect(result).not.toHaveProperty('billing');
    expect(result).not.toHaveProperty('usage');
  });
});
