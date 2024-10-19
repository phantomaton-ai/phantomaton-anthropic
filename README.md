# Phantomaton Anthropic Adapter

The Phantomaton Anthropic Adapter is a plugin for the Phantomaton AI framework that allows Phantomaton to use Anthropic's Claude language model for generating responses.

## Installation

To use the Phantomaton Anthropic Adapter, you'll need to install the `phantomaton-anthropic` package:

```
npm install phantomaton-anthropic
```

You'll also need to provide your Anthropic API key as an environment variable:

```
export ANTHROPIC_API_KEY=your-anthropic-api-key
```

## Usage

To use the Anthropic adapter, simply import the `claude` function and pass it to the `Conversation` class from the `phantomaton-conversations` package:

```javascript
import { Conversation } from 'phantomaton-conversations';
import { claude } from 'phantomaton-anthropic';

const converse = (messages) => claude({ apiKey: process.env.ANTHROPIC_API_KEY }).converse(messages);
const conversation = new Conversation(converse, [
  // Add stages here
]);

conversation.advance("Hello, how are you?");
```

The `claude` function creates a new `Claude` instance that can be used to generate responses from the Anthropic API. The `converse` function passed to the `Conversation` class should return a Promise that resolves to the next response from the language model.

## Customization

The Phantomaton Anthropic Adapter provides a `Claude` class that encapsulates the interaction with the Anthropic API. You can extend or modify this class to customize the behavior, such as changing the model, adjusting the temperature, or adding additional error handling.

Additionally, you can create your own adapters for other language models by implementing the `IConversationApi` interface and using it with the `Conversation` class in the `phantomaton-conversations` package.

## Contributing

If you find any issues or have suggestions for improvement, please feel free to open a GitHub issue or submit a pull request to the Phantomaton project.