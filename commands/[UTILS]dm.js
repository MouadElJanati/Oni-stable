const Discord = require("discord.js");
const client = new Discord.Client();
const { success, fail } = require("../assets/colors.json");
const { prefix, token } = require("../assets/config.json");

module.exports = {
  name: "dm",
  description: "Отослать сообщение в ЛС.",
  execute(client, message, args) {
    const oni = client.emojis.cache.get("744234265910312961");
    let embed = new Discord.MessageEmbed()
      .setColor(success)
      .setTitle(`test`)
      .setDescription("test")
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png");
    client.users.fetch("id here", false).then((user) => {
      user.send(embed);
    });
  },
};
