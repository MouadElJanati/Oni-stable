const { url } = require("inspector");

module.exports = {
  name: "meow",
  description: "Пикчи с котами.",
  execute(client, message, args) {
    const { success, fail } = require("../assets/colors.json");
    const Discord = require("discord.js");
    const clients = require("nekos.life");
    const { sfw } = new clients();
    async function artsend() {
      var art = await sfw.meow();
      let embed = new Discord.MessageEmbed()
        .setTitle("Кошечки")
        .setColor(success)
        .setImage(art.url);
      await message.channel.send(embed);
      message.delete();
    }

    artsend();
  },
};
