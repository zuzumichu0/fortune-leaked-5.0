/**
*
*
* @param {import("discord.js").Client} bot
* @param {import("discord.js").Message} message
* @param {String[]} args
*/
exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!message.member.hasPermission("BAN_MEMBERS")){
        message.channel.send(`**${message.author.tag}** นายท่านไม่มีสิทธ์ในการแบนนะคะ...//มอง`);
    }

    else{
        if(!member)
            return message.channel.send(`**${message.author.tag}** นายท่านต้องแท็กคนที่ต้องการแบนด้วยนะคะ...คิกๆ//แอบขำเบาๆ`);
        if(!member.bannable) 
            return message.channel.send(`**${message.author.tag}** หนูไม่มีสิทธิ์พอที่จะแบนผู้ใช้งานกรุณาให้สิทธิ์และปรับหนูให้อยู่สูงกว่าผู้ใช้...//ก้ม`);

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "ไม่พบเหตุผลที่ระบบค่ะ";

        member.ban(reason)
            .catch(error => message.channel.send(`ขอโทษค่ะคุณ ${message.author} หนูไม่สามารถแบนผู้ใช้ได้เนื่องจาก: ${error}`));
        message.channel.send(`${member.user.tag} ถูกแบนโดย ${message.author.tag} เพราะ: ${reason}`);
    }
}

exports.conf = { aliases: [] };