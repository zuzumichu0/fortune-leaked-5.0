const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    let userdata = await bot.db.getuser(message.author.id)
    if (!args[0]) return message.reply(`กรุณาระบุประเภทของที่จะขาย(fish|mine|all)หรือจะใช้ไอดีหรือชื่อสิ่งของนั้นๆก็ได้ เช่น \`${prefix}sell fish\` \`${prefix}sell ถ่าน [จำนวน]\``)
    let type = args[0]
    let amount = args[1]
    if (userdata.backpackinventory.length <= 0) {
        return message.reply("คุณไม่มีสื่งของอยู่ในกระเป๋าของคุณ")
    }
    let income = 0;
    let totals = 0;
    let text = "";
    let count = {}
    let itemid = parseInt(await bot.item.findkey(type));
    if (itemid) {
        let item = bot.item[itemid];
        if (!item) return message.reply(`ไม่เจอไอเท็มที่ใช้ไอดีนี้`);
        let userhasitem = userdata.backpackinventory.filter(id => id == itemid);
        if (userhasitem <= 0) return message.reply(`คุณไม่มีไอเท็ม ${item.emoji} ${item.name} อยู่ในตัวคุณ`);
        if(!amount) amount = userhasitem;
        if (userhasitem.length < amount) return message.reply(`คุณมีไอเท็ม ${item.emoji} ${item.name} แค่ \`${userhasitem.length}\` อันอยู่ในตัวคุณ`);
        for (let i = 0; i < amount; i++) {
            let index = userdata.backpackinventory.indexOf(itemid);
            if (index !== -1) {
                if (!count[userdata.backpackinventory[i]]) count[userdata.backpackinventory[i]] = 0
                count[userdata.backpackinventory[i]]++;
                userdata.backpackinventory.splice(index, 1);
            } else {
                continue;
            }
        }
    } else {
        let inventorytemp = userdata.backpackinventory.slice();
        for  (let i = 0; i < inventorytemp.length; i++) {
            if (type == "all" || bot.item[inventorytemp[i]].type == type) {
            let index = userdata.backpackinventory.indexOf(inventorytemp[i]);
                if (index !== -1) {
                    if (!count[inventorytemp[i]]) count[inventorytemp[i]] = 0
                    count[inventorytemp[i]]++;
                    userdata.backpackinventory.splice(index, 1);
                } else {
                    continue;
                }
            }
        }
    }
    for (const id in count) {
        if (count.hasOwnProperty(id)) {
            text += `- ${count[id]} ${bot.item[id].emoji} ${bot.item[id].name}\n`
            income += bot.item[id].price*count[id]
            totals += count[id]
        }
    }
    if(totals==0) return message.reply(`ไม่เจอไอเท็มที่ต้องการขาย`)
    message.channel.send(new Discord.MessageEmbed()
        .addField("<a:money_gif:658690682675789824> ขาย!", `คุณขายของทั้งหมด **${totals}** อัน:
${text}
และได้ ${income} <:coin:716555704990695434>
รวม ${userdata.point+income} <:coin:716555704990695434>`)
        .setColor(config.color)
        .setAuthor(message.author.tag)
    )
    bot.db.addxp(message.author.id, income, message)
    bot.db.prepare(`UPDATE users SET backpackinventory = :backpackinventory , point = :point WHERE id = :id`).run({
        backpackinventory: JSON.stringify(userdata.backpackinventory),
        point: userdata.point + income,
        id: message.author.id
    })
}
exports.conf = {
    aliases: ["f"],
    delay: 10000
};