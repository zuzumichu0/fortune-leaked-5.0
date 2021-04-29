const translate = require("@k3rn31p4nic/google-translate-api");
const Discord = require("discord.js");
const { Aki } = require('aki-api');
const tunnel = require('tunnel');
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {[String]} args
 */
exports.run = async (bot, message, args) => {
    let msg = await message.channel.send(new Discord.MessageEmbed()
    .setAuthor("Akinator")
    .addField(`เดาตัวละคร 👥`,`ลองนึกถึงตัวละครที่มีอยู่จริงหรือตัวละครที่อยู่ในเกมส์หรือหนังเรื่องใดก็ได้หนูจะพยายามเดาว่าเป็นใคร`)
    .addField(`เดาสิ่งของ ⚙️`,`ลองนึกถึงสิ่งของที่มีอยู่จริงหนูจะพยายามเดาว่าเป็นสิ่งของแบบใหน`)
    .setColor(config.color))
    await msg.react("👥")
    await msg.react("⚙️")
    msg.react("❌")
    let region = 'en';
    const filter = (reaction, user) => ['👥','⚙️','❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = await msg.createReactionCollector(filter, {max:1, time: 1000*60*60 });
    collector.on('collect',async r => {
            if(r.emoji.name === '👥') region = 'en';
            if(r.emoji.name === '⚙️') region = 'en_objects';
          if (r.emoji.name === '👥'||r.emoji.name === '⚙️') {
            msg.reactions.removeAll()
            const aki = new Aki(region);
            msg.edit(new Discord.MessageEmbed()
            .setAuthor("กำลังเริ่มเกมส์","https://cdn.discordapp.com/attachments/700682902459121695/709605085386113114/8104LoadingEmote.gif")
            .setColor(config.color))
            await aki.start();
            let q = 1
            let usetrans = true;
            let trans = aki.question
            if(region=="en_objects"){
            try {
                trans = (await translate(aki.question, { from: 'en', to: 'th' })).text
            } catch (error) {
                trans = aki.question
                usetrans = false
            }}
            msg.edit(new Discord.MessageEmbed()
            .setAuthor(trans)
            .setDescription("✅ ใช่\n☑️ อาจจะใช่\n❓ ไม่รู้\n🇽 อาจจะไม่\n❌ ไม่")
            .setColor(config.color)
            .setFooter(`คำถามที่ ${q} ความเป็นไปได้ ${aki.progress}`))
            await msg.react("✅")
            await msg.react("☑️")
            await msg.react("❓")
            await msg.react("🇽")
            msg.react("❌")
            const filter1 = (reaction, user) => ["✅","☑️","❓","🇽","❌"].includes(reaction.emoji.name) && user.id === message.author.id;
            const collector1 = await msg.createReactionCollector(filter1, {time: 1000*60*60 });
            collector1.on('collect',async r => {
                let user = r.users.cache.last()
                user.id!=bot.user.id&&r.users.remove(user);
                if(r.emoji.name==="✅") game(0)
                if(r.emoji.name==="☑️") game(3)
                if(r.emoji.name==="❓") game(2)
                if(r.emoji.name==="🇽") game(4)
                if(r.emoji.name==="❌") game(1)
                async function game(answer) {
                    q++;
                    await aki.step(answer);
                    if (aki.progress >= 70 || aki.currentStep >= 78|| q>=100) {
                        collector1.stop()
                        await aki.win();
                        if(aki.answers[0]){
                        msg.edit(new Discord.MessageEmbed()
                        .setAuthor("หนูนึกออกแล้ว")
                        .setTitle(aki.answers[0].name)
                        .setDescription(aki.answers[0].description)
                        .setImage(aki.answers[0].absolute_picture_path)
                        .setColor(config.color))}
                        console.log('firstGuess:', aki.answers);
                        console.log('guessCount:', aki.guessCount);
                        bot.db.addxp(message.author.id,q,message)
                    }else{
                        let trans = aki.question
                        if(region=="en_objects"&&usetrans){
                            try {
                                trans = (await translate(aki.question, { from: 'en', to: 'th' })).text
                            } catch (error) {
                                usetrans = false
                            }
                        }
                        msg.edit(new Discord.MessageEmbed()
                        .setAuthor(trans)
                        .setDescription("✅ ใช่\n☑️ อาจจะใช่\n❓ ไม่รู้\n🇽 อาจจะไม่\n❌ ไม่")
                        .setColor(config.color).setFooter(`คำถามที่ ${q} ความเป็นไปได้ ${aki.progress}%`))
                    }
                }
            })
            collector1.on('end', ()=>{if(msg) msg.reactions.removeAll()});
          }
          if (r.emoji.name === '❌') {
              message.delete()
            msg.delete()
          }
      });
      collector.on('end', ()=>{if(msg) msg.reactions.removeAll()});
}