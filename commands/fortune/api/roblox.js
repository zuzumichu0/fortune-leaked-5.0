const discord = require("discord.js");
const roblox = require("noblox.js");
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
  let username = args[0]
  if (username) {
    roblox.getIdFromUsername(username).then(id => {
      if (id) {
        roblox.getPlayerInfo(parseInt(id)).then(function (info) {
          let embed = new discord.MessageEmbed()

            .setColor("#f9ae00")
            .setTimestamp()
            .setImage(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
            .setTitle(`ข้อมูลผู้เล่น Player เบื้องต้น`)
            .addField("ชื่อผู้ใช้", info.username || 'ผิดพลาด', true)
            .addField("เลขไอดี", id || 'ผิดพลาด', true)
            .addField("อายุของไอดี", `${info.age} วัน` || 'ผิดพลาด', true)
            .addField("ไอดีของผู้เล่น", `[กดที่นี่เพื่อดูข้อมูล](https://roblox.com/users/${id}/profile)`, true)
            .setColor(`#0099ff`)
          message.channel.send({
            embed
          })
        })
      }

    }).catch(function (err) {
      message.channel.send("ไม่พบผู้เล่นค่ะกรุณาสะกดให้ถูกด้วยนะคะ")
    });
  } else {
    message.channel.send("กรุณาใส่ชื่อในเกมส์ด้วยค่ะ")
  }
}

exports.conf = {
  aliases: []
};