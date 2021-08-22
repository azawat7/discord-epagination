import {
  MessageButton,
  MessageActionRow,
  Message,
  ButtonInteraction,
  MessageEmbed,
} from "discord.js";
import {
  SliderOptions,
  Button,
  OtherButtons,
  ButtonNames,
  ButtonStyles,
  OtherButtonsOptions,
} from "./createSlider.interfaces";

/**
 * Options for the slider.
 * @typedef SliderOptions
 *
 * @property {Message} message Discord.js message resolvable.
 * @property {MessageEmbed[]} embeds Array of Embeds to use in the slider.
 * @property {Button[]} buttons Options for your buttons.
 * @property {number} time The time (in milliseconds) that the buttons can be interactable.
 * @property {OtherButtons} otherButtons Other buttons.
 */

/**
 * Button resolvable.
 * @typedef Button
 *
 * @property {ButtonNames} name Name of the button.
 * @property {string} emoji Emoji used on the button.
 * @property {ButtonStyles} style Style of the button.
 */

/**
 * Other buttons (delete, first, last).
 * @typedef OtherButtons
 *
 * @property {OtherButtonsOptions} deleteButton Indicates if the delete button should be in the slider.
 * @property {OtherButtonsOptions} firstButton Indicates if the first page button should be in the slider.
 * @property {OtherButtonsOptions} lastButton Indicates if the last page button should be in the slider.
 */

/**
 * Options for the other buttons (delete, first, last).
 * @typedef OtherButtonsOptions
 *
 * @property {boolean} enabled Whether the button should be enabled or not.
 * @property {number} position Position of the button in the row. You need to set a positive index, the default buttons (back, foward) are in the array and you can't change their positio. Don't forget that the buttons are receiveing position in this order : first -> last -> delete, so make sure to set a correct index if you want to do something very specific.
 */

/**
 * Valid button names.
 * * `back`
 * * `foward`
 * * `first`
 * * `last`
 * * `delete`
 * @typedef {string} ButtonNames
 */

/**
 * Valid button names.
 * * `PRIMARY`
 * * `SECONDARY`
 * * `SUCCESS`
 * * `DANGER`
 * @typedef {string} ButtonStyles
 */

/**
 * Create a slider.
 * @param {SliderOptions} options Slide
 * @returns {Promise<void>} void
 */
export const createSlider = async (options: SliderOptions) => {
  if (typeof options !== "object" || !options)
    throw new TypeError("discord-epagination: options must be a object");

  const { message, embeds, buttons, time, otherButtons } = options; // prettier-ignore

  let currentPage = 1;

  /////////////////////////
  /////////////////////////

  const getButtonData = (name: ButtonNames) => {
    return buttons?.find((btn) => btn.name === name);
  };

  const createButtons = (state?: boolean) => {
    let names: ButtonNames[] = ["back", "foward"];
    if (otherButtons.firstButton.enabled) {
      if (otherButtons.firstButton.position >= 0) {
        names.splice(otherButtons.firstButton.position, 0, "first");
      } else {
        names.push("first");
      }
    }
    if (otherButtons.lastButton.enabled) {
      if (otherButtons.lastButton.position >= 0) {
        names.splice(otherButtons.lastButton.position, 0, "last");
      } else {
        names.push("last");
      }
    }
    if (otherButtons.deleteButton.enabled) {
      if (otherButtons.deleteButton.position >= 0) {
        names.splice(otherButtons.deleteButton.position, 0, "delete");
      } else {
        names.push("delete");
      }
    }

    return names.reduce((row: MessageButton[], name: ButtonNames) => {
      row.push(
        new MessageButton()
          .setEmoji(getButtonData(name).emoji)
          .setCustomId(`paginator-${name}`)
          .setDisabled(state)
          .setStyle(getButtonData(name).style || "SECONDARY")
      );
      return row;
    }, []);
  };

  const msgButtons = (state?: boolean) => [
    new MessageActionRow().addComponents(createButtons(state || false)),
  ];

  const sliderMessage = await message.channel.send({
    embeds: [embeds[currentPage - 1]],
    components: msgButtons(),
  });

  /////////////////////////
  /////////////////////////

  const filter = (interaction: ButtonInteraction) => {
    return interaction.user.id === message.author.id;
  };

  const collectorOptions = () => {
    const options = {
      filter,
    };
    if (time) options["time"] = time;
    return options;
  };

  const collector = sliderMessage.createMessageComponentCollector(
    collectorOptions()
  );

  /////////////////////////

  collector.on("collect", async (interaction) => {
    const tag = interaction.customId.split("-");
    const id = tag[1] as ButtonNames;

    if (id === "back") {
      if (currentPage === 1) {
        currentPage = embeds.length;
        editEmbed(interaction, currentPage - 1);
        return;
      }
      currentPage--;
    }
    if (id === "foward") {
      if (currentPage === embeds.length) {
        currentPage = 1;
        editEmbed(interaction, currentPage - 1);
        return;
      }
      currentPage++;
    }
    if (id === "first") {
      currentPage = 1;
    }
    if (id === "last") {
      currentPage = embeds.length;
    }
    if (id === "delete") {
      sliderMessage.delete();
      return;
    }

    editEmbed(interaction, currentPage - 1);
  });

  collector.on("end", () => {
    if (!sliderMessage.deleted) {
      sliderMessage
        .edit({
          components: msgButtons(true),
        })
        .catch(() => {});
    }
  });

  async function editEmbed(
    interaction: ButtonInteraction,
    index: number,
    state?: boolean
  ) {
    interaction
      .update({
        embeds: [embeds[index]],
        components: msgButtons(state || false),
      })
      .catch(() => {});
  }
};
