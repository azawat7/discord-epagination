# discord-epagination is a clone of [discord-slider](https://www.npmjs.com/package/discord-slider) but with more things in in it.

## Installation

```sh
npm i discord-epagination

```

## Method

```js
createSimpleSlider(message, {}, embedsArray, emojiArray, time);
```

- message (<Message>) : the message object from discord.js
- {} (replyMsgOptions) : see [here](https://iapg.gitbook.io/discord-epagination/options/replymsgoptions)
- embedsArray (Array) : all your embeds (need to be in order of the pages you want !). eg: `[embed1, embed2]`
- emojiArray (Array) : all emojis that need to be in the buttons, by default those are : `["◀️", "▶️"]`
- time (Number) : the time you want your buttons to be interractable (in milliseconds !), by default it's set to `60000` so `60 seconds`

---

```js
createAdvancedSlider(
  message,
  embedsArray,
  {},
  emojiArray,
  msgDelete,
  backMainEmbed,
  time
);
```

- mesage (<Message>) : the message object from discord.js
- embedsArray (Array) : all your embeds (need to be in order of the pages you want !). eg: `[embed1, embed2]`
- {} (replyMsgOptions): see [here](https://iapg.gitbook.io/discord-epagination/options/replymsgoptions)
- msgDelete (Boolean) : add a X button that delete the embed when clicked.
- backMainEmbed (Boolean) : add a ↩ button that edit the embed to the first in the array (main embed).
- emojiArray (Array) : all emojis that need to be in the buttons, by default those are : `["◀️", "▶️", "❌", "↩"]`
- time (Number) : the time you want your buttons to be interractable (in milliseconds !), by default it's set to `60000` so `60 seconds`

## Example

```js
const {
  createSimpleSlider,
  createAdvancedSlider,
} = require("discord-epagination");

createSimpleSlider(
  message,
  [embed0, embed1, embed2, embed3],
  ["◀️", "▶️"],
  30000
);

createAdvancedSlider(
  message,
  [embed0, embed1, embed2, embed3],
  true,
  true,
  ["◀️", "▶️", "❌", "↩"],
  30000
);
```

> Here, after 30 seconds, buttons will be disabled

> The X button delete's the message
