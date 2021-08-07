const { MessageButton, MessageActionRow } = require("discord.js");

async function createAdvancedSlider(
  message,
  embeds,
  replyMsg,
  deleteMsg = false,
  backMain = false,
  emoji = ["◀️", "▶️", "❌", "↩"],
  time = 60000
) {
  const button_back = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("back");

  const button_next = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("next");

  const button_x = new MessageButton().setStyle("SECONDARY").setCustomId("x");

  const button_backmain = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("backmain");

  const button_back_disabled = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("back_disabled")
    .setDisabled(true);

  const button_next_disabled = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("next_disabled")
    .setDisabled(true);

  const button_backmain_disabled = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("backmain_disabled")
    .setDisabled(true);
  const button_x_disabled = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("x_disabled")
    .setDisabled(true);

  button_back.setEmoji(emoji[0]);
  button_next.setEmoji(emoji[1]);
  button_x.setEmoji(emoji[2]);
  button_backmain.setEmoji(emoji[3]);

  button_back_disabled.setEmoji(emoji[0]);
  button_next_disabled.setEmoji(emoji[1]);
  button_backmain_disabled.setEmoji(emoji[3]);
  button_x_disabled.setEmoji(emoji[2]);

  if (deleteMsg && backMain) {
    const buttonsActive = new MessageActionRow().addComponents([
      button_back,
      button_next,
      button_x,
      button_backmain,
    ]);

    const buttonsDisabled = new MessageActionRow().addComponents([
      button_back_disabled,
      button_next_disabled,
      button_x_disabled,
      button_backmain_disabled,
    ]);

    message.channel
      .send({ embeds: [embeds[0]], components: [buttonsActive] })
      .then((msg) => {
        const filter = (interaction) =>
          interaction.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({
          filter,
          time,
        });

        let currentPage = 0;

        collector.on("collect", (button) => {
          if (button.user.id == message.author.id) {
            if (button.customId == "back") {
              button.reply({
                content: replyMsg.backAndFoward,
                ephemeral: true,
              });
              if (currentPage !== 0) {
                --currentPage;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              } else {
                currentPage = embeds.length - 1;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              }
            } else if (button.customId == "next") {
              button.reply({
                content: replyMsg.backAndFoward,
                ephemeral: true,
              });
              if (currentPage < embeds.length - 1) {
                currentPage++;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              } else {
                currentPage = 0;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              }
            } else if (button.customId == "x") {
              // button.reply({ content: replyMsg.delete, ephemeral: true });
              msg.delete();
            } else if (button.customId == "backmain") {
              button.reply({
                content: replyMsg.backMain,
                ephemeral: true,
              });
              msg.edit({ embeds: [embeds[0]], components: [buttonsActive] });
            }
          }
        });
        collector.on("end", (collected) => {
          if (!msg.deleted) {
            msg
              .edit({
                embeds: [embeds[currentPage]],
                components: [buttonsDisabled],
              })
              .catch(() => {});
          }

          console.log("discord-epagination => Ended Collector");
        });
        collector.on("error", (e) => console.log(e));
      });
  } else if (deleteMsg && !backMain) {
    const buttonsActive = new MessageActionRow().addComponents([
      button_back,
      button_next,
      button_x,
    ]);

    const buttonsDisabled = new MessageActionRow().addComponents([
      button_back_disabled,
      button_next_disabled,
      button_x_disabled,
    ]);

    message.channel
      .send({ embed: embeds[0], components: buttonsActive })
      .then((msg) => {
        const filter = (interaction) =>
          interaction.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({
          filter,
          time,
        });

        let currentPage = 0;

        collector.on("collect", (button) => {
          if (button.user.id == message.author.id) {
            if (button.customId == "back") {
              button.reply({
                content: replyMsg.backAndFoward,
                ephemeral: true,
              });
              if (currentPage !== 0) {
                --currentPage;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              } else {
                currentPage = embeds.length - 1;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              }
            } else if (button.customId == "next") {
              button.reply({
                content: replyMsg.backAndFoward,
                ephemeral: true,
              });
              if (currentPage < embeds.length - 1) {
                currentPage++;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              } else {
                currentPage = 0;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              }
            } else if (button.customId == "x") {
              // button.reply({ content: replyMsg.delete, ephemeral: true });
              msg.delete();
            }
          }
        });
        collector.on("end", (collected) => {
          if (!msg.deleted) {
            msg
              .edit({
                embeds: [embeds[currentPage]],
                components: [buttonsDisabled],
              })
              .catch(() => {});
          }

          console.log("discord-epagination => Ended Collector");
        });
        collector.on("error", (e) => console.log(e));
      });
  } else if (!deleteMsg && backMain) {
    const buttonsActive = new MessageActionRow().addComponents([
      button_back,
      button_next,
      button_backmain,
    ]);

    const buttonsDisabled = new MessageActionRow().addComponents([
      button_back_disabled,
      button_next_disabled,
      button_backmain_disabled,
    ]);
    message.channel
      .send({ embed: embeds[0], components: buttonsActive })
      .then((msg) => {
        const filter = (interaction) =>
          interaction.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({
          filter,
          time,
        });

        let currentPage = 0;

        collector.on("collect", (button) => {
          if (button.user.id == message.author.id) {
            if (button.customId == "back") {
              button.reply({
                content: replyMsg.backAndFoward,
                ephemeral: true,
              });
              if (currentPage !== 0) {
                --currentPage;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              } else {
                currentPage = embeds.length - 1;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              }
            } else if (button.customId == "next") {
              button.reply({
                content: replyMsg.backAndFoward,
                ephemeral: true,
              });
              if (currentPage < embeds.length - 1) {
                currentPage++;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              } else {
                currentPage = 0;
                msg.edit({
                  embeds: [embeds[currentPage]],
                  components: [buttonsActive],
                });
              }
            } else if (button.customId == "backmain") {
              button.reply({
                content: replyMsg.backMain,
                ephemeral: true,
              });
              msg.edit({ embeds: [embeds[0]], components: [buttonsActive] });
            }
          }
        });
        collector.on("end", (collected) => {
          if (!msg.deleted) {
            msg
              .edit({
                embeds: [embeds[currentPage]],
                components: [buttonsDisabled],
              })
              .catch(() => {});
          }

          console.log("discord-epagination => Ended Collector");
        });
        collector.on("error", (e) => console.log(e));
      });
  }
}

module.exports = createAdvancedSlider;
