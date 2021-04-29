/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.reply(`กรุณาใส่เพศเช่น ${prefix}gender (เพศ)`);
    let update = await bot.db.prepare(`UPDATE users SET gender = :gender WHERE id = :id`).run({
        gender : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`ตั้งเพศของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setgender"]
};