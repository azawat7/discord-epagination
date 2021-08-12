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
} from "./createSlider.interfaces";

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
    if (otherButtons.backMainButton) names.push("backMain");
    if (otherButtons.deleteButton) names.push("delete");

    return names.reduce((row: MessageButton[], name: ButtonNames) => {
      row.push(
        new MessageButton()
          .setEmoji(getButtonData(name).emoji)
          .setCustomId(name)
          .setDisabled(false)
          .setStyle("SECONDARY")
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
