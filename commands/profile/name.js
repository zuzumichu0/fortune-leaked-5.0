/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.reply(`กรุณาใส่ชื่อเล่นเช่น ${prefix}name (ชื่อเล่น)`);
    let update = await bot.db.prepare(`UPDATE users SET name = :name WHERE id = :id`).run({
        name : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`ตั้งชื่อเล่นของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setname"]
};