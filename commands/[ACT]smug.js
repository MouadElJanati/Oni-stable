const { url } = require("inspector");

module.exports = {
  name: "smug",
  description: "Самодовольная улыбка.",
  execute(client, message, args) {
    const { success, fail } = require("../assets/colors.json");
    let smugs = require("../assets/phrases/smug.json");
    const Discord = require("discord.js");
    const clients = require("nekos.life");
    const { sfw } = new clients();
    async function artsend() {
      var art = await sfw.smug();
      let embed = new Discord.MessageEmbed()
        .setTitle(
          message.author.username +
            " " +
            smugs.phrases[Math.floor(Math.random() * smugs.phrases.length)]
        )
        .setColor(success)
        .setImage(art.url);
      await message.channel.send(embed);
      message.delete();
    }

    artsend();
  },
};
