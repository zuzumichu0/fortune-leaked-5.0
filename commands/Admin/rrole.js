const Discord = require("discord.js");
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    message.delete()
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(bot.getid(args[0]));

    if (!message.member.hasPermission("ADMINISTRATOR")) {
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
        if (!rMember.roles.cache.has(gRole.id))
            return message.reply(`ผู้ใช้ไม่มียศนี้อยู่แล้วค่ะ...//แอบขำนิด`);

        else {
            rMember.roles.remove(gRole.id)
                .then(() => {
                    let embed2 = new Discord.MessageEmbed()
                        .setColor(config.colorfail)
                        .setDescription(`:x: คุณ **${rMember}** ได้ถูกลบยศ \`${gRole.name}\` ออกแล้วค่ะ`)
                        .setFooter(`ยศของนายท่านถูกลบโดย ${message.member.displayName}`, `${message.author.displayAvatarURL()}`)
                        .setTimestamp()
                    message.channel.send(embed2).then((msg) => {
                        msg.delete({
                            timeout: 5000
                        });
                    });
                }).catch((e) => {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor(config.colorfail)
                        .setDescription(`มีปัญหาในการลบยศ`)
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