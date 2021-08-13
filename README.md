# discord-epagination is a clone of [discord-slider](https://www.npmjs.com/package/discord-slider) but with more things in in it.

## Installation

```sh
npm i discord-epagination
```

## Method

```js
createSlider(options);
```

- options ([SliderOptions](https://im-a-panda-guy.github.io/discord-pagination/interfaces/SliderOptions.html))

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
