const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Снимает паузу с плеера",
  execute(client, message, args) {
    message.react("▶");
    message.delete({ timeout: 3000 });
    let resumesong = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} ▶ снял трек с паузы!`)
      .setColor(success)
      .setThumbnail(
        "https://assets.materialup.com/uploads/e1df752f-6402-4ccf-8fb7-a55bee8e183d/preview.gif"
      );
    let notpaused = new Discord.MessageEmbed()
      .setTitle(`Пауза на плеере не стоит!`)
      .setColor(fail)
      .setThumbnail(
        "https://assets.materialup.com/uploads/e1df752f-6402-4ccf-8fb7-a55bee8e183d/preview.gif"
      );
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(resumesong).catch(console.error);
    }

    return message.reply(notpaused).catch(console.error);
  },
};
