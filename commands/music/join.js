/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
	if(!message.member.voice) return message.channel.send('นายท่านไม่ได้อยู่ในห้องคุย!');
	bot.music.send(message.guild.id,"join",{
        textChannel:message.channel.id,
        voiceChannel:message.member.voice.channelID
	})
}