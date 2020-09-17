const createBar = require("string-progressbar");
const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");

module.exports = {
  name: "np",
  description: "Показывает, что сейчас играет",
  execute(client, message, args) {
    const playemote = message.client.emojis.cache.get("755726642659459143");
    let nothingPlaying = new Discord.MessageEmbed()
      .setTitle("Сейчас ничего не играет.")
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      )
      .setColor(fail);
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(nothingPlaying).catch(console.error);
    const song = queue.songs[0];
    const seek =
      (queue.connection.dispatcher.streamTime -
        queue.connection.dispatcher.pausedTime) /
      1000;
    const left = song.duration - seek;
    const songthumbnailurl = song.url;
    const songthumbnail = songthumbnailurl.split("?v=");
    let nowPlaying = new Discord.MessageEmbed()
      .setTitle(`${playemote} Сейчас играет: **${song.title}**`)
      .setURL(`${song.url}`)
      .setColor(success)
      .setThumbnail(
        `https://img.youtube.com/vi/${songthumbnail[1]}/maxresdefault.jpg`
      )
      .addField(
        "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
          "[" +
          createBar(song.duration == 0 ? seek : song.duration, seek, 15)[0] +
          "]" +
          (song.duration == 0
            ? " ◉ Прямой эфир"
            : new Date(song.duration * 1000).toISOString().substr(11, 8)),
        false
      );

    if (song.duration > 0)
      nowPlaying.setFooter(
        "Осталось: " + new Date(left * 1000).toISOString().substr(11, 8)
      );

    return message.channel.send(nowPlaying);
  },
};
