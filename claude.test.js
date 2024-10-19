import { expect, stub } from 'lovecraft';
import claude, { deps, ClaudeError } from './claude.js';
import fetch from 'node-fetch';

describe('Claude', () => {
  let instance;

  beforeEach(() => {
    stub(deps, 'fetch');
    instance = claude({ apiKey: 'test-api-key' });
  });

  afterEach(() => {
    deps.fetch.restore();
  });

  describe('converse', () => {
    it('should return a response from the Anthropic API', async () => {
      const mockResponse = { role: 'assistant', content: 'This is a test response.' };
      deps.fetch.resolves({ ok: true, json: async () => mockResponse });

      const response = await instance.converse([{ role: 'user', content: 'Hello' }]);
      expect(response).to.deep.equal(mockResponse);
    });

    it('should pass the provided API key in headers', async () => {
      const mockResponse = { role: 'assistant', content: 'This is a test response.' };
      deps.fetch.resolves({ ok: true, json: async () => mockResponse });

      await instance.converse([{ role: 'user', content: 'Hello' }]);
      expect(deps.fetch.lastCall.args[1].headers['x-api-key']).to.equal('test-api-key');
    });

    it('should throw a ClaudeError on error response', async () => {
      const mockResponse = { error: 'Something went wrong' };
      deps.fetch.resolves({ ok: false, json: async () => mockResponse });

      try {
        await instance.converse([{ role: 'user', content: 'Hello' }]);
        expect.fail();
      } catch (error) {
        expect(error).to.be.instanceOf(ClaudeError);
        expect(error.message).to.equal('Error from Anthropic API');
      }
    });

    it('should throw a ClaudeError on fetch error', async () => {
      deps.fetch.rejects(new Error('Network error'));
      
      try {
        await instance.converse([{ role: 'user', content: 'Hello' }]);
        expect.fail();
      } catch (error) {
        expect(error).to.be.instanceOf(ClaudeError);
        expect(error.message).to.equal('Error fetching from Anthropic API');
      }
    });
  });
});