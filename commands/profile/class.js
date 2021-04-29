/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.reply(`กรุณาใส่คลาสเช่น ${prefix}class (คลาส)`);
    let update = await bot.db.prepare(`UPDATE users SET class = :class WHERE id = :id`).run({
        class : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`ตั้งคลาสของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setclass"]
};