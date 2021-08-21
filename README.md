# discord-epagination

A package to paginate embeds. Compatible with discord.js v13+. Note, it's a package that was make to fix the discord-slider package.

<p align="center">
  <a href="https://www.npmjs.com/package/discord-epagination"><img src="https://nodei.co/npm/discord-epagination.png?downloadRank=true&downloads=true&downloadRank=true&stars=true" /></a><br>
</p>

## Installation

To install the latest version :

```sh
npm i discord-epagination
```

To install a specific version :

```sh
npm i discord-epagination@version
```

## Function

```js
createSlider(options);
```

- options ([SliderOptions](https://discord-epagination.js.org/global.html#SliderOptions))

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
  // Other buttons
  otherButtons: {
    // First page button
    firstButton: {
      enabled: true,
      // Make the button behind the back and foward buttons. [..., "previous", "next"]
      position: 0,
    },
    // Last page button
    lastButton: {
      enabled: true,
      // Make the button in front of the back and foward buttons. ["first", "previous", "next", ...]
      position: 3,
    },
    // Delete button
    deleteButton: {
      enabled: true,
      // Make the button in the middle of all the buttons. ["first", "previous", ... , "next", "last"]
      position: 2,
    },
  },
  // Button customization
  buttons: [
    // Customization for the back button
    { name: "back", emoji: "◀", style: "PRIMARY" },
    // Customization for the foward button
    { name: "foward", emoji: "▶", style: "PRIMARY" },
    // Customization for the first page button
    { name: "first", emoji: "⏪", style: "PRIMARY" },
    // Customization for the last page button
    { name: "last", emoji: "⏩", style: "PRIMARY" },
    // Customization for the delete button
    { name: "delete", emoji: "❌", style: "DANGER" },
  ],
  // Duration wich will define how much time the buttons will be interactable.
  time: 60000,
});
```
