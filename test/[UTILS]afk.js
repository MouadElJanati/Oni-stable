const { url } = require("inspector");
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("../assets/config.json");
const { success, fail } = require("../assets/colors.json");

client.once("ready", () => {
  console.log("❖ [LOGIN]: afk.js ✔");
});

module.exports = {
  name: "afk",
  description: "Дайте знать другим что Вы отошли.",
  execute(message, args) {
    message.react("💤");
    let reason = args.join(" ")
      ? args.join(" ")
      : "Этот пользователь отошёл. Он ответит Вам как только вернётся.";
    client.afk = new Map();
    client.on("message", async (message) => {
      if (message.author.client) return;
      if (message.channel.type === "dm") return;

      let prefix = config.prefix;
      let messageArray = message.content.split(" ");
      let command = messageArray[0].toLowerCase();
      let args = messageArray.slice(1);
      if (message.content.includes(message.mentions.members.first())) {
        let mentioned = client.afk.get(message.mentions.users.first().id);
        if (mentioned)
          message.channel.send(
            `**${mentioned.usertag}** отошёл от клавиатуры. Причина: ${mentioned.reason}`
          );
      }
    });
    let afkcheck = client.afk.get(message.author.id);
    if (afkcheck)
      return [
        client.afk.delete(message.author.id),
        message
          .reply(`you have been removed from the afk list!`)
          .then((msg) => msg.delete(5000)),
      ];
    let afklist = client.afk.get(message.author.id);
    let afks = require("../assets/phrases/afk.json");
    if (!afklist) {
      let construct = {
        id: message.author.id,
        reason: reason,
      };
      let embed = new Discord.MessageEmbed()
        .setColor(success)
        .setTitle("AFK💤")
        .setDescription(
          `Хорошо, я буду оповещать всех, что Вы отошли по причине: ${reason}`
        )
        .setThumbnail(
          `${afks.image[Math.floor(Math.random() * afks.image.length)]}`
        );
      client.afk.set(message.author.id, construct);
      return message.channel
        .send(embed)
        .then((msg) => msg.delete({ timeout: 10000 }));
    }
  },
};
client.login(token);
