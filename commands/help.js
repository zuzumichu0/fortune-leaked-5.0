const Discord = require("discord.js");
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

let embed = new Discord.MessageEmbed()
.setImage(`https://cdn.discordapp.com/attachments/717494960898965536/724856089572802640/discord.png`)
.setTitle("Fortune command")
.setDescription("สวัสดีค่ะหนูฟอร์จูนเองน้าจำกันได้มั้ยเอ่ยถ้าอยากรู้หนูทำไรได้ก็สามารถกด **REACT** ปุ่มต่างๆเหล่านี้ได้เลยนะคะ")
.addField("ติดต่อผู้ดูแลระบบ 💭","``Discord`` https://discord.gg/KTmy5Dd\n``Website`` [Fortune.moe](https://fortune.moe)")

let embed_music = new Discord.MessageEmbed()
.setAuthor("คำสั่งเพลง 🎵")
.setDescription(`\`\`\`css\n${prefix}p <ชื่อเพลง|url> คำสั่งเล่นเพลง
${prefix}s คำสั่งข้ามเพลง
${prefix}q คำสั่งดูคิวเพลง
${prefix}np คำสั่งดูเพลงที่กำลังเล่นอยู่ในขณะนั้น
${prefix}loop เปิดการวนซํ้า
${prefix}remove <เพลงที่เท่าไหร่> ลบเพลงที่ระบุจากคิว
${prefix}pause หยุดเพลงชั่วคราว
${prefix}resume เล่นเพลงต่อ\`\`\``)

let embed_game = new Discord.MessageEmbed()
.setAuthor("คำสั่งมินิเกมส์ 🎮")
.setDescription("<:achievement:716859872578371625> การเล่นเกมส์ต่างๆจะช่วยเพิ่มเลเวลด้วยน้าา")
.addField("คำสั่งเกมส์ mmorpg",`\`\`\`css\n${prefix}fish สำหรับตกปลา
${prefix}mine สำหรับขุดแร่
${prefix}shop สำหรับเปิดร้านค้า
${prefix}inventory สำหรับดูช่องเก็บของ
${prefix}sell [ไอเท็ม] [จำนวน] สำหรับขายของในตัว\`\`\``)
.addField("คำสั่งเกมส์ roleplay",`\`\`\`css\n${prefix}rob สำหรับปล้นคนอื่น\`\`\``)
.addField("คำสั่งเกมส์จาก API ภายนอก", `\`\`\`css\n${prefix}akinator ให้หนูทายตัวละครในความคิดได้\`\`\``)
.addField("คำสั่งเกมส์การพนัน",`\`\`\`css\n${prefix}baccara (จำนวนเงินที่ลง) สำหรับเล่นบาร์คาร่า\`\`\``)
.addField("คำสั่งการเพิ่มเติม", `\`\`\`css\n${prefix}pay (แท็กผู้ใช้) (จำนวนเงิน)
${prefix}trade (แท็กผู้ใช้) (ชื่อไอเทม) (จำนวน) สำหรับส่งของ
${prefix}point สำหรับเช็คพอยต์ที่มี
\`\`\``)

let embed_board = new Discord.MessageEmbed()
.setAuthor("คำสั่งอันดับต่างๆ 📙")
.setDescription(`\`\`\`css\n${prefix}leaderboard ดูอันดับคนเลเวลเยอะที่สุด
${prefix}topmoney อันดับคนสะสมเงินเยอะที่สุด
${prefix}level (แท็กผู้ใช้) ดูเลเวลคนนั้นๆ\`\`\``)

let embed_normal = new Discord.MessageEmbed()
.setAuthor("คำสั่งทั่วไป 📚")
.setDescription(`\`\`\`css\n${prefix}profile สำหรับดูข้อมูลของตัวเอง
${prefix}waifu ค้นหาไวฟุ
${prefix}roblox (ชื่อในเกม) ค้นหาไอดี Roblox
${prefix}anime (ชื่ออนิเมะ) คำหาอนิเมะจาก 
${prefix}loli ค้นหาโลลิ
${prefix}loli nsfw ค้นหาโลลิเปลือย
${prefix}donate สำหรับเปิดหน้าโดเนท
${prefix}shake (แท็กผู้ใช้) เขย่าๆ
${prefix}ticket เปิดห้องส่วนตัว

${prefix}botstatus ดูข้อมูลบอท
${prefix}guild สำหรับดูข้อมูลกิล

${prefix}msg (แท็กผู้ใช้) (ข้อความ) ส่งข้อความ DM
${prefix}say (ข้อความ) บอทพิมพ์ตาม
${prefix}news (ข้อความ) ประกาศ\`\`\``)

