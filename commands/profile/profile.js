const Discord = require('discord.js');
const Canvas = require('canvas')
const opentype = require("opentype.js")
const drawText = require("node-canvas-text").default
const moment = require('moment');
// Load OpenType fonts from files
let LamoonBoldFont = opentype.loadSync(appRoot + '/fonts/FCLamoonBold.ttf');
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let userdata = await bot.db.getuser(member.id)
    const canvas = Canvas.createCanvas(1080, 2000);
    let exptop = bot.db.prepare(`SELECT * FROM users ORDER BY totalsexp DESC`).all();
    let cointop = bot.db.prepare(`SELECT * FROM users ORDER BY point DESC`).all();
    const ctx = canvas.getContext('2d');
    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage(appRoot + '/images/profile.png');
    const avatar = Canvas.loadImage(member.user.displayAvatarURL().replace(/(?<=)\.\w{0,5}$/,""));
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    let levelRect = {
        x: 381,
        y: 171,
        width: 151,
        height: 48
    };
    let usernameRect = {
        x: 381,
        y: 106,
        width: 490,
        height: 61
    };
    let expRect = {
        x: 395,
        y: 232,
        width: 324,
        height: 44
    };
    let nicknameRect = {
        x: 182,
        y: 489,
        width: 584,
        height: 51
    };
    let titleRect = {
        x: 182,
        y: 489+76,
        width: 584,
        height: 51
    };
    let genderRect = {
        x: 182,
        y: 489+(76*2),
        width: 584,
        height: 51
    };
    let birthdayRect = {
        x: 182,
        y: 489+(76*3),
        width: 584,
        height: 51
    };
    let classRect = {
        x: 182,
        y: 489+(76*4),
        width: 584,
        height: 51
    };
    let jobRect = {
        x: 182,
        y: 489+(76*5),
        width: 584,
        height: 51
    };
    let statusRect = {
        x: 182,
        y: 489+(76*6),
        width: 584,
        height: 51
    };
    let quotesRect = {
        x: 182,
        y: 489+(76*7),
        width: 584,
        height: 51
    };
    let coinRect = {
        x: 175,
        y: 1308,
        width: 590,
        height: 51
    };
    let backpackRect = {
        x: 175,
        y: 1389,
        width: 590,
        height: 51
    };
    let toplvlRect = {
        x: 175,
        y: 1669,
        width: 591,
        height: 51
    };
    let topcoinRect = {
        x: 175,
        y: 1756,
        width: 591,
        height: 51
    };
    let footerRect = {
        x: 0,
        y: 1910,
        width: 1080,
        height: 90
    };
    // Draw
    let drawRect = false;
    let nxtlvlexp = userdata.level * config.expperlvl;
    drawText(ctx, member.user.tag, LamoonBoldFont, usernameRect, {
        minSize: 60,
        maxSize: 80,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, "Lv." + userdata.level, LamoonBoldFont, levelRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `exp. ${Math.floor(userdata.exp/nxtlvlexp*100)}%`, LamoonBoldFont, expRect, {
        minSize: 40,
        maxSize: 44,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `ชื่อเล่น : ${userdata.name||"ไม่พบ"}`, LamoonBoldFont, nicknameRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    
    drawText(ctx, `ฉายา : ${userdata.title||"ไม่พบ"}`, LamoonBoldFont, titleRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    
    drawText(ctx, `เพศ : ${userdata.gender||"ไม่พบ"}`, LamoonBoldFont, genderRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });    
    drawText(ctx, `วันเกิด : ${userdata.birthday?moment(userdata.birthday).format("ll"):"ไม่พบ"}`, LamoonBoldFont, birthdayRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `คลาส : ${userdata.class||"ไม่พบ"}`, LamoonBoldFont, classRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    
    drawText(ctx, `อาชีพ : ${userdata.job||"ไม่พบ"}`, LamoonBoldFont, jobRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `สถานะ : ${userdata.status||"ไม่พบ"}`, LamoonBoldFont, statusRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    
    drawText(ctx, `คำคม : ${userdata.quotes||"ไม่พบ"}`, LamoonBoldFont, quotesRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `เงินที่มี : ${userdata.point}`, LamoonBoldFont, coinRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `ช่องเก็บของ : ${userdata.backpackinventory.length}/${userdata.backpack*config.storageperlvl}`, LamoonBoldFont, backpackRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `${bot.user.tag}`, LamoonBoldFont, footerRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'center',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    exptop = (await exptop).findIndex((u)=>u.id==member.id)+1;
    cointop = (await cointop).findIndex((u)=>u.id==member.id)+1;
    drawText(ctx, `อันดับค่าประสบการณ์ : ${exptop}`, LamoonBoldFont, toplvlRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    drawText(ctx, `อันดับการเก็บเงิน : ${cointop}`, LamoonBoldFont, topcoinRect, {
        minSize: 60,
        maxSize: 64,
        vAlign: 'center',
        hAlign: 'left',
        fitMethod: 'box',
        drawRect: drawRect,
        textFillStyle: '#ffffff'
    });
    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    ctx.arc(231, 190, 129, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();
    // Move the image downwards vertically and constrain its height to 200, so it's a square
    ctx.drawImage(await avatar, 97, 48, 280, 280);

    // Move the image downwards vertically and constrain its height to 200, so it's a square
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');
    message.channel.send(attachment);
}
exports.conf = {
    aliases: [],
    delay: 3000
};