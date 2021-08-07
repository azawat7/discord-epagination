const { MessageButton, MessageActionRow } = require("discord.js");

async function createSimpleSlider(
  message,
  embeds,
  replyMsg,
  emoji = ["◀️", "▶️"],
  time = 60000
) {
  if (!replyMsg)
    throw new TypeError(
      "discord-epagination => please specify replies, see here https://iapg.gitbook.io/discord-epagination/options/replymsgoptions"
    );
  const button_back = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("back");

  const button_next = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("next");

  const button_back_disabled = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("back_disabled")
    .setDisabled(true);

  const button_next_disabled = new MessageButton()
    .setStyle("SECONDARY")
    .setCustomId("next_disabled")
    .setDisabled(true);

  if (emoji[0] && emoji[1]) {
    button_back.setEmoji(emoji[0]);
    button_next.setEmoji(emoji[1]);
    button_back_disabled.setEmoji(emoji[0]);
    button_next_disabled.setEmoji(emoji[1]);
  } else {
    button_back.setLabel("<");
    button_next.setLabel(">");
    button_back_disabled.setLabel("<");
    button_next_disabled.setLabel(">");
  }

  const buttonsActive = new MessageActionRow().addComponents([
    button_back,
    button_next,
  ]);

  const buttonsDisabled = new MessageActionRow().addComponents([
    button_back_disabled,
    button_next_disabled,
  ]);

  message.channel
    .send({ embeds: [embeds[0]], components: [buttonsActive] })
    .then((msg) => {
      const filter = (interaction) => interaction.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({
        filter,
        time,
      });

      let currentPage = 0;

      collector.on("collect", (button) => {
        if (button.user.id == message.author.id) {
          button.reply({ content: replyMsg.backAndFoward, ephemeral: true });
          if (button.customId == "back") {
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
          }
        }
      });
      collector.on("end", (collected) => {
        if (!msg.deleted)
          msg.edit({
            embeds: [embeds[currentPage]],
            components: [buttonsDisabled],
          });

        console.log("discord-epagination => Ended Collector");
      });
      collector.on("error", (e) => console.log(e));
    });
}

module.exports = createSimpleSlider;
