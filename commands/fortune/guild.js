const Discord = require('discord.js');
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {[String]} args
 */
exports.run = async(bot, message, args) =>{
    function checkBots(guild) {
        let botCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
        });
        return botCount;
    }
    
    function checkMembers(guild) {
        let memberCount = 0;
        guild.members.cache.forEach(member => {
            if(!member.user.bot) memberCount++;
        });
        return memberCount;
    }

    function checkOnlineUsers(guild) {
        let onlineCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.presence.status === "online")
                onlineCount++; 
        });
        return onlineCount;
    }
    let serverembed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} - ข้อมูล`, message.guild.iconURL())
        .setColor(config.color)
        .addField('เจ้าของเซิฟเวอร์', message.guild.owner, true)
        .addField('สถานที่ของเซิฟเวอร์', message.guild.region, true)
        .addField("ชื่อเซิฟเวอร์", message.guild.name, true)
        .addField('ความปลอดภัย', message.guild.verificationLevel, true)
        .addField('มีห้องทั้งหมด', message.guild.channels.cache.size, true)
        .addField('มีสมาชิกทั้งหมด', message.guild.memberCount, true)
        .addField('ผู้ใช้ที่เป็นคน', checkMembers(message.guild), true)
        .addField('ผู้ใช้ที่เป็นบอท', checkBots(message.guild), true)
        .addField('ผู้ใช้ที่ออนไลน์', checkOnlineUsers(message.guild),true)
        .setThumbnail(message.guild.iconURL())
        .setFooter('เซิฟเวอร์ถูกสร้างเมื่อ:')
        .setTimestamp(message.guild.createdAt);

    return message.channel.send(serverembed);
}
exports.conf = { aliases: [] };