const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Достаёт лирику песни",
  async execute(client, message, args) {
    const checkemote = message.client.emojis.cache.get("755736806087196764");
    message.react(checkemote);
    message.delete({ timeout: 3000 });
    let nothingPlaying = new Discord.MessageEmbed()
      .setTitle("Сейчас ничего не играет.")
      .setThumbnail(
        "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
      )
      .setColor(fail);

    const queue = message.client.queue.get(message.guild.id);
    const songthumbnailurl = queue.songs[0].url;
    const songthumbnail = songthumbnailurl.split("?v=");
    if (!queue)
      return message.channel.send(nothingPlaying).catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Лирики для ${queue.songs[0].title} не найдено.`;
    } catch (error) {
      lyrics = `Лирики для ${queue.songs[0].title} не найдено.`;
    }

    let lyricsEmbed = new Discord.MessageEmbed()
      .setTitle(`Лирика для ${queue.songs[0].title}`)
      .setDescription(lyrics)
      .setColor(success)
      .setThumbnail(
        `https://img.youtube.com/vi/${songthumbnail[1]}/maxresdefault.jpg`
      )
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};
