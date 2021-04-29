const Discord = require("discord.js");
exports.run = (bot, message, args) => {
  message.delete();
  if(!args[0]) return message.channel.send("กรุณาแท็กผู้ใช้ด้วยค่ะ")
  let user = message.mentions.users.first();
  let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} ชวน ${user.tag} กินข้าว`)
    .setImage(`https://cdn.discordapp.com/attachments/717494975293816952/724680555446140999/EAT.gif`)
    .setColor(config.color);
  message.channel.send(embed);
};
exports.conf = { aliases: [] };