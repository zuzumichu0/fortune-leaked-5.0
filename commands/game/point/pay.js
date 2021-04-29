const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
		let target = message.mentions.users.first();
		if(target&&!args[1]) return message.reply(`กรุณาใส่จำนวนเงินเช่น ${message.content} 5`);
		if(!target||!parseInt(args[1])) return message.reply("คำสั่งไม่ถูกต้อง");
		let amount = parseInt(args[1]);
		let embed = new Discord.MessageEmbed()
		.setAuthor("Peeding","http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-warning-icon.png")
		.setDescription(`${message.author} แน่ใจหรือไม่ที่จะโอน ${config.econame} จำนวน \`${amount}\` coins ให้ ${target}`)
		.setColor("#ffae42");
		let msg = await message.channel.send(embed);
		await msg.react("✅");
		msg.react("❌");
		const react = msg.createReactionCollector((reaction, user) => (["✅","❌"].includes(reaction.emoji.name)&&user != bot.user&&message.author.id==user.id), { time: 1000*30 })
		react.on('collect',async collected => {
			msg.reactions.removeAll();
			if(collected.emoji.name === "✅"){
				await bot.db.paypoint(message.author.id,target.id,args[1]).then(async(ispay)=>{
					if(ispay){
						embed.setAuthor("Success","https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png")
						.setDescription(`${message.author} ได้โอน ${config.econame} จำนวน \`${amount}\` coins ให้ ${target}`)
						.setColor("#22bb33");
						await msg.edit(embed);
					}
				}).catch(async(reason)=>{
					embed.setAuthor("Failed","http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
					.setDescription(`${message.author} ไม่สามารถโอน ${config.econame} ได้เนื่องจาก ${reason}`)
					.setColor("#ff0000");
					await msg.edit(embed);
				})
			react.stop();
			}
			if (collected.emoji.name === "❌") {
				embed.setAuthor("Canceled","http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
				.setDescription(`${message.author} ยกเลิกการทำรายการ ❌`)
				.setColor("#ff0000");
				await msg.edit(embed);
				react.stop();
			}})
}
exports.conf = { aliases: [] };