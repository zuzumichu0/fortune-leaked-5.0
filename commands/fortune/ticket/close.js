const discord = require("discord.js");

/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */

module.exports.run = async (bot, message, args) => {
    if(message.channel.name === message.author.id) {
        message.channel.delete();
    }else
    {   
        message.channel.send(`:x: ${message.author} ไม่สามารถลบห้องอื่นๆได้นอกจากห้องของตัวเอง!`)
      }
}
exports.conf = { aliases: [] };