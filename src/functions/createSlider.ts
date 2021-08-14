import {
  MessageButton,
  MessageActionRow,
  Message,
  ButtonInteraction,
  MessageEmbed,
} from "discord.js";
import { isGetAccessor } from "typescript";
import {
  SliderOptions,
  Buttons,
  ReplyMessages,
  OtherButtons,
  ButtonNames,
  ButtonStyles,
  OtherButtonsOptions,
} from "./createSlider.interfaces";

/**
 * @typedef SliderOptions
 *
 * @property {Message} message Discord.js message resolvable.
 * @property {MessageEmbed[]} embeds Array of Embeds to use in the slider.
 * @property {ReplyMessages} replyMessages  Messages that will be sent (in ephemeral mode) when a button is clicked.
 * @property {Buttons[]} buttons Options for your buttons.
 * @property {number} time The time (in milliseconds) that the buttons can be interactable.
 * @property {OtherButtons} otherButtons Other buttons.
 */

/**
 * @typedef Buttons
 *
 * @property {ButtonNames} name Name of the button.
 * @property {string} emoji Emoji used on the button.
 * @property {ButtonStyles} style Style of the button.
 */

/**
 * @typedef ReplyMessages
 *
 * @property {string} back Reply sent when the back button is clicked.
 * @property {string} foward Reply sent when the foward button is clicked.
 * @property {string} backMain Reply sent when the back to first page button is clicked.
 */

/**
 * @typedef OtherButtons
 *
 * @property {OtherButtonsOptions} deleteButton Indicates if the delete button should be in the slider.
 * @property {OtherButtonsOptions} backMainButton Indicates if the back to first page button should be in the slider.
 */

/**
 * @typedef OtherButtonsOptions
 *
 * @property {boolean} enabled Whether the button should be enabled or not.
 * @property {number} position Position of the button in the row. You need to set a positive index, the default buttons (back, foward) are in the array and you can't change their position and the back to first page button is the first button that will receive the position and the delete button after. So make sure to set a correct index if you want to do something very specific.
 */

/**
 * Create a slider.
 * @param {SliderOptions} options Slide
 * @returns {Promise<void>} void
 */
export const createSlider = async (options: SliderOptions) => {
  if (typeof options !== "object" || !options)
    throw new TypeError("discord-epagination: options must be a object");

  const { message, embeds, replyMessages, buttons, time, otherButtons } = options; // prettier-ignore

  let currentPage = 1;

  /////////////////////////
  /////////////////////////

  const getButtonData = (name: ButtonNames) => {
    return buttons?.find((btn) => btn.name === name);
  };

  const createButtons = () => {
    let names: ButtonNames[] = ["back", "foward"];
    if (otherButtons.backMainButton.enabled) {
      if (otherButtons.backMainButton.position >= 0) {
        names.splice(otherButtons.backMainButton.position, 0, "backMain");
      } else {
        names.push("backMain");
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
          .setCustomId(name)
          .setDisabled(false)
          .setStyle(getButtonData(name).style || "SECONDARY")
      );
      return row;
    }, []);
  };

  const msgButtons = (state?: boolean) => [
    new MessageActionRow().addComponents(createButtons()),
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
    const id = interaction.customId as ButtonNames;

    if (id === "back") {
      interaction.reply({ content: replyMessages.back, ephemeral: true });
      if (currentPage === 1) {
        currentPage = embeds.length;
        sliderMessage.edit({
          embeds: [embeds[currentPage - 1]],
          components: msgButtons(),
        });
        return;
      }
      currentPage--;
    }
    if (id === "foward") {
      interaction.reply({ content: replyMessages.foward, ephemeral: true });
      if (currentPage === embeds.length) {
        currentPage = 1;
        sliderMessage.edit({
          embeds: [embeds[currentPage - 1]],
          components: msgButtons(),
        });
        return;
      }
      currentPage++;
    }
    if (id === "backMain") {
      interaction.reply({ content: replyMessages.backMain, ephemeral: true });
      currentPage = 1;
    }
    if (id === "delete") {
      sliderMessage.delete();
      return;
    }

    sliderMessage.edit({
      embeds: [embeds[currentPage - 1]],
      components: msgButtons(),
    });
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

  /////////////////////////
};
