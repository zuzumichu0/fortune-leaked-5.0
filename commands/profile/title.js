/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.reply(`กรุณาใส่ฉายาเช่น ${prefix}title (ฉายา)`);
    let update = await bot.db.prepare(`UPDATE users SET title = :title WHERE id = :id`).run({
        title : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`ตั้งฉายาของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["settitle"]
};