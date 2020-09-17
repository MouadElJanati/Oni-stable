const Client = require("discord.js");
const RichEmbed = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "unban",
  description: "Разбан пользователя.",
  execute(client, message, args) {
    const u = args[0];

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Отсутствие прав!")
        .setDescription(
          "Вам нужно разрешение на бан пользователей что б использовтаь эту команду."
        )
        .setColor(fail);
      message.channel.send(embed);
    } else if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Отсутствие прав!")
        .setDescription(
          "Мне нужно разрешение на бан пользователей что б использовтаь эту команду."
        )
        .setColor(fail);
      message.channel.send(embed);
    } else if (!message.guild.fetchBans().then((bans) => bans.has(u))) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Не пользователь!")
        .setDescription("Я не смог найти этого пользователя")
        .setColor(fail);
      message.channel.send(embed);
    } else if (
      message.member.hasPermission("BAN_MEMBERS") &&
      message.guild.me.hasPermission("BAN_MEMBERS")
    ) {
      message.guild.members.unban(u);
      const embed = new Discord.MessageEmbed()
        .setTitle(`Пользователь был разбанен.`)
        .setDescription(`ID: ${u}`)
        .setThumbnail("https://i.ibb.co/Q9Kxm9v/ban.gif")
        .setColor(success);
      message.channel.send(embed);
      message.delete();
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("Ошибка разбана!")
        .setDescription(
          "По не понятной мне причине, я не смог разбанить этого пользователя."
        )
        .setColor(fail);
      message.channel.send(embed);
    }
  },
};
