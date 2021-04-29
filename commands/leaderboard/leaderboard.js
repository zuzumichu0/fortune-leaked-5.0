const Discord = require('discord.js')
  /**
   *
   *
   * @param {import("discord.js").Client} bot
   * @param {import("discord.js").Message} message
   * @param {String[]} args
   */
  exports.run = async (bot, message, args) => {
      let text = ""
      let list = await bot.db.prepare(`SELECT * FROM users ORDER BY level DESC LIMIT 5`).all();
        for (let i = 0; i < list.length; i++) {
          if(!bot.users.cache.get(list[i].id)){ text+=`\`${i+1}\` ${list[i].id} เลเวล \`${list[i].level}\`\n`;
          continue;}
          text+=`\`${i+1}\` ${Discord.Util.escapeMarkdown(bot.users.cache.get(list[i].id).username)} เลเวล \`${list[i].level}\`\n`
        }
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**อันดับคนเลเวลเยอะที่สุด** <:achievement:716859872578371625>`)
        .setDescription(text)
        .setImage(`https://cdn.discordapp.com/attachments/717494960898965536/725058942149066943/leaderboard.png`)
        .setColor(config.color));
  }
  exports.conf = { aliases: ["scoreboard","levelboard"] };