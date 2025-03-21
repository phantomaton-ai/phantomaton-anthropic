import { expect, stub } from 'lovecraft';
import claude, { deps, ClaudeError } from './claude.js';

describe('Claude', () => {
  let instance;

  beforeEach(() => {
    stub(deps, 'fetch');
    instance = claude({ apiKey: 'test-api-key' });
  });

  afterEach(() => {
    deps.fetch.restore();
  });

  describe('options', () => {
    it('get passed down to the API', () => {
      const options = { apiKey: 'test-api-key', model: 'foo', maxTokens: 123 };
      claude(options).converse([{ role: 'user', content: 'Hello' }]);
      expect(deps.fetch.calledOnce).to.equal(true);
      const body = JSON.parse(deps.fetch.lastCall.args[1].body);
      expect(body.model).to.equal(options.model);
      expect(body.max_tokens).to.equal(options.maxTokens);
    });

    it('provide defaults', () => {
      const options = { apiKey: 'test-api-key'};
      claude(options).converse([{ role: 'user', content: 'Hello' }]);
      expect(deps.fetch.calledOnce).to.equal(true);
      const body = JSON.parse(deps.fetch.lastCall.args[1].body);
      expect(body.model).to.be.a('string').not.empty;
      expect(body.max_tokens).to.be.a('number').greaterThan(0);
    });
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