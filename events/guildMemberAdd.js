const Discord = require("discord.js")
const chalk = require("chalk")
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").GuildMember} member
 */
module.exports = async (bot,member)=>{
    let guilddata = await bot.db.getguild(member.guild.id)
    if(guilddata&&guilddata.joinid){
        let channel = await member.guild.channels.cache.get(guilddata.joinid)
        if(channel&&guilddata.joinmsg) channel.send(guilddata.joinmsg.replace(/\${member}/,member.user))
    }
}