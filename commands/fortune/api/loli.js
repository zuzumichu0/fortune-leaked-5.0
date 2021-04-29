const Loli = require('lolis.life');
const loli = new Loli();
const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
  let body;
  if (args[0] == "nsfw") {
    if (!message.channel.nsfw) return message.reply("นายท่านสามารถใช้คำสั่งนี้เฉพาะห้อง **NSFW** เท่านั้นนะคะ...//ก้ม");
    body = await loli.getNSFWLoli();
  } else body = await loli.getSFWLoli();
  let loliEmbed = new Discord.MessageEmbed()
    .setTitle(`โลลิของ ${message.author.tag} คือ...`)
    .setImage(body.url)
    .setColor(config.color)
    .setFooter("บอทเวอร์ชั่น: " + config.version);

  message.channel.send(loliEmbed);
};
exports.conf = {
  aliases: []
};