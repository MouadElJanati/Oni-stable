const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");
let phrases = require("../assets/phrases/phrases.json");

module.exports = {
  name: "ping",
  description: "Позволяет быстро узнать задержку от бота к Вам.",
  execute(client, message, args) {
    console.log("+");
    const oni = client.emojis.cache.get("744234265910312961");
    const server = client.emojis.cache.get("746021632320995468");
    let embed = new Discord.MessageEmbed()

      .setTitle(
        `${phrases.ping[Math.floor(Math.random() * phrases.ping.length)]}`
      )
      .setDescription(
        `${oni} Пинг бота: ${client.ws.ping} мс\n${server} Пинг сервера: ${message.guild.shard.ping} мс`
      )
      .setThumbnail(
        "https://i.pinimg.com/originals/21/02/a1/2102a19ea556e1d1c54f40a3eda0d775.gif"
      )
      .setColor(success);
    message.channel.send(embed);
    message.delete();
  },
};
