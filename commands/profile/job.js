/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.reply(`กรุณาใส่อาชีพเช่น ${prefix}job (อาชีพ)`);
    let update = await bot.db.prepare(`UPDATE users SET job = :job WHERE id = :id`).run({
        job : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`ตั้งอาชีพของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setjob"]
};