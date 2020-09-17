const { Client, RichEmbed, version } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { success, fail } = require("../assets/colors.json");
const { prefix, token, botversion } = require("../assets/config.json");

module.exports = {
  name: "stats",
  description: "Краткая информация об боте",
  execute(client, message, args) {
    const serverName = message.guild.name;
    const ping = client.ws.ping;
    const botAv = client.displayAvatarURL;

    const duration = moment
      .duration(client.uptime)
      .format(" D [дней], H [часов], m [минут], s [секунд]");

    const embed = new Discord.MessageEmbed()
      .setTitle(`Oni v.${botversion}`)
      .setURL("https://tflashgamer.github.io/oni.html")
      .setColor(success)
      .addField(
        `❯ Описание`,
        `• Об: Oni многофункциональный дискорд бот написан на node.js. Пока что находится на стадии полной переработки тестрирования и дебагов`
      )
      .addField(
        `❯ Информация`,
        `• ID бота: ${client.user.id}\n
         • Статистика:\n ${client.guilds.cache.size} Серверов\n
         ${client.channels.cache.size} Каналов\n
         ${client.users.cache.size} Пользователей\n
         • Название сервера: ${serverName}\n
         • Пинг: ${ping}мс\n
         • Бот онлайн: ${duration}\n
         • Использование памяти: ${(
           process.memoryUsage().heapUsed /
           1024 /
           1024
         ).toFixed(2)} MB\n
         • Версия Discord.js: ${version}\n
         • Версия Node.js: ${process.version}`,
        true
      )
      .addField(
        "❯ Ссылки",
        "[Сервер поддержки](https://discord.gg/yJ9j87P)\n[Официальный сайт](https://tflashgamer.github.io/oni.html)\n[Ruby Guardians](https://discord.gg/8RE5wrQ)",
        true
      )
      .setThumbnail(
        client.user.avatarURL({ format: "png", dynamic: true, size: 2048 }),
        true
      );
    message.channel.send(embed);
    message.delete();
  },
};
