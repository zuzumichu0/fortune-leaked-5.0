const Discord = require("discord.js");
exports.run = (bot, message, args) => {
  message.delete();
  if(!args[0]) return message.channel.send("กรุณาแท็กผู้ใช้ด้วยค่ะ")
  let user = message.mentions.users.first();
  let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} ได้มอง ${user.tag} นอนหลับตา`)
    .setImage(`https://cdn.discordapp.com/attachments/717494975293816952/724701579462312056/sleep.gif`)
    .setColor(config.color);
  message.channel.send(embed);
};
exports.conf = { aliases: [] };