const { url } = require("inspector");

module.exports = {
  name: "neko",
  description: "Арт с неко.",
  execute(client, message, args) {
    const { success, fail } = require("../assets/colors.json");
    const Discord = require("discord.js");
    const clients = require("nekos.life");
    const { sfw } = new clients();
    async function artsend() {
      var art = await sfw.neko();
      let embed = new Discord.MessageEmbed()
        .setTitle("Неко")
        .setColor(success)
        .setImage(art.url);
      await message.channel.send(embed);
      message.delete();
    }

    artsend();
  },
};
