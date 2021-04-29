/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
	if(!message.member.voice) return message.channel.send('นายท่านไม่ได้อยู่ในห้องคุย!');
	if(!bot.music.hasguild(message.guild.id))return message.channel.send('ไม่มีเพลงที่กำลังเล่นอยู่ค่ะ');
	bot.music.send(message.guild.id,"pause",{
		textChannel:message.channel.id,
		voiceChannel:message.member.voice.channelID
	})
}
exports.conf = { aliases: ["p"] };