const Discord = require("discord.js");
const strftime = require("strftime");

module.exports = {
  name: "userinfo",
  description: "Информация о пользователе.",
  execute(client, message, args) {
    let member = message.mentions.members.first();
    let argsUser;
    if (member) argsUser = member.user;
    else argsUser = message.author;

    let statuses = {
      online: "В сети",
      idle: "Нет на месте",
      dnd: "Не беспокоить",
      offline: "Не в сети",
    };
    let userstatus;
    userstatus = `${statuses[argsUser.presence.status]}`;
    let game;
    game = `${argsUser.presence.activities}` || `Сейчас ничем не занят(а)`;

    let day = 1000 * 60 * 60 * 24;
    let date1 = new Date(message.createdTimestamp);
    let date2 = new Date(argsUser.createdTimestamp);
    let date3 = new Date(message.guild.member(argsUser).joinedTimestamp);
    let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day));
    let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day));

    let embed = new Discord.MessageEmbed()
      .setAuthor(
        "Информация об" + " " + argsUser.tag + " " + "ID:" + argsUser.id
      )

      .addField(
        "❯ Информация об участнике сервера",
        `• Никнейм: ${argsUser.username}\n
        • Дата вступления: ${strftime(
          "%d.%m.%Y в %H:%M",
          new Date(message.guild.member(argsUser).joinedTimestamp)
        )}\n(${diff2} дн. назад) \n
        • Роли: 
        ${
          message.guild
            .member(argsUser)
            .roles.cache.filter((r) => r.id != message.guild.id)
            .map((role) => role.name)
            .join(", ") || "Не имеет ролей"
        }`,
        true
      )
      .addField(
        "❯ Информация об пользователе",
        `• Дискорд тег: ${argsUser.tag}\n
        • Дата регистарции: ${strftime(
          "%d.%m.%Y в %H:%M",
          new Date(argsUser.createdTimestamp)
        )}\n(${diff1} дн. назад)\n
        • ID:${argsUser.id}\n
        • Статус: ${userstatus}\n
        • Активность: ${game}`,
        true
      )
      .setColor(message.guild.member(argsUser).displayHexColor)
      .setThumbnail(
        argsUser.avatarURL({ format: "png", dynamic: true, size: 2048 })
      );
    message.channel.send(embed);
    message.delete();
  },
};
