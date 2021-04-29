const moment = require('moment');
moment.locale("th");
var lastday = moment().day()//
var lasthour = moment().hour();
const Canvas = require('canvas')
const Discord = require('discord.js')
const opentype = require("opentype.js")
const drawText = require("node-canvas-text").default
const chalk = require('chalk');
const birthdaylist =  ["ขอให้โชคดีในวันพิเศษวันนี้นะ","ขอให้วันพิเศษนี้เป็นวันที่สวยงามของเธอจ้า","แฮปปี้เบิร์ธเดย์ ขอให้มีช่วงเวลาดี ๆ ในวันเกิด"]
// Load OpenType fonts from files
let LamoonBoldFont = opentype.loadSync(appRoot + '/fonts/FCLamoonBold.ttf');
/**
 *
 *
 * @param {import("discord.js").Client} bot
 */
module.exports = async(bot)=>{
	console.log("Loggined as "+ bot.user.username);
	bot.user.setPresence({afk: true, activity: { name: `${config.prefix}help | สวัสดีค่ะมาสเตอร์`}, status: 'online' })
	setInterval(() => {	
		tick()
	}, 60000);
	tick()
	async function tick(){
		let day = moment().day();
		let hour = moment().hour();
		await day;
		await hour;
		if(lastday!=day){
			lastday = day;
    		daychange();
		}
		if(lasthour!=hour){
			lasthour = hour;
    		hourchange();
		}
		return;
	}
	async function daychange(){
		let userlist = await bot.db.prepare(`SELECT * FROM users`).all();
		for (let i = 0; i < userlist.length; i++) {
			if(userlist[i].birthday){
				if(bot.users.cache.get(userlist[i].id)&&moment(userlist[i].birthday).day()==moment().day()&&moment(userlist[i].birthday).month()==moment().month()){
					let user = bot.users.cache.get(userlist[i].id);
					const canvas = Canvas.createCanvas(1280, 720);
					const ctx = canvas.getContext('2d');
					// Since the image takes time to load, you should await it
					const background = await Canvas.loadImage(appRoot + '/images/birthday.png');
					// This uses the canvas dimensions to stretch the image onto the entire canvas
					ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
					let usernameRect = {
						x: 968,
						y: 409,
						width: 310,
						height: 40
					};
					let footerRect = {
						x: 0,
						y: 666,
						width: 1280,
						height: 54
					};
					let drawRect = false;
					drawText(ctx, userlist[i].name||user.username, LamoonBoldFont, usernameRect, {
						minSize: 62,
						maxSize: 70,
						vAlign: 'center',
						hAlign: 'center',
						fitMethod: 'box',
						drawRect: drawRect,
						textFillStyle: '#ffffff'
					});

					drawText(ctx, birthdaylist[Math.floor(Math.random() * birthdaylist.length)], LamoonBoldFont, footerRect, {
						minSize: 40,
						maxSize: 50,
						vAlign: 'center',
						hAlign: 'center',
						fitMethod: 'box',
						drawRect: drawRect,
						textFillStyle: '#ffffff'
					});
					const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'birthday'+user.id+'.png');
					
					bot.users.cache.get(userlist[i].id).send(`${user} จูนมีไรจะให้`,{embed :new Discord.MessageEmbed()
					.setImage(`attachment://birthday${user.id}.png`)
					.setColor("#fe019a")
					.attachFiles(attachment)})
					console.log(chalk.green(`======= Happy Day ${user.tag} =======`))
				}
			};
		}
		return;
	}
	async function hourchange(){
		return;
	}
	/*
	bot.users.cache.forEach(async(user)=>{
			console.log("adding new user "+user.id)
			bot.db.adduser(user.id)
		})*/
}