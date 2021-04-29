/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = (bot, message, args) => {
    message.delete()
    let member = message.mentions.members.first() || message.guild.members.cache.get(bot.getid(args[0]));

    if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.channel.send(`**${message.author.tag}** นายท่านไม่มีสิทธ์ในการเตะนะคะ...//มอง`);
    } else {
        if (!member)
            return message.channel.send(`**${message.author.tag}** นายท่านต้องแท็กคนที่ต้องการเตะด้วยนะคะ...คิกๆ//แอบขำเบาๆ`);
        if (!member.kickable)
            return message.channel.send(`**${message.author.tag}** หนูมีสิทธิ์ไม่พอที่จะเตะผู้ใช้งานกรุณาให้สิทธิ์และปรับหนูให้อยู่สูงกว่าผู้ใช้...//ก้ม`);
        let reason = args.slice(1).join(' ');
        if (!reason)
            reason = "ไม่พบเหตุผลที่ระบุค่ะ";
        member.kick(reason)
            .then(() => {
                message.channel.send(`${member.user.tag} ถูกเตะโดย ${message.author.tag} เพราะ: ${reason}`);
            })
            .catch(error => message.channel.send(`ขอโทษค่ะคุณ ${message.author} หนูไม่สามารถเตะผู้ใช้ได้เนื่องจาก: ${error}`));
    }
}

exports.conf = {
    aliases: []
};