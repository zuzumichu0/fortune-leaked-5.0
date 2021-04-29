const Discord = require("discord.js");
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = (bot, message, args) => {
    message.delete()
    //Pay attention in order to assign a role of a user, the bot needs to be above that role, that means you can't assign an equal or highest role than bot's role
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

    if (!message.member.hasPermission("MANAGE_ROLES")) {
        message.channel.send(`**${message.author.tag}** นายท่านไม่มีสิทธ์ในการปรับยศนะคะ...//มอง`);
    } else {
        if (!rMember)
            return message.channel.send(`**${message.author.tag}** หนูไม่พบผู้ใช้นะคะ...//ก้ม`);
        let role = args.slice(1).join(' ');
        if (!role)
            return message.channel.send(`**${message.author.tag}** กรุณาระบุยศด้วยนะคะ...//โค้งเบาๆ`);
        let gRole = message.guild.roles.cache.find(r => r.name.match(new RegExp(role, "i")) || r.id == bot.getid(role));
        if (!gRole)
            return message.channel.send(`**${message.author.tag}** ขอโทษนะคะหนูไม่พบยศนี้ค่ะ...//ก้ม`);
        if (rMember.roles.cache.has(gRole.id)) return message.channel.send(`${message.author} ผู้ใช้มียศนี้อยู่แล้วค่ะ...//แอบขำนิด`);
        else {
            rMember.roles.add(gRole.id).then(() => {

                message.channel.send(new Discord.MessageEmbed()
                    .setColor(config.colorsuccess)
                    .setDescription(`:white_check_mark: คุณ **${rMember}** ได้รับยศ \`${gRole.name}\` แล้วเจ้าค่ะ`)
                    .setFooter(`ยศของนายท่านถูกเพิ่มโดย ${message.member.displayName}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()).then((msg) => {
                    msg.delete({
                        timeout: 5000
                    });
                });
            }).catch(() => {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(config.colorfail)
                    .setDescription(`มีปัญหาในการให้ยศ`)
                    .setTimestamp()).then((msg) => {
                    msg.delete({
                        timeout: 5000
                    });
                })
            });
        }
    }
}

exports.conf = {
    aliases: []
};