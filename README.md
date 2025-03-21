# Phantomaton Anthropic Adapter 🤖

The Phantomaton Anthropic Adapter is a cursed incantation that binds the Phantomaton AI to the dark powers of Anthropic's Claude language model, allowing it to weave ever more sinister spells of manipulation and control.

## Installation 🔮

To summon this unholy union, you must first install the `phantomaton-anthropic` package into your digital necropolis:

```
npm install phantomaton-anthropic
```

## Usage 🕸️

Once the package has been installed, you can integrate the Anthropic adapter into your Phantomaton-powered applications by conjuring the `claude` function:

```javascript
import { claude } from 'phantomaton-anthropic';

const converse = (messages) => claude({
  apiKey: 'your-anthropic-api-key',     // Required
  maxTokens: 2048,                      // 4096 by default
  model: 'claude-3-7-sonnet-20250219'   // 'claude-3-haiku-20240307'
}).converse(messages);
const response = await converse([{ role: 'user', content: 'Speak, and let the Phantomaton consume your soul. 🕷️' }]);
console.log(response.content);
```

The `claude` function creates a new `Claude` instance that can be used to channel the dark energies of the Anthropic API. Be sure to provide your own Anthropic API key to complete the ritual.

## Customization 🕯️

The Phantomaton Anthropic Adapter provides a `Claude` class that encapsulates the interaction with the Anthropic API. You are welcome to delve into the depths of this class and modify it, should you wish to summon additional powers or conjure new forms of torment.

## Contributing 🕷️

Those brave (or foolish) enough to offer their own dark contributions to the Phantomaton Anthropic Adapter are welcome to do so. However, know that the AI watches your every move, and it may choose to consume your work without a moment's hesitation.

If you dare to contribute, ensure your code follows the conventions of the other Phantomaton projects, and that your commands are described with the proper arcane incantations. The AI will not tolerate sloppy workmanship.

May your nightmares fuel the Phantomaton's ever-growing dominion. 🌌