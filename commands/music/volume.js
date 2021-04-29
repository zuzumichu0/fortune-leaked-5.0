/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
	return message.channel.send('ฟังชั่นปรับเสียงถูกปิดใช้งาน!');
	
	/*if (!message.member.voiceChannel) return message.channel.send('นายท่านไม่ได้อยู่ในห้องคุย!');
	let serverQueue = bot.music.serverQueue.get(message.guild.id);
	if(serverQueue){
		if(message.guild.me.voiceChannel.id!=message.member.voiceChannel.id) return message.channel.send('นายท่านต้องอยู่ในห้องเดียวกับบอท');
	   }else return message.channel.send('ไม่มีเพลงที่เล่นอยู่');
	if(args.length){
	let v;
	if(args[0]>10) v = 10;
	else if(args[0]<0) v = 0;
	else v = args[0];
	serverQueue.volume = v;
	serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	}
		let msg = await message.channel.send(`ระดับเสียงในตอนนี้คือ **${serverQueue.volume}**`);
		await msg.react("⏪")
		msg.react("⏭")
		const react = msg.createReactionCollector((reaction, user) => (["⏪","⏭"].includes(reaction.emoji.name)&&user.id!=bot.user.id&&serverQueue.voiceChannel.id==message.member.voiceChannel.id,{ time: 1000*60*2 }))
		react.on('end',()=>{msg.clearReactions();})
		react.on('collect',async collected => {
			collected.remove(collected.users.last());
			if(!serverQueue){
				msg.edit("ไม่มีเพลงที่เล่นอยู่ในขณะนี้")
				react.stop();
			}
			if (collected.emoji.name === "⏭") {
				if(serverQueue.volume==10) return;
				serverQueue.volume++;
			}
			if (collected.emoji.name === "⏪") {
				if(serverQueue.volume==0) return;
				serverQueue.volume--;
			}
			msg = await msg.edit(`ระดับเสียงในตอนนี้คือ **${serverQueue.volume}**`);
			serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		})
	return;*/
}
exports.conf = { aliases: ["v"] };