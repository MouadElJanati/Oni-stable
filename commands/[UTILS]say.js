module.exports = {
  name: "say",
  description: "Выводит Ваше сообщение через бота.",
  execute(client, message, args) {
    const input = args.join(" ");
    const text = input.replace("@everyone", "@​everyone");
    const finalText = text.replace("@here", "@​here");

    message.channel.send(finalText);
    message.delete();
  },
};
