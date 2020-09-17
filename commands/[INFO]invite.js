const { Client, RichEmbed } = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Даёт инвайт ссылки для добавления бота.",
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle("🔗 Вот ссылки для добавления бота на Ваш сервер")
      .setDescription(
        "Вы можете добавить бота используя вот [Эту ссылку](https://discord.com/oauth2/authorize?client_id=539865580413386783&scope=bot&permissions=8)\n Или же добавить бота через наш [Официальный сайт](https://tflashgamer.github.io/oni.html)"
      )
      .setThumbnail("https://i.gifer.com/3juk.gif")
      .setColor(success);
    message.channel.send(embed);
    message.delete();
  },
};
