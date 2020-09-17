module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const Discord = require("discord.js");
    const botChannel = member.guild.me.voice.channel;
    const { success, fail } = require("../assets/colors.json");
    //* Ембед просьбы присоединения
    let join = new Discord.MessageEmbed()
      .setTitle(`Присоеденитесь к голосовому каналу!`)
      .setColor(fail)
      .setThumbnail("https://i.gifer.com/P6yH.gif"); //! Заменить изображение

    if (channel !== botChannel) {
      member.send(join).catch(console.error);
      return false;
    }

    return true;
  },
};
