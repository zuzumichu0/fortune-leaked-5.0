const Discord = require("discord.js");
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {[String]} args
 */
exports.run = async (bot, message, args) => {
    message.delete();
    
    message.channel.send(new Discord.MessageEmbed()
    .setAuthor(`${message.member.displayName} ได้สร้างห้องติดต่อ`, `${message.author.displayAvatarURL()}`)
    .setColor(config.color))
    
    let private = new Discord.MessageEmbed()
    .setAuthor(`📝 ห้องติดต่อส่วนตัว TICKET v5`)
    .setDescription(`หากทำการใช้งานเสร็จให้พิมพ์ __**${prefix}close**__
หากพบข้อผิดพลาดโปรดติดต่อ [Support Fortune](https://fortune.moe)`)
    .setColor(config.color)

    let category = message.guild.channels.cache.find(c => c.name.match(/ticket/i) && c.type == "category");
    if (!category) category = await message.guild.channels.create("ticket", {type: "category"})
    let channel = message.guild.channels.cache.find(c => c.name == `${message.author.id}` && c.type == "text");
    if (!channel) channel = await message.guild.channels.create(`${message.author.id}`, {
        type: "text",
            topic: `ห้องติดต่อของคุณ **${message.author.username}**`,
            permissionOverwrites: [{
                    id: message.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: message.author.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_CHANNELS", "ATTACH_FILES", "EMBED_LINKS"]
                }
            ]
        })
        .then(channel => {
            channel.send(private)
            channel.setParent(category);
        });
}
exports.conf = {aliases: []};