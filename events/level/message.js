const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 */
module.exports = async (bot,message)=>{
    if(message.author.bot||!message.guild){ return await false; }
	if(message.content.startsWith(prefix)) return false;
    //if(message.guild.memberCount<=40) return await false;
    let user = await bot.db.getuser(message.author.id)
    user.message++
    bot.db.prepare(`UPDATE users SET message = ? WHERE id = ?`).run(user.message,user.id)
}