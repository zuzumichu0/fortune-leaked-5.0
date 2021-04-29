const Discord = require('discord.js')
/**
*
*
* @param {import("discord.js").Client} bot
* @param {import("discord.js").Message} message
* @param {String[]} args
*/
exports.run = (bot, message, args) => {
  let embed = new Discord.MessageEmbed() 
  .setAuthor(`ช่องทางการโดเนท`) 
  .setDescription(`วอเล็ต: 0906134657\nขอบคุณสำหรับการโดเนทนะคะ!`) 
  .setImage(`https://cdn.discordapp.com/attachments/619019220965130241/629687209230073856/donate.png`) 
  .setColor(`#F7FF00`)
  message.channel.send(embed)
};
  exports.conf = { aliases: [] };