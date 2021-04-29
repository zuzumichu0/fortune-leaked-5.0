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
      let list = await bot.db.prepare(`SELECT * FROM users ORDER BY point DESC LIMIT 5`).all();
        for (let i = 0; i < list.length; i++) {
          if(!bot.users.cache.get(list[i].id)){ text+=`\`${i+1}\` ${list[i].id} มี \`${list[i].level}\`\n`;
          continue;}
          text+=`\`${i+1}\` ${Discord.Util.escapeMarkdown(bot.users.cache.get(list[i].id).username)} มี \`${list[i].point}\`\n`
        }
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**อันดับคนสะสมเงินเยอะที่สุด** <:coin:716555704990695434>`)
        .setDescription(text)
        .setImage(`https://cdn.discordapp.com/attachments/717494960898965536/725058941117005856/topmoney.png`)
        .setColor(config.color));
  }
  exports.conf = { aliases: [] };