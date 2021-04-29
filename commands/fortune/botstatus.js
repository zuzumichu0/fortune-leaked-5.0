const Discord = require('discord.js');
let days = 0;
let week = 0;
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    let start = Date.now();
    let API = Date.now() - message.createdTimestamp
    message.channel.send(new Discord.MessageEmbed().setAuthor('กำลังโหลดข้อมูล... ').setColor(config.color)).then(msg => {
        let diff = (Date.now() - start);
        let uptime = ``;
        let totalSeconds = (bot.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        if (hours > 23) {
            days = days + 1;
            hours = 0;
        }

        if (days == 7) {
            days = 0;
            week = week + 1;
        }

        if (week > 0) {
            uptime += `${week} สัปดาห์, `;
        }

        if (minutes > 60) {
            minutes = 0;
        }

        uptime += `${days} วัน, ${hours} ชั่วโมง, ${minutes} นาที, ${seconds} วินาที`;

        let serverembed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Fortune#3986`, bot.user.displayAvatarURL())
            .setImage(`https://cdn.discordapp.com/attachments/619019220965130241/628613987453632563/wallpaper.png`) //https://cdn.discordapp.com/attachments/619019220965130241/627499836094021703/tumblr_oxim39hMsE1ta7pubo1_540.gif
            .addField(`ผู้สร้าง`, `AkenoSann#4284,\_Chelos\_#5047`, true)
            .addField(`เวอร์ชั่น`, `${config.version}`, true)
            .addField(`ไอดีบอท`, `618441438564188196`, true)
            .addField(`ข้อมูล`, `Fortunecord.js`, true)
            .addField(`เซิฟเวอร์ที่ทำงาน`, `${bot.guilds.cache.size}`, true)
            .addField(`เซิฟเวอร์ที่เปิดเพลงอยู่`, `${bot.music.manage.size} เซิฟ`, true)
            .addField(`ระบบควบคุมเพลง`, `${bot.music.node.size} ระบบ`, true)
            .addField(`ผู้ใช้ที่พบ`, `${bot.users.cache.size}`, true)
            .addField("ค่าความหน่วงของบอท", `${diff}ms`, true)
            .addField("ค่าความหน่วงส่วนเสริม", `${API}ms`, true)
            .addField(`ลิ้งเชิญ`, `[กดเพื่อเชิญบอท](https://discordapp.com/oauth2/authorize?client_id=618441438564188196&scope=bot&permissions=2146958719)`, true)
            .setFooter(`อัพเดทล่าสุดเมื่อ: ${uptime} ที่แล้ว`);
        msg.edit(serverembed);
    })
}
exports.conf = {
    aliases: ["botinfo"]
};