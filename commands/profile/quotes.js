/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.reply(`กรุณาใส่คำคมเช่น ${prefix}quotes (คำคม)`);
    let update = await bot.db.prepare(`UPDATE users SET quotes = :quotes WHERE id = :id`).run({
        quotes : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`ตั้งคำคมของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setquotes"]
};