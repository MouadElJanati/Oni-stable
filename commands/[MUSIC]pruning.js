const fs = require("fs");
const config = require("../assets/config.json");
const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");

module.exports = {
  name: "pruning",
  description: "Включает очистку музыкальных команд",
  execute(client, message, args) {
    const checkemote = message.client.emojis.cache.get("755736806087196764");
    message.react(checkemote);
    message.delete({ timeout: 3000 });
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        let error = new Discord.MessageEmbed()
          .setTitle(
            `Ой-ой! Случилось что то странное и у нас ничего не получилось :(`
          )
          .setThumbnail(
            "https://thumbs.gfycat.com/OldPalatableDugong-small.gif"
          )
          .setColor(fail);
        return message.channel.send(error).catch(console.error);
      }
      let erasingmode = new Discord.MessageEmbed()
        .setTitle(
          `Очищение музыкальных сообщений ${
            config.PRUNING ? "**включено**" : "**отключено**"
          }`
        )
        .setThumbnail(
          "https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
        )
        .setColor(success);
      return message.channel.send(erasingmode).catch(console.error);
    });
  },
};
