import { expect, stub } from 'lovecraft';
import { claude, ClaudeError } from './claude.js';
import fetch from 'node-fetch';

describe('Claude', () => {
  let claude_instance;

  beforeEach(() => {
    claude_instance = claude({ apiKey: 'test-api-key' });
  });

  describe('converse', () => {
    it('should return a response from the Anthropic API', async () => {
      const mockResponse = { role: 'assistant', content: 'This is a test response.' };
      stub(fetch, 'fetch').resolves({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await claude_instance.converse([{ role: 'user', content: 'Hello' }]);
      expect(response).to.deep.equal(mockResponse);

      fetch.fetch.restore();
    });

    it('should throw a ClaudeError on error response', async () => {
      const mockErrorResponse = { error: 'Something went wrong' };
      stub(fetch, 'fetch').resolves({
        ok: false,
        json: async () => mockErrorResponse,
      });

      await expect(claude_instance.converse([{ role: 'user', content: 'Hello' }])).to.be.rejectedWith(
        ClaudeError,
        'Error from Anthropic API'
      );

      fetch.fetch.restore();
    });

    it('should throw a ClaudeError on fetch error', async () => {
      const mockError = new Error('Network error');
      stub(fetch, 'fetch').rejects(mockError);

      await expect(claude_instance.converse([{ role: 'user', content: 'Hello' }])).to.be.rejectedWith(
        ClaudeError,
        'Error fetching from Anthropic API'
      );

      fetch.fetch.restore();
    });
  });
});