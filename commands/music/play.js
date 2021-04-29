const Discord = require("discord.js")
const YouTube = require('simple-youtube-api');
const {getURLVideoID,validateURL} = require('ytdl-core');
const youtube = new YouTube(config.api.youtube);
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    if(!args.length) return message.channel.send(`กรุณาระบุชื่อเพลง ${prefix}play ชื่อ/url`)
    let searchString = args.slice(0).join(' ');
    let url = (args[0] ? args[0].replace(/<(.+)>/g, '$1') : '').replace(/music\./gi,"");
    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('คุณไม่ได้อยู่ในห้องคุย');
    if(message.guild.me&&message.guild.me.voiceChannel){
     if(message.guild.me.voiceChannel.id!=message.member.voiceChannel.id) return message.channel.send('คุณต้องอยู่ในห้องเดียวกับบอท');
    }
    let permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {

        return message.channel.send('หนูไม่มี่ยศที่จะสามารถเข้าห้องนั้นได้');
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send('หนูไม่สามารถเปิดเพลงในห้องนั้นได้');
    }
    let msg=null;
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/(playlist(.*)|(.*)list(.*))$/)) {
    let i=0;
    let embed = new Discord.MessageEmbed()
    .setColor(config.color)
    .setAuthor("กำลังโหลดข้อมูล..", 'https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif')
    .setDescription(`\`กำลังโหลดเพลย์ลิส...\``);
    let playlist;
    try{
    [msg,playlist] = await Promise.all([message.channel.send(embed),youtube.getPlaylist(url)]);
    } catch(err){
        embed = new Discord.MessageEmbed()
        .setColor(config.colorfail)
        .setDescription(`🆘 Link เสีย`);
        return message.channel.send(embed);
    }
        let videos = await playlist.getVideos();
        for await (const video of Object.values(videos)) {
            if(i==10){
                embed.setDescription(`\`บอทรองรับการเปิด Playlist แค่ ${i} เพลงเท่านั้น\``).setAuthor("Loading..", 'https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif').setImage("https://cdn.discordapp.com/attachments/619019220965130241/628902543501557760/1891_rainbowsheep.gif");
               msg.edit(embed);
                 break;}
            i++;
            if(i % 10==1){embed.setDescription(`\`Loading Playlist ${i} songs\``).setAuthor("Loading..", 'https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif').setImage("https://cdn.discordapp.com/attachments/619019220965130241/628902543501557760/1891_rainbowsheep.gif");
            msg.edit(embed);}
            await bot.music.handleVideo(video.id, message, voiceChannel, true,msg); // eslint-disable-line no-await-in-loop
        }
        embed = new Discord.MessageEmbed()
        .setColor(config.colorsuccess)
        .setDescription(`✅ \`${playlist.title}\` ถูกเพิ่มเข้าคิวแล้ว!`);
        return msg.edit(embed);
    } else {
        let video;
            if(!validateURL(url)){
                let msg = message.channel.send(new Discord.MessageEmbed()
                .setColor(config.color)
                .setAuthor("กำลังค้นหาเพลง..")
                .setImage("https://media.tenor.com/images/e6878516a7776a696351bcff80e55296/tenor.gif"))
                video = await new Promise(async(resolve,reject)=>{
                console.log("play")
                let val = await youtube.searchVideos(searchString, 1)
                if(!val.length){
                    return reject()
                }
                msg.then((msg)=>msg.delete());
                return resolve(val[0].id);
                }).catch((err)=>{
                    console.error(err);
                    if(err&&err.code) embed = new Discord.MessageEmbed()
                    .setColor(config.colorfail)
                    .setDescription(`🆘 api youtube หมดไม่สามารถค้นหาเพลงได้ในขณะนี้กรุณานำ url มาใส่แทน`);
                    else embed = new Discord.MessageEmbed()
                    .setColor(config.colorfail)
                    .setDescription(`🆘 หนูหาเพลงไม่เจอ`);
                    return msg.then((msg)=>msg.edit(embed));
                })
            }else{
                video = await getURLVideoID(url);
            }
        return bot.music.handleVideo(video, message, voiceChannel,false);
    }
}
exports.conf = { aliases: ["p","เปิดเพลง"] };