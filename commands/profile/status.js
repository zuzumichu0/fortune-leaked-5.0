/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.reply(`กรุณาใส่สถานะเช่น ${prefix}status (สถานะ)`);
    let update = await bot.db.prepare(`UPDATE users SET status = :status WHERE id = :id`).run({
        status : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`ตั้งสถานะของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setstatus"]
};