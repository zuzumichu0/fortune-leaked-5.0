const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
	if(!bot.music.hasguild(message.guild.id))return message.channel.send('ไม่มีเพลงที่กำลังเล่นอยู่ค่ะ');
	bot.music.send(message.guild.id,"queue",{
		textChannel:message.channel.id,
		user:{id:message.author.id}
	})
}
exports.conf = { aliases: ["q"] };