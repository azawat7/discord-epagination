# discord-epagination is a clone of [discord-slider](https://www.npmjs.com/package/discord-slider) but with more things in in it.

## Installation

```sh
npm i discord-epagination

```

## Method

```js
createSlider(message, options);
```

- message (<Discord.Message>) : the message object from discord.js
- options () : see [here](https://iapg.gitbook.io/discord-epagination/options/replymsgoptions)

## Example

```js
const { createSlider } = require("discord-epagination");

createSlider({
  message,
  embeds: [embed1, embed2],
  replyMessages: {
    back: "back",
    foward: "foward",
    backMain: "backmain",
  },
  otherButtons: {
    backMainButton: true,
    deleteButton: true,
  },
  buttons: [
    { name: "back", emoji: "◀" },
    { name: "foward", emoji: "▶" },
    { name: "delete", emoji: "❌" },
    { name: "backMain", emoji: "↩" },
  ],
});
```
