const { canModifyQueue } = require("../util/OniUtil");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Изменяет громкость воспроизводимого трека",
  execute(client, message, args) {
    let joinfirstembed = new Discord.MessageEmbed()
      .setTitle("**Для начала присоеденитесь к голосовому каналу**")
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    let invalidvolume = new Discord.MessageEmbed()
      .setTitle(
        `Пожалуйста, используйте только цифры что б установить громкость`
      )
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    let invalidnumber = new Discord.MessageEmbed()
      .setTitle(`Пожалуйста, выберите число меджу 0 - 100`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    let emptyqueue = new Discord.MessageEmbed()
      .setTitle(`Ничего не играет.`)
      .setColor(fail)
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      );
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(emptyqueue).catch(console.error);

    if (!message.member.voice)
      return message.reply(joinfirstembed).catch(console.error);
    let currentvolume = new Discord.MessageEmbed()
      .setTitle(`🔊 Текущая громкость: **${queue.volume}%**`)
      .setColor(success)
      .setThumbnail(
        "https://thumbs.gfycat.com/MildOptimalKentrosaurus-small.gif"
      );

    if (!args[0]) return message.reply(currentvolume).catch(console.error);
    if (isNaN(args[0]))
      return message.reply(invalidvolume).catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply(invalidnumber).catch(console.error);
    queue.volume = args[0];
    let setvolume = new Discord.MessageEmbed()
      .setTitle(`Громкость установлена на **${args[0]}%**`)
      .setColor(success)
      .setThumbnail(
        "https://thumbs.gfycat.com/MildOptimalKentrosaurus-small.gif"
      );
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(setvolume).catch(console.error);
  },
};
