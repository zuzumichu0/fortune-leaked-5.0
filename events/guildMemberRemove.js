const Discord = require("discord.js")
const chalk = require("chalk")
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").GuildMember} member
 */
module.exports = async (bot,member)=>{
    let guilddata = await bot.db.getguild(member.guild.id)
    if(guilddata&&guilddata.leaveid){
        let channel = await member.guild.channels.cache.get(guilddata.leaveid)
        if(channel&&guilddata.leavemsg) channel.send(guilddata.leavemsg.replace(/\${member}/,member.user))
    }
}