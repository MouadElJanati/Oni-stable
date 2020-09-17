const { Client, RichEmbed } = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Показывает аватарку упомянутого пользователя.",
  execute(client, message, args) {
    if (!message.mentions.users.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Ваша аватарка ${message.author.username}`)
        .setColor(success)
        .setDescription(
          "[URL аватарки](" +
            message.author.avatarURL({
              format: "png",
              dynamic: true,
              size: 2048,
            }) +
            ")"
        )
        .setImage(
          message.author.avatarURL({ format: "png", dynamic: true, size: 2048 })
        );
      message.channel.send(embed);
      message.delete();
    }

    const avatarList = message.mentions.users.map((user) => {
      const embedmention = new Discord.MessageEmbed()
        .setTitle(`Аватарка пользователя ${user.username}`)
        .setColor(success)
        .setDescription(
          "[URL аватарки](" +
            user.avatarURL({ format: "png", dynamic: true, size: 2048 }) +
            ")"
        )
        .setImage(user.avatarURL({ format: "png", dynamic: true, size: 2048 }));
      message.channel.send(embedmention);
      message.delete();
    });
  },
};
