const { RichEmbed } = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "embed",
  description: "Возвращает сообщение через эмбед, с помощью бота.",
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setDescription(args.join(" "))
      .setColor(success);
    message.channel.send(embed);
    message.delete();
  },
};
