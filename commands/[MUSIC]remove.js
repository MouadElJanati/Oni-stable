const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const config = require("../assets/config.json");
const Discord = require("discord.js");

module.exports = {
  name: "remove",
  description: "Убирает песню из списка",
  execute(client, message, args) {
    const checkemote = message.client.emojis.cache.get("755736806087196764");
    message.react(checkemote);
    message.delete({ timeout: 3000 });
    let noqueue = new Discord.MessageEmbed()
      .setTitle(`Здесь нету списка.`)
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    let usage = new Discord.MessageEmbed()
      .setTitle(`Использование: ${config.prefix}remove <Цифра из списка>`)
      .setColor(fail)
      .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif");
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(noqueue).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(usage);
    if (isNaN(args[0])) return message.reply(usage);

    const song = queue.songs.splice(args[0] - 1, 1);
    let removesong = new Discord.MessageEmbed()
      .setTitle(
        `${message.author.username} ❌ убрал **${song[0].title}** из списка.`
      )
      .setColor(success)
      .setThumbnail(
        "https://i.pinimg.com/originals/b0/b7/6a/b0b76ac4bdc39d353728c2be07201c6c.gif"
      );
    queue.textChannel.send(removesong);
  },
};
