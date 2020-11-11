const Discord = require("discord.js");
const canvacord = require("canvacord");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {
  name: "profile",
  description: "Профиль пользователя.",
  async execute(client, message, args) {
    let image = await canvacord.rank({
      username,
      discrim,
      avatarURL: message.author.displayAvatarURL({ format: "png" }),
      color: "white",
      background: "https://wallpaperaccess.com/full/45412.jpg",
    });
    let attachment = new Discord.MessageAttachment(image, "rank.png");
    return message.channel.send(attachment);
  },
};
