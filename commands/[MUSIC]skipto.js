const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const config = require("../assets/config.json");
const Discord = require("discord.js");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Скипает трек к номеру в списке",
  execute(client, message, args) {
    const checkemote = message.client.emojis.cache.get("755736806087196764");
    message.react(checkemote);
    message.delete({ timeout: 3000 });
    let usage = new Discord.MessageEmbed()
      .setTitle(
        `Использование: ${config.prefix}${module.exports.name} <номер в списке>`
      )
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    let emptyqueue = new Discord.MessageEmbed()
      .setTitle(`Список пуст.`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );

    if (!args.length) return message.reply(usage).catch(console.error);

    if (isNaN(args[0])) return message.reply(usage).catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(emptyqueue).catch(console.error);
    if (!canModifyQueue(message.member)) return;
    let toomuch = new Discord.MessageEmbed()
      .setTitle(`Список имеет только ${queue.songs.length} треков!`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    if (args[0] > queue.songs.length)
      return message.reply(toomuch).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    let skipembed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} ⏭ скипнул ${args[0] - 1} треков`)
      .setColor(success)
      .setThumbnail(
        "https://i.pinimg.com/originals/cc/98/ee/cc98eee389f51e826aaa6c98feaf8906.gif"
      );
    queue.textChannel.send(skipembed).catch(console.error);
  },
};
