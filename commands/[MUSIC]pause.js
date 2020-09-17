const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "pause",
  description: "Ставит на паузу плеер",
  execute(client, message, args) {
    message.react("⏸");
    message.delete({ timeout: 3000 });
    //* Ембед о паузе
    let pausesong = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} ⏸ поставил на паузу.`)
      .setColor(success)
      .setThumbnail(
        "https://assets.materialup.com/uploads/e1df752f-6402-4ccf-8fb7-a55bee8e183d/preview.gif"
      );
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(pausesong).catch(console.error);
    }
  },
};
