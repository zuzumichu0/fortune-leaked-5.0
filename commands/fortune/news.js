const Discord = require('discord.js')
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
  message.delete()
    let reason = args.join(' ');
    if (!reason) {
      message.channel.send(`**${message.author.tag}** กรุณาใส่คำที่จะประกาศด้วยนะคะ`).then((msg) => {
        return msg.delete({timeout: 5000});
      });
    }
    if (reason) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`:bell: ประกาศจาก ${Discord.Util.escapeMarkdown(message.author.tag)}`)
        .setDescription(`${reason}`)
        .setFooter(`ประกาศเวลา`, `${message.author.displayAvatarURL()}`)
        .setColor(config.color)
        .setTimestamp()
      message.channel.send(embed)
    }
  }

exports.conf = {
  aliases: ["bc","broadcast"],
  price: 1000
};