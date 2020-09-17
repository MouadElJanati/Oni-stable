const { splitMessage, escapeMarkdown } = require("discord.js");
const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");

module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Показывает список песен.",
  execute(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    let queueEmpty = new Discord.MessageEmbed()
      .setTitle("Здесь пустовато :/")
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
      );
    if (!queue) return message.reply(queueEmpty).catch(console.error);

    const description = queue.songs.map(
      (song, index) =>
        `${index + 1}. [${escapeMarkdown(song.title)}](${song.url})`
    );

    let queueEmbed = new Discord.MessageEmbed()
      .setTitle("Очередь воспроизведения")
      .setDescription(description)
      .setColor(success)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );

    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: "",
    });

    splitDescription.forEach(async (m) => {
      queueEmbed.setDescription(m);
      message.channel.send(queueEmbed);
    });
  },
};
