const { url } = require("inspector");

module.exports = {
  name: "foxgirl",
  description: "Арт с инумими.",
  execute(client, message, args) {
    const { success, fail } = require("../assets/colors.json");
    const Discord = require("discord.js");
    const clients = require("nekos.life");
    const { sfw } = new clients();
    async function artsend() {
      var art = await sfw.kemonomimi();
      let embed = new Discord.MessageEmbed()
        .setTitle("Инумими")
        .setColor(success)
        .setImage(art.url);
      await message.channel.send(embed);
      message.delete();
    }

    artsend();
  },
};
