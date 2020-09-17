const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const { ownerid, token } = require("../assets/config.json");

module.exports = {
  name: "reboot",
  description: "Переподключает бота к Discord API.",
  execute(client, message, args) {
    if (message.author.id === ownerid) {
      const embed = new Discord.MessageEmbed()
        .setThumbnail("https://i.gifer.com/DDG9.gif")
        .setDescription("Переподключаюсь к Discord API♻")
        .setColor(success);
      message.channel.send(embed);
      message.delete();
      client.destroy();
      client.login(token);
    } else {
      const error = new Discord.MessageEmbed()
        .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
        .setDescription(`У Вас нету прав, что б перезагрузить меня.`)
        .setColor(fail);
      message.channel.send(error);
      message.delete();
    }
  },
};
