const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    if (!args.length) return message.reply(`โอนไอเท็มให้คนอื่นตัวอย่าง ${config.prefix}trade ${message.author} [ไอดีไอเท็มหรือชื่อไอเท็ม] [จำนวน]`);
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(config.warn_tagnotfound);
    if (target == message.author) return message.channel.send(config.warn_tagyoursalf);
    if (target && !args[1]) return message.reply(`กรุณาใส่ไอดีไอเท็มเช่น ${message.content} **5** 2`);
    if (!args[2]) return message.reply(`กรุณาใส่จำนวนไอเท็มเช่น ${message.content} **2**`);
    if (!target || !args[1] || !parseInt(args[2])) return message.reply("คำสั่งไม่ถูกต้อง");
    let itemid;
    if (!parseInt(args[1])) {
        itemid = await bot.item.findkey(args[1]);
    } else {
        itemid = parseInt(args[1]);
    }
    let item = bot.item[itemid]
    if (!item) return message.reply(`ไม่เจอไอเท็มที่ใช้ไอดีนี้`);
    let userdata = await bot.db.getuser(message.author)
    let userhasitem = userdata.backpackinventory.filter(id => id == itemid);
    if (userhasitem<=0) return message.reply(`คุณไม่มีไอเท็ม ${item.emoji} ${item.name} อยู่ในตัวคุณ`);
    let amount = parseInt(args[2]);
    if (userhasitem.length < amount) return message.reply(`คุณมีไอเท็ม ${item.emoji} ${item.name} แค่ \`${userhasitem.length}\` อันอยู่ในตัวคุณ`);
    let embed = new Discord.MessageEmbed()
        .setAuthor("Peeding", "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-warning-icon.png")
        .setDescription(`${message.author} แน่ใจหรือไม่ที่จะโอนไอเท็ม ${item.emoji} ${item.name} จำนวน \`${amount}\` ให้ ${target}`)
        .setColor("#ffae42");
    let msg = await message.channel.send(embed);
    await msg.react("✅");
    msg.react("❌");
    const react = msg.createReactionCollector((reaction, user) => (["✅", "❌"].includes(reaction.emoji.name) && user != bot.user && message.author.id == user.id), {
        time: 1000 * 30
    })
    react.on('collect', async collected => {
        msg.reactions.removeAll();
        if (collected.emoji.name === "✅") {
            await bot.db.tradeitem(message.author.id, target.id, itemid, amount).then(async (ispay) => {
                if (ispay) {
                    embed.setAuthor("Success", "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png")
                        .setDescription(`${message.author} ได้โอน ${item.emoji} ${item.name} จำนวน \`${amount}\` ให้ ${target}`)
                        .setColor("#22bb33");
                    await msg.edit(embed);
                }
            }).catch(async (reason) => {
                embed.setAuthor("Failed", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
                    .setDescription(`${message.author} ไม่สามารถโอน ${item.emoji} ${item.name} ได้เนื่องจาก ${reason}`)
                    .setColor("#ff0000");
                await msg.edit(embed);
            })
            react.stop();
        }
        if (collected.emoji.name === "❌") {
            embed.setAuthor("Canceled", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
                .setDescription(`${message.author} ยกเลิกการทำรายการ ❌`)
                .setColor("#ff0000");
            await msg.edit(embed);
            react.stop();
        }
    })
}
exports.conf = {
    aliases: []
};