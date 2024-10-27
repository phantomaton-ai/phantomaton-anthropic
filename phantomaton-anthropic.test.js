import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';
import system from 'phantomaton-system';
import conversations from 'phantomaton-conversations';
import anthropic from './phantomaton-anthropic.js';

describe('Phantomaton Anthropic', () => {
  let container;

  beforeEach(() => {
    container = hierophant();
    system().install.forEach(c => container.install(c));
    conversations().install.forEach(c => container.install(c));
    container.install(anthropic().install);
  });

  it('provides an assistant that uses the system prompt', async () => {
    const systemPrompt = 'This is the system prompt.';
    const userMessage = 'Hello, how are you?';
    const assistantReply = 'I am doing well, thank you for asking.';

    container.install(priestess.input.resolver());
    container.install(priestess.input.provider([], () => userMessage));

    container.install(system.system.provider([], () => systemPrompt));

    const [getAssistant] = container.resolve(conversations.assistant.resolve);
    const assistant = getAssistant();
    const result = await assistant.converse([{ message: userMessage, reply: assistantReply }]);

    expect(result).to.equal(`${systemPrompt}\n\n${userMessage}\n\n${assistantReply}`);
  });
});