const Discord = require('discord.js')
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
    let targetid = await bot.getid(args[0])

    if (!targetid) return message.channel.send(config.warn_tagnotfound);
    if (targetid == message.author.id) return message.channel.send(config.warn_tagyoursalf);
    let target = await bot.db.getuser(targetid);
    let userdata = await bot.db.getuser(message.author);
    if (target.point <= 100) return message.channel.send(`:x: อย่าไปปล้นเค้าเลยแม้แต่ค่าขนมยังไม่มีซื้อ`);
    if (userdata.point <= 100) return message.channel.send(`:x: เครดิตคุณไม่ถึงขั้นตํ่า`);
    let msg = await message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`กำลังทำการแอบขโมยเครดิต...`)
        .setDescription(`__**คำเตือน**__
กรุณาเลือกฐานข้อมูลที่ถูกต้องหากเลือกผิดจะเสียเครดิต
ครึ่งหนึ่งของเครดิตที่มีหากเลือกถูกจะได้รับเครดิตทันที
กรุณาเลือก 1️⃣ หรือ 2️⃣`))
    let stealamount = Math.floor(target.point * 0.05)

    await msg.react(`1️⃣`);
    msg.react(`2️⃣`);
    const filter = (reaction, user) => ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = msg.createReactionCollector(filter, {
        max: 1,
        time: 30 * 1000
    });
    
    let targetuser = bot.users.cache.get(targetid);
    collector.on('collect', async r => {
        target = await bot.db.getuser(targetid);
        userdata = await bot.db.getuser(message.author)
        msg.reactions.removeAll()
        let select = r.emoji.name == '1️⃣' ? 1 : 2

        if (Math.floor(Math.random() * 2) + 1 == select) {
        let index = target.backpackinventory.indexOf(10);
        console.log(target.backpackinventory,index)
            if (index !== -1) {
                target.backpackinventory.splice(index, 1);
                
                msg.edit(new Discord.MessageEmbed()
                    .setDescription(`${message.author} ไม่สามารถขโมยเครดิตของ ${targetuser} เนื่องจาก ${targetuser} มี ${bot.item[10].name}`)
                    .setColor(config.colorfail)
                    .setFooter(`ทำการแอบขโมยเครดิตเวลา`)
                    .setTimestamp())
                targetuser.send(new Discord.MessageEmbed()
                    .setDescription(`${message.author} พยายามขโมยเงินของคุณแต่คุณมี ${bot.item[10].name} เขาจืงไม่สามารถขโมยได้`)
                    .setColor(config.colorsuccess)
                    .setFooter(`ทำการแอบขโมยเครดิตเวลา`)
                    .setTimestamp())
                bot.db.prepare(`UPDATE users SET backpackinventory = :backpackinventory WHERE id = :id`).run({
                    backpackinventory: JSON.stringify(target.backpackinventory),
                    id: target.id
                })
            } else {
                
                msg.edit(new Discord.MessageEmbed()
                    .setDescription(`${message.author} ได้แอบขโมยเครดิตจาก ${targetuser} จำนวน ${stealamount} <:coin:716555704990695434>`)
                    .setColor(config.colorsuccess)
                    .setFooter(`ทำการแอบขโมยเครดิตเวลา`)
                    .setTimestamp())
                targetuser.send(new Discord.MessageEmbed()
                .setDescription(`${message.author} ได้แอบขโมยเครดิตของคุณจำนวน ${stealamount} <:coin:716555704990695434>`)
                .setColor(config.colorfail)
                .setFooter(`ทำการแอบขโมยเครดิตเวลา`)
                .setTimestamp())
                bot.db.setpoint(userdata.id,userdata.point+stealamount,true).then(()=>{})
                bot.db.setpoint(target.id,target.point-stealamount,true).then(()=>{})
            }
        } else {
            if(userdata.point<stealamount) stealamount = userdata.point
            msg.edit(new Discord.MessageEmbed()
                .setDescription(`:x: การแอบขโมยเครดิตล้มเหลว`)
                .setColor(config.colorfail)
                .setFooter(`คุณโดนต่อยกลับและโดนขโมยจำนวน ${stealamount} เครดิต`))
            targetuser.send(new Discord.MessageEmbed()  
                .setDescription(`${message.author} พยายามขโมยเงินของคุณแต่คุณได้ต่อยกลับและขโมยเงินของ ${message.author} จำนวน ${stealamount} <:coin:716555704990695434>`)
                .setColor(config.colorsuccess)
                .setFooter(`ทำการแอบขโมยเครดิตเวลา`)
                .setTimestamp())
                bot.db.setpoint(userdata.id,userdata.point-stealamount,true).then(()=>{})
                bot.db.setpoint(target.id,target.point+stealamount,true).then(()=>{})
        }
    })
}
exports.conf = {
    aliases: [],
    delay: 30000
};