const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "stop",
  description: "Останавливает музыку",
  execute(client, message, args) {
    const checkemote = message.client.emojis.cache.get("755736806087196764");
    message.react(checkemote);
    message.delete({ timeout: 3000 });
    let emptyqueue = new Discord.MessageEmbed()
      .setTitle(`Ничего не играет.`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    let stopembed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} ⏹ остановил музыку!`)
      .setColor(success)
      .setThumbnail(
        "https://cdn.dribbble.com/users/26878/screenshots/3657037/21-playpause.gif"
      );
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply(emptyqueue).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(stopembed).catch(console.error);
  },
};
