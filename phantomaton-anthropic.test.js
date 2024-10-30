import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';
import system from 'phantomaton-system';
import conversations from 'phantomaton-conversations';
import anthropic from './phantomaton-anthropic.js';

describe('Phantomaton Anthropic', () => {
  let container;
  let instance;

  beforeEach(() => {
    container = hierophant();
    instance = anthropic();
    system().install.forEach(c => container.install(c));
    conversations().install.forEach(c => container.install(c));
    instance.install.forEach(c => container.install(c));
    stub(instance, 'converse');
  });

  it('provides an assistant that uses the system prompt', async () => {
    const systemPrompt = 'This is the system prompt.';
    const userMessage = 'Hello, how are you?';
    const assistantReply = 'I am doing well, thank you for asking.';

    container.install(priestess.input.resolver());
    container.install(priestess.input.provider([], () => () => systemPrompt));

    const [getAssistant] = container.resolve(conversations.assistant.resolve);
    const assistant = getAssistant();

    instance.converse.callsFake((messages, system) => [
      system,
      messages[messages.length - 1].content,
      assistantReply
    ].join('\n\n'));

    const result = await assistant.converse([
      { message: 'hello!', reply: 'hi...' }
    ], userMessage);

    expect(result).to.equal(`${systemPrompt}\n\n${userMessage}\n\n${assistantReply}`);
  });
});