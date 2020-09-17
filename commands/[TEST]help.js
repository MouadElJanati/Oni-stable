const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");
const config = require("../assets/config.json");

module.exports = {
  name: "help2",
  aliases: ["h"],
  description: "Показывает весь список команд",
  execute(client, message, args) {
    let commands = message.client.commands.array();

    let helpEmbed = new Discord.MessageEmbed()
      .setTitle("Тестовая генерация справки")
      .setDescription("Список команд")
      .setColor(success);

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${config.prefix}${cmd.name} ${
          cmd.aliases ? `(${cmd.aliases})` : ""
        }**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
