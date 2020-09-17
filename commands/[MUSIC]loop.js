const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Включает повтор для плеера",
  execute(client, message, args) {
    message.react("🔄");
    message.delete({ timeout: 3000 });
    let nothingPlaying = new Discord.MessageEmbed()
      .setTitle("Сейчас ничего не играет.")
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      )
      .setColor(fail);
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(nothingPlaying).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    let loopmode = new Discord.MessageEmbed()
      .setTitle(
        `Режим повтора сейчас ${queue.loop ? "**включён**" : "**выключен**"}`
      )
      .setThumbnail(
        "https://static.tildacdn.com/tild3433-6332-4730-b761-366135363730/loading.gif"
      )
      .setColor(success);
    queue.loop = !queue.loop;
    return queue.textChannel.send(loopmode).catch(console.error);
  },
};