let embed_profile = new Discord.MessageEmbed()
.setAuthor("คำสั่งตั้งค่าโปรไฟล์ 📝")
.setDescription(`\`\`\`css\n${prefix}profile สำหรับดูโปรไฟล์
${prefix}title (ฉายา) ตั้งฉายาตัวเอง
${prefix}class (คลาส) ตั้งคลาสตัวเอง
${prefix}name (ชื่อเล่น) ตั้งชื่อในโปรไฟล์
${prefix}gender (เพศ) ตั้งเพศ
${prefix}birthday (ปี-เดือน-วัน) ตั้งวันเกิด
${prefix}job (อาชีพ) ใส่อาชีพ
${prefix}status (สถานะ) ใส่สถานะ
${prefix}quotes (คำคม) ใส่คำคม\`\`\``)

let embed_admin = new Discord.MessageEmbed()
.setAuthor("คำสั่งแอดมินเซิร์ฟ 📊")
.setDescription(`\`\`\`css\n${prefix}rrole (แท็กผู้ใช้) (แท็กยศ) สำหรับลบยศคนอื่น
${prefix}arole (แท็กผู้ใช้) (แท็กยศ) สำหรับเพิ่มยศคนอื่น
${prefix}kick (แท็กผู้ใช้) (เหตุผล) สำหรับเตะผู้ใช้
${prefix}ban (แท็กผู้ใช้) (เหตุผล) สำหรับแบนผู้ใช้
${prefix}clear (จำนวนข้อความ) ลบข้อความจำนวนมาก\`\`\``)

let embed_emotion = new Discord.MessageEmbed()
.setAuthor("คำสั่งท่าทางต่างๆ ❤️")
.setDescription(`\`\`\`css\n${prefix}bite กัด
${prefix}eat (แท็กผู้ใช้) กิน
${prefix}hug (แท็กผู้ใช้) กอด
${prefix}kiss (แท็กผู้ใช้) จูบ
${prefix}pathat (แท็กผู้ใช้) ลูบหัว
${prefix}run (แท็กผู้ใช้) วิ่งหนี
${prefix}see (แท็กผู้ใช้) มอง
${prefix}sleep (แท็กผู้ใช้) นอนหลับ\`\`\``)

/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
**/
exports.run = async(bot, message, args) => {
  let author = message.author;
  let msg;
  if(await message.channel.permissionsFor(message.member).has("ADD_REACTIONS")){
  msg = message.channel.send(embed.setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color));
  }else{
    message.channel.send("หนูส่งคำสั่งไปส่วนตัวแล้วนนะคะ")
    msg = message.author.send(embed.setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color));
  }
  
  msg.then(async (msg) => {
      await msg.react('🏠');
      await msg.react('📚');
      await msg.react('❤️');
      await msg.react('📝');
      await msg.react('🔉');
      await msg.react('🎮');
      await msg.react('📙');
      msg.react('📊');
  })
  msg = await msg
  const filter = (reaction, user) => ['🏠','📚','❤️','📝','🔉','🎮','📙','📊'].includes(reaction.emoji.name) && user.id === author.id;
  const collector = await msg.createReactionCollector(filter, { time: 1000*60*60 });
  collector.on('collect',async r => {
    let user = r.users.cache.last()
    user.id!=bot.user.id&&r.users.remove(user);
    let embedtosend;
      if (r.emoji.name === '🏠') {
        embedtosend = embed
      }
      if (r.emoji.name === '📚') {
        embedtosend = embed_normal
      }
      if (r.emoji.name === '❤️') {
        embedtosend = embed_emotion
      }
      if (r.emoji.name === '📝'){
        embedtosend = embed_profile
      }
      if (r.emoji.name === '🔉') {
        embedtosend = embed_music
      }
      if (r.emoji.name === '🎮') {
        embedtosend = embed_game
      }
      if (r.emoji.name === '📙') {
        embedtosend =embed_board
      }
      if (r.emoji.name === '📊') {
        embedtosend =embed_admin
      }
      embedtosend.setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)
      msg.edit(embedtosend);
  });
  collector.on('end', ()=>{if(msg) msg.reactions.removeAll()});
};
exports.conf = { aliases: ["h"] };