const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const { prefix, token } = require("../assets/config.json");

module.exports = {
  name: "help",
  description: "Справка с командами бота.",
  execute(client, message, args) {
    message.react("744234265910312961");
    let embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username + " " + "Справка", client.user.avatarURL)
      .setURL("https://tflashgamer.github.io/onicommands.html")
      .setColor(success)
      .setTitle("Команды для Oni💎")
      .setDescription(
        "Пока что справка не доступна, перейдите на сайт что б посмотреть примерные команды."
      )
      .setImage("https://i.ibb.co/H2GZ65x/panorama.png");
    message.channel.send(embed);
  },
};
