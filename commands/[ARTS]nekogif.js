const { url } = require("inspector");

module.exports = {
  name: "nekogif",
  description: "Гифка с неко.",
  execute(client, message, args) {
    const { success, fail } = require("../assets/colors.json");
    const Discord = require("discord.js");
    const clients = require("nekos.life");
    const { sfw } = new clients();
    async function artsend() {
      var art = await sfw.nekoGif();
      let embed = new Discord.MessageEmbed()
        .setTitle("Неко гифки")
        .setColor(success)
        .setImage(art.url);
      await message.channel.send(embed);
      message.delete();
    }

    artsend();
  },
};
