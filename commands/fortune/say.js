  const Discord = require('discord.js')
  /**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
  module.exports.run = async (bot, message, args) => {
      let reason = args.join(' ');
      if (!reason) {
        message.delete()
        message.channel.send(`**${message.author.tag}** กรุณาใส่คำที่จะประกาศด้วยนะคะ`).then((msg) => {
          return msg.delete(5000);
        });
        console.log('bot: error no text in chat')
      }
      if (reason) {
        message.delete(1000)
        let embed = new Discord.RichEmbed()
          .setTitle(`:bell: ประกาศจาก ${message.author.tag}`)
          .setDescription(`${reason}`)
          .setFooter(`ประกาศเวลา`, `${message.author.displayAvatarURL}`)
          .setColor(config.color)
          .setTimestamp()
        message.channel.send(embed)
      }
    }

  exports.conf = {
    aliases: [],
    price: 500
  };