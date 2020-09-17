const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Скипает текущий трек",
  execute(client, message, args) {
    message.react("⏭");
    message.delete({ timeout: 3000 });
    let skipembed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} ⏭ скипнул песню`)
      .setColor(success)
      .setThumbnail(
        "https://i.pinimg.com/originals/cc/98/ee/cc98eee389f51e826aaa6c98feaf8906.gif"
      );
    let emptyqueue = new Discord.MessageEmbed()
      .setTitle(
        `Список пуст, по этому у меня нету ничего что бы я мог для Вас пропустить.`
      )
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(emptyqueue).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(skipembed).catch(console.error);
  },
};
