/**
*
*
* @param {import("discord.js").Client} bot
* @param {import("discord.js").Message} message
* @param {String[]} args
*/
exports.run = async(bot, message, args) =>{
    const deleteCount = parseInt(args[0]);
    message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
          message.channel.send(`**${message.author.tag}** นายท่านไม่มีสิทธิ์ในการลบนะคะ...คิกๆ//ขำเบาๆ`).then((msg)=>{
            msg.delete(5000);
            });
        }else{        
          
          if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.channel.send(`**${message.author.tag}** นายท่านต้องพิมพ์ ${prefix}clear ตามด้วยจำนวนการลบตั้งแต่ 2 ขึ้นไปนะคะแต่ห้ามเกิน 100 นะคะ...//ก้ม`)
          
          const fetched = await message.channel.fetch({limit: deleteCount});
          message.channel.bulkDelete(deleteCount).catch(error => message.reply(`**${message.author.tag}** หนูไม่สามารถลบข้อความเนื่องจาก: ${error}`)).then((msg)=>{
            msg.delete(5000);
            });
        }
}

exports.conf = { aliases: ["clearmsg"] };