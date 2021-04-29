const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    if(!args.length) return message.channel.send(`กรุณาระบุแท็คคน ${prefix}shake ${message.author}`)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let prevoice = member.voice.channel;
    let tochannel = [];
    message.channel.send(`กำลังเขย่า \`${member.displayName}\``)
    message.guild.channels.cache.forEach((channel)=>{
        if(channel.permissionsFor(member).has("CONNECT")&&channel.type=="voice"&&channel!=prevoice) tochannel.push(channel)
    })
    if(!tochannel.length) return message.reply("ไม่พบห้องอื่น")
    tochannel.length = 3
    for (let i = 0; i < tochannel.length; i++) {
        await member.voice.setChannel(tochannel[i]);
    }
    member.voice.setChannel(prevoice)
}
exports.conf = {
    aliases: [],
    price: 1500
};