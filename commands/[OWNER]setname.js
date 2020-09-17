const Discord = require("discord.js");
const { Client, RichEmbed } = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const { ownerid, token } = require("../assets/config.json");

module.exports = {
  name: "setname",
  description: "Устанавливает ник для бота",
  execute(client, message, args) {
    if (message.author.id === ownerid) {
      const username = args.join(" ");
      client.user.setUsername(username);

      const embed = new Discord.MessageEmbed()
        .setThumbnail(
          "https://cdn.dribbble.com/users/1187836/screenshots/6006264/12-check.gif"
        )
        .setDescription(`Ник успешно изменён на ${username}`)
        .setColor(success);
      message.channel.send(embed);
      message.delete();
    } else {
      const error = new Discord.MessageEmbed()
        .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
        .setDescription(
          `Извините, изменить ник мне может только мой создатель.`
        )
        .setColor(fail);
      message.channel.send(error);
      message.delete();
    }
  },
};
