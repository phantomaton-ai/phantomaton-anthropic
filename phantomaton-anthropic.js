import conversations from 'phantomaton-conversations';
import system from 'phantomaton-system';
import claude from './claude.js';

class Assistant {
  constructor(instance, system) {
    this.instance = instance;
    this.system = system;
  }

  async converse(turns, message) {
    const messages = [...turns.map(({ message, reply }) => [
      { role: 'user', content: message },
      { role: 'assistant', content: reply }
    ]).flat(), { role: 'user', content: message } ];
    const system = this.system();
    const { content } = await this.instance.converse(messages, system);
    return content.filter(
      ({ type }) => type === 'text'
    ).map(
      ({ text }) => text
    ).join('\n');
  }
}

const anthropic = (options = {}) => {
  const instance = claude(options);
  instance.install = [
    conversations.assistant.provider(
      [system.system.resolve],
      ([system]) => new Assistant(instance, system)
    )
  ];
  return instance;
};

export default anthropic;
