const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    let user = message.mentions.users.first()||message.author
    let userdata = await bot.db.getuser(user.id)
    message.channel.send(`${user} มี ${config.econame} จำนวน \`${userdata.point}\` ${config.econame} <:coin:716555704990695434>`)
}
exports.conf = {
    aliases: ["coin"]
};