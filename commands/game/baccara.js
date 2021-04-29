const Discord = require(`discord.js`);
const random = require('random')
const seedrandom = require('seedrandom')
const { v4: uuidv4 } = require('uuid');
random.use(seedrandom(uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()+uuidv4()))
const list =  ["<:0:717954354413305928>","<:1:717954354165842033>","<:2:717954354434277426>","<:3:717954354354585650>","<:4:717954354434408448>","<:5:717954354467831848>","<:6:717954354459443220>","<:7:717954354510037012>","<:8:717954354488803398>","<:9:717954354568757278>"]
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.reply(`กรุณาใส่จำนวนเงินที่ลง เช่น ${prefix}baccara 10`);
    let amount = parseInt(args[0])
    if(!amount||amount<=0) return message.reply("กรุณาใส่จำนวนเงินไม่ถูกต้อง");
    //creaate embed
    let userdata = await bot.db.getuser(message.author.id)
    if(userdata.point<amount) return message.reply("คุณมีเงินไม่พอ ;-;");
    let embed = new Discord.MessageEmbed()
        .setAuthor(`Baccara Discord`, `https://cdn.pixabay.com/photo/2019/05/30/07/03/playing-cards-4239158_960_720.png`)
        .setDescription(`ไพ่ที่ยังไม่เปิด 
🅱️: XX 🇵: XX

**__กรุณากดเลือก Banker หรือ player โดยการกดอีโมจิ__**
🅱️ สำหรับ Banker 🇵 สำหรับ Player ❓ สำหรับ Draw`)
    
    //paramitor
    let author = message.author;
    let playerscore = [random.int(min = 0, max = 9),random.int(min = 0, max = 9)];
    let bankerscore = [random.int(min = 0, max = 9),random.int(min = 0, max = 9)];
    let player = numtoemo(playerscore);
    let banker = numtoemo(bankerscore);
    playerscore=playerscore[0]+playerscore[1]
    bankerscore=bankerscore[0]+bankerscore[1]
    if(playerscore >= 10) playerscore -=10;
    if(bankerscore >= 10) bankerscore -=10;
    message.channel.send(embed).then(async (msg) => {
        await msg.react(`🅱️`);
        await msg.react(`🇵`);
        msg.react(`❓`);
        const filter = (reaction, user) => ['🅱️', '🇵', '❓'].includes(reaction.emoji.name) && user.id === author.id;
        const collector = msg.createReactionCollector(filter, { max: 1, time: 10 * 1000 });
        collector.on('collect',async r => {
            msg.reactions.removeAll()
            if (r.emoji.name == '🅱️'||r.emoji.name == '🇵'||r.emoji.name=="❓") {
                userdata = await bot.db.getuser(message.author.id)
                if(userdata.point<amount) return message.reply("คุณมีเงินไม่พอ ;-;");
                bot.db.prepare(`UPDATE users SET point = ? WHERE id = ?`).run(userdata.point-amount,message.author.id)
                bot.db.addxp(message.author.id,amount/4,message)
                let side = r.emoji.name=='🅱️'?"BANKER":r.emoji.name=="🇵"?"PLAYER":"DRAW"
                if (bankerscore > playerscore) {
                    let text = `${message.author} ได้`
                    if(side=="BANKER"){
                        text = `${message.author} ได้ ${amount*1.9} <:coin:716555704990695434>`
                         win(1.9)
                    }
                    else {
                        text = `${message.author} เสีย ${amount} <:coin:716555704990695434>`
                    }
                    //banker win
                    msg.edit(new Discord.MessageEmbed()
                    .setAuthor(`BANKER WIN!`, `https://cdn.pixabay.com/photo/2019/05/30/07/03/playing-cards-4239158_960_720.png`)
                    .setDescription(`🅱️ เปิดไพ่: ${banker} คะแนน: ${bankerscore}\n🇵 เปิดไพ่: ${player} คะแนน: ${playerscore}\n${text}`)
                    .setFooter(`คุณ ${message.author.tag} ได้เลือกฝั่ง ${side}`)
                    .setColor(`#ff3535`))
                }else if (playerscore > bankerscore) {
                    if(side=="PLAYER"){
                        text = `${message.author} ได้ ${amount*1.9} <:coin:716555704990695434>`
                         win(1.9)
                    }
                    else {
                        text = `${message.author} เสีย ${amount} <:coin:716555704990695434>`
                    }
                    //player win
                    msg.edit(new Discord.MessageEmbed()
                    .setAuthor(`PLAYER WIN!`, `https://cdn.pixabay.com/photo/2019/05/30/07/03/playing-cards-4239158_960_720.png`)
                    .setDescription(`🅱️ เปิดไพ่: ${banker} คะแนน: ${bankerscore}\n🇵 เปิดไพ่: ${player} คะแนน: ${playerscore}\n${text}`)
                    .setFooter(`คุณ ${message.author.tag} ได้เลือกฝั่ง ${side}`)
                    .setColor(`#59c5ff`))
                }else{
                    if(side=="DRAW"){
                        text = `${message.author} ได้ ${amount*3} <:coin:716555704990695434>`
                         win(3)
                    }
                    else {
                        text = `${message.author} เสีย ${amount} <:coin:716555704990695434>`
                    }
                    msg.edit(new Discord.MessageEmbed()
                    .setAuthor(`DRAW`, `https://cdn.pixabay.com/photo/2019/05/30/07/03/playing-cards-4239158_960_720.png`)
                    .setDescription(`🅱️ เปิดไพ่: ${banker} คะแนน: ${bankerscore}\n🇵 เปิดไพ่: ${player} คะแนน: ${playerscore}\n${text}`)
                    .setFooter(`คุณ ${message.author.tag} ได้เลือกฝั่ง ${side}`)
                    .setColor(`#ffda50`))
                }
            }
        });
    })
    function win(rate) {
        bot.db.prepare(`UPDATE users SET point = ? WHERE id = ?`).run(userdata.point+amount*rate,message.author.id)
    }   
    function numtoemo(num) {
        let pai = ""
        for (let i = 0; i < num.length; i++) {
            pai += list[num[i]];
        }
        return pai
    }
}
exports.conf = { aliases: [] };
exports.help = {
    name: 'baccara'
}