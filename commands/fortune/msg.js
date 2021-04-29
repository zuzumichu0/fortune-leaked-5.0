/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
module.exports.run = (bot, message, args) => {
  let usertext = message.guild.member(message.mentions.users.first());
  if (!message.member.hasPermission("SEND_MESSAGES")) {
    message.channel.send(`**${message.author.tag}** นายท่านไม่มีสิทธ์ในการใช้คำสั่งนะคะ...//มอง`);
  }
  let text = args.slice(1).join(' ');
  if (!usertext) {
    if (!text) {
      message.delete()
      message.channel.send(`**${message.author.tag}** นายท่านต้องแท็กคนที่ต้องการส่งด้วยนะคะ...//มอง`).then((msg) => {
        msg.delete(5000);
      });
    }
    return;
  }
  if (!text) {
    message.delete()
    message.channel.send(`**${message.author.tag}** กรุณาใส่คำที่จะส่งด้วยนะคะ...//มอง`).then((msg) => {
      msg.delete(5000);
    });
    console.log('bot: error no text in chat')
  }

  if (usertext) {
    if (text) {
      message.delete()
      message.channel.send(`${message.author} หนูกำลังส่งข้อความค่ะ :incoming_envelope:`)
      usertext.send(`:envelope_with_arrow: ${message.author.tag} ส่งข้อความมาว่า: ` + `${text}`)
        .catch(error => message.channel.send(`ขอโทษค่ะคุณ ${message.author} หนูไม่สามารถส่งข้อความถึงผู้ใช้ได้เนื่องจาก: ผู้ใช้งานได้ปิดการส่งข้อความจากคนแปลกหน้า`))
    }
  }
}
exports.conf = {
  aliases: []
};