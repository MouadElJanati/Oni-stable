const { Client, RichEmbed } = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const { ownerid } = require("../assets/config.json");
const Discord = require("discord.js");

module.exports = {
  name: "shutdown",
  description: "Отключает бота.",
  execute(client, message, args) {
    if (message.author.id === ownerid) {
      message.react("746033667842899998");
      let embed = new Discord.MessageEmbed()
        .setThumbnail(
          "https://i.pinimg.com/originals/95/9a/d3/959ad3842394161b09d4cd3987c3f51c.gif"
        )
        .setDescription("Отключаюсь от сети 🔌")
        .setColor(success);
      message.channel.send(embed);
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      sleep(4000).then(() => {
        process.exit();
      });
    } else {
      let error = new Discord.MessageEmbed()
        .setThumbnail("https://thumbs.gfycat.com/OldPalatableDugong-small.gif")
        .setDescription(`У Вас нету прав, что б отключить меня.`)
        .setColor(fail);
      message.channel.send(error);
      message.delete();
    }
  },
};
