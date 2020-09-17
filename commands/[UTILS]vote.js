const Discord = require("discord.js");

module.exports = {
  name: "votes",
  description: "Голосование в за и против.",
  execute(client, message, args) {
    if (args.length < 1) return;

    let embed = new Discord.MessageEmbed()
      .setTitle("Голосование")
      .setDescription(args.join(" "));

    message.channel
      .send({ embed: embed })
      .then((m) => m.react("👍"))
      .then((m) => m.message.react("👎"));

    const filter = (reaction) => {
      return reaction.emoji.name === "👍" || reaction.emoji.name === "👎";
    };

    const results = message.awaitReactions(filter, { time: 10000 });

    let resultsEmbed = new Discord.MessageEmbed()
      .setTitle("Результаты голосования")
      .setDescription(`Результат для голосования: ${args.join(" ")}`)
      .addField("👍:", `${results.size("👍").count - 1} Голосов`)
      .addField("👎:", `${results.size("👎").count - 1} Голосов`);

    message.channel.send(resultsEmbed).catch((err) => {
      console.error(err);

      message.delete();
    });
  },
};
