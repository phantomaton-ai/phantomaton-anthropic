import conversations from 'phantomaton-conversations';
import system from 'phantomaton-system';
import claude from './claude.js';

class Assistant {
  constructor(instance, system) {
    this.instance = instance;
    this.system = system;
  }

  async converse(turns) {
    const messages = turns.map(({ message, reply }) => [
      { role: 'user', content: message },
      { role: 'assistant', content: reply }
    ]);
    const system = this.system();
    return this.instance.converse(messages, system);
  }
}

const anthropic = (options) => {
  const instance = claude(options);
  instance.install = [
    conversations.assistant.provider(
      [system.system.resolve]
      (system) => new Assistant(instance, system)
    )
  ];
  return instance;
];

export default anthropic;
