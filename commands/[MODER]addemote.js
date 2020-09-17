const isURL = require("isurl");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "addemote",
  description: "Добавляет эмодзи на сервер, где была запущена команда",
  execute(client, message, args) {
    const emoteName = args[0];
    const emoteURL = args[1];

    if (message.member.hasPermission("MANAGE_EMOJIS")) {
      message.guild.emojis.create(emoteURL, emoteName);
      const embed = new Discord.MessageEmbed()
        .setTitle("Эмодзи успешно добавлено на сервер")
        .setDescription(`На сервер добавлено ${emoteName} эмодзи!`)
        .setColor(success)
        .setThumbnail(
          "https://cdn.dribbble.com/users/1187836/screenshots/6006264/12-check.gif"
        );
      message.channel.send(embed);
      message.delete();
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("Отсутствие прав!")
        .setDescription(
          "Вам нужны права 'Управлять эмодзи' что б использовать эту команду."
        )
        .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
        .setColor(fail);
      message.channel.send(embed);
      message.delete();
    }
  },
};
