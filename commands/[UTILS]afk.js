const Discord = require("discord.js");
const { success, fail } = require("../assets/colors.json");
const config = require("../assets/config.json");

module.exports = {
  name: "afk",
  description: "Дайте знать другим что Вы отошли.",
  execute(client, message, args) {
    message.react("💤");
    let reason = args.join(" ")
      ? args.join(" ")
      : "Кажется пользователю просто нужно было отойти (причина не указана).";
    let afklist = client.afk.get(message.author.id);
    let afkcheck = client.afk.get(message.author.id);
    if (afkcheck)
      return [
        client.afk.delete(message.author.id),
        message
          .reply(`Теперь Вы не находитесь в афк списке!`)
          .then((msg) => msg.delete({ timeout: 5000 })),
      ];
    if (!afklist) {
      let construct = {
        id: message.author.id,
        reason: reason,
      };
      const hrole = message.guild.roles.cache.find(
        (role) => role.name === config.botname
      );
      const member = message.author;
      console.log(hrole.name);
      message.guild.roles
        .create({
          data: {
            name: "AFK💤",
            color: "#a4b1ba",
            hoist: true,
            position: hrole.position,
          },
          reason: "Роль созданна для контроллирования ботом афк списка",
        })
        .catch(console.error);
      const role = message.guild.roles.cache.find(
        (role) => role.name === "AFK💤"
      );
      member.roles.add(role);
      let afks = require("../assets/phrases/afk.json");
      let embed = new Discord.MessageEmbed()
        .setColor(success)
        .setTitle("AFK💤")
        .setDescription(`${message.author} отошёл по причине: ${reason}`)
        .setThumbnail(
          `${afks.image[Math.floor(Math.random() * afks.image.length)]}`
        );
      client.afk.set(message.author.id, construct);
      message.delete({ timeout: 3000 });
      return message.channel.send(embed);
    }
  },
};
