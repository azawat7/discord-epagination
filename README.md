# discord-epagination is a clone of [discord-slider](https://www.npmjs.com/package/discord-slider) but with more things in in it.

# Docs are finnaly here https://im-a-panda-guy.github.io/discord-pagination/index.html :)

## Installation

```sh
npm i discord-epagination

```

## Method

```js
createSlider(options);
```

- options () : see [here](https://im-a-panda-guy.github.io/discord-pagination/interfaces/SliderOptions.html)

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
