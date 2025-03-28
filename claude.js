import fetch from 'node-fetch';

// To allow easy mocking in test
export const deps = { fetch };

export class ClaudeError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

class Claude {
  constructor({ apiKey, maxTokens, model }) {
    this.headers = {
      Accept: 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    };
    this.maxTokens = maxTokens || 4096;
    this.model = model || 'claude-3-haiku-20240307';
  }

  async converse(messages, system = '') {
    const payload = {
      model: this.model,
      max_tokens: this.maxTokens,
      messages,
      system
    };

    try {
      const fetched = await deps.fetch('https://api.anthropic.com/v1/messages', {
        body: JSON.stringify(payload),
        headers: this.headers,
        method: 'POST',
      });

      if (!fetched.ok) {
        const errorResponse = await fetched.json();
        throw new ClaudeError('Error from Anthropic API', errorResponse);
      }

      const { role, content } = await fetched.json();
      return { role, content };
    } catch (error) {
      if (error instanceof ClaudeError) {
        throw error;
      } else {
        throw new ClaudeError('Error fetching from Anthropic API', error);
      }
    }
  }
}

const claude = (options) => new Claude(options);

export default claude;