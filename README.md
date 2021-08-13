# discord-epagination

A package to paginate embeds. Compatible with discord.js v13+. Note, it's a package that was make to fix the discord-slider package.

## Installation

```sh
npm i discord-epagination
```

## Function

```js
createSlider(options);
```

- options ([SliderOptions](https://im-a-panda-guy.github.io/discord-pagination/interfaces/SliderOptions.html))

## Example

```js
// Import the function from the package
const { createSlider } = require("discord-epagination");
// Import MessageEmbed from discord.js
const { MessageEmbed } = require("discord.js");

// Creates very basic embeds
const embeds = [];
for (let i = 0; i < 10; i++) {
  const embed = new MessageEmbed().setDescription(`Page ${i + 1}`);
  embeds.push(embed);
}

// Call the function
createSlider({
  // Message object from discord.js
  message: message,
  // Array of embeds that will be paginated
  embeds: embeds,
  // Reply messages that will be sent (ephemeral) when a button is clicked
  replyMessages: {
    // Back button reply
    back: "back",
    // Foward button reply
    foward: "foward",
    // First page button reply
    backMain: "backmain",
  },
  // Other buttons
  otherButtons: {
    // First page button
    backMainButton: {
      enabled: true,
      // Make the button behind the back and foward buttons.
      position: -1,
    },
    // Delete button
    deleteButton: {
      enabled: true,
      // Make the button in front of the back and foward buttons.
      position: 1,
    },
  },
  // Button customization
  buttons: [
    // Customization for the back button
    { name: "back", emoji: "◀", style: "PRIMARY" },
    // Customization for the foward button
    { name: "foward", emoji: "▶", style: "PRIMARY" },
    // Customization for the first page button
    { name: "backMain", emoji: "↩", style: "PRIMARY" },
    // Customization for the delete button
    { name: "delete", emoji: "❌", style: "DANGER" },
  ],
});
```
