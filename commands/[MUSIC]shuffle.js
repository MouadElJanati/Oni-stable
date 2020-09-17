const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "shuffle",
  description: "Перемешивает список",
  execute(client, message, args) {
    let shuffleembed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} 🔀 перемешал список`)
      .setColor(success)
      .setThumbnail(
        "https://bestanimations.com/Signs&Shapes/triangle-shape-moving-animated-gif-6.gif"
      );
    let emptyqueue = new Discord.MessageEmbed()
      .setTitle(`Список пуст.`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(emptyqueue).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    queue.textChannel.send(shuffleembed).catch(console.error);
  },
};
