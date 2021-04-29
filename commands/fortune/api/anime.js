const Discord = require('discord.js')
const cheerio = require('cheerio')
const got = require('got');
const pageLimit = 9
if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
};
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
  let searchString = args.join(" ");
  if (searchString.length == 0) return message.channel.send(`กรุณาระบุชื่อ anime เช่น \`${prefix}anime Imouto sae Ireba\``)
  if (searchString.length <= 2) return message.channel.send(`กรุณาระบุชื่อ anime ที่มากกว่า 2 ตัวอักษร`)
  await got(`https://www.anime-sugoi.com/index.php?search=${encodeURIComponent(searchString)}`).then((res) => cheerio.load(res.body)).then(async ($) => {
    let list = []
    await $(".panel-body .row div.center_lnwphp").map(async (i, el) => {
      if (i >= pageLimit - 1) return;
      let a = $(el).children("a")
      let url = a.attr("href")
      let title = a.attr("title")
      let img = a.children("img").attr("src")
      list.push({
        url,
        title,
        img
      })
    })
    if (!list.length) return message.channel.send(`ไม่พบผลการค้นหา`)
    let page = 0;
    let inpage = false;
    let length = list.length;
    /**
     * @return {Promise<import("discord.js").MessageEmbed>}
     */
    const embedgen = async () => {
      return new Promise(async (resolve, reject) => {
        let embed = new Discord.MessageEmbed()
          .setColor(config.color);
        if (typeof (inpage) != "boolean") {
          let anime = list[inpage];
          let animedetail = await getanime(anime.url)
          let fieldtoadd = []
          let text = ""
          for (let i = 0; i < animedetail.ep.length; i++) {
            if (text.length >= 800) {
              fieldtoadd.push(text)
              text = ""
            }
            for (let e = 0; e < animedetail.ep[i].length; e++) {
              text += `[${animedetail.ep[i][e][0]}](${animedetail.ep[i][e][1]})${animedetail.ep[i].length-1!=e?"|":""}`;
            }
            text += `\n`;
          }
          if (text.length) {
            fieldtoadd.push(text)
          }
          let length = Math.ceil(fieldtoadd.length / 5)
          if (page < 0) page = length - 1
          if (page >= length) page = 0
          await embed.setTitle(`${anime.title}`)
            .setAuthor(`${page+1}/${length}`, message.author.displayAvatarURL)
            .setURL(anime.url)
            .setDescription(animedetail.description)
            .setThumbnail(anime.img)
          for (let i = page * 5; i < (page * 5 + 5); i++) {
            if (i >= fieldtoadd.length) break;
            await embed.addField("==========", fieldtoadd[i])
          }
          return resolve(embed);
        } else {
          if (page < 0) page = length - 1
          if (page == length) page = 0
          let anime = list[page];
          embed.setAuthor(`${page+1}/${length}`, message.author.displayAvatarURL)
            .setTitle(`${anime.title}`)
            .setURL(anime.url)
            .setImage(anime.img);
          return resolve(embed);
        }
      })
    }
    let msg = message.channel.send((await embedgen()));
    msg.then(async (msg) => {
      await msg.react("◀")
      await msg.react("⏹")
      await msg.react("▶")
      msg.react("❌")
    })
    msg = await msg;
    const react = await msg.createReactionCollector((reaction, user) => (["❌", "◀", "⏹", "▶"].includes(reaction.emoji.name) && user != bot.user && message.author.id == user.id), {
      time: 1000 * 60 * 20
    })
    react.on('end', async () => {
      (await msg).reactions.removeAll();
      let embed = new Discord.MessageEmbed()
        .setAuthor("Success", "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png")
        .setDescription(`ปิดหน้าต่างแล้ว`)
        .setColor("#22bb33");
      msg.edit(embed).then(msg => msg.delete({timeout:2000}))
    })
    react.on('collect', async r => {
      let user = r.users.cache.last()
      user.id != bot.user.id && r.users.remove(user);
      if (r.emoji.name == "❌") {
        react.stop();
      }
      if (r.emoji.name == "◀") {
        page--;
        msg.edit(await embedgen())
      }
      if (r.emoji.name == "⏹") {
        if (typeof (inpage) != "boolean") {
          page = inpage
          inpage = false;
        } else {
          inpage = page
          page = 0
        }
        msg.edit(await embedgen())
      }
      if (r.emoji.name == "▶") {
        page++;
        msg.edit(await embedgen())
      }
    })
  }).catch((err) => {
    if (err) return message.channel.send(`ไม่สามารถหา anime ได้ในตอนนี้ \`${err}\``);
  });

  async function getanime(url) {
    return new Promise(async (resolve, reject) => {
      let value = await bot.cache.get(url);
      if (value == undefined) {
        console.log("anime not cache")
        let $ = await got(url).then((res) => res.body).then((body) => cheerio.load(body));
        let description = $("div.col-md-12 div.panel div.panel-body p").text()
        let ep = []
        await $("div.b123 center div p").map((i, el) => {
          let thiseparray = []
          $(el).children("a").map((i, el) => {
            thiseparray[i] = [$(el).text(), $(el).attr("href")]
          })
          ep.push(thiseparray)
        })
        let obj = {
          url: url,
          description: description,
          ep: ep
        }
        resolve(obj)
        bot.cache.set(url, obj)
      } else {
        console.log("anime cache")
        resolve(value)
      }
    })
  }
}