const Server = require('ws').Server;
const wss = new Server({ port: 2380 });
/**
 * @param {import("discord.js").Client} bot
 */
module.exports = async(bot)=>{
    bot.music = {
        node: new Map(),
        manage: new Map()
    }
    let idcounter=1
    // สร้าง websockets server ที่ port 2380
    wss.on('connection', (ws) => { // สร้าง connection
        ws.id = idcounter++
        bot.music.node.set(ws.id,ws)
        console.log("connect"+ws.id)
      ws.on('message', function incoming(message) {
        try {
          
        let data;
        try {
          data = JSON.parse(message)
        } catch (e){}
        
      if(!data) return
      switch (data.type) {
        case "syncqueue":
            bot.music.manage.set(data.guild,ws.id)
            break;
        case "song_end":
            bot.music.manage.delete(data.guild);
        default:
            console.log(e.data)
          break;
      }
        } catch (error) {
          
        }
      });
    ws.on('close', function close() {
        bot.music.node.delete(ws.id);
        [...bot.music.manage.entries()].forEach((v)=>{
        if(v[1]==ws.id){
          bot.music.manage.delete(v[0]);
          console.log("delete"+v[0])
        }
        })
      // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
        
      });
    ws.send(JSON.stringify({type:"syncconfig",prefix,id:ws.id,config}));
      // ส่ง data ไปที่ client เชื่อมกับ websocket server นี้
    });
    /**
    *
    *
    * @param {String} videoid
    * @param {import("discord.js").Message} message
    * @param {import("discord.js").VoiceChannel} voiceChannel
    * @param {boolean} [playlist=false]
    * @param {import("discord.js").Message} msg
    */
    async function handleVideo(video, message, voiceChannel,playlist,msg){
    return new Promise(async(resolve,reject)=>{
      await send(message.guild.id,"play",{video,voiceChannel:voiceChannel.id,textChannel:message.channel.id,requestuser:{
          name : message.member.displayName,
          avatarurl: message.author.avatarURL()
        },playlist
      })
        resolve(true)
      })
    }
    function isEmpty(obj) {
      for(let key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }
    function getminestnode() {
        let nodec={};
        [...bot.music.node.entries()].forEach((v)=>{
          nodec[v[0]] = 0;
          });
        [...bot.music.manage.entries()].forEach((v)=>{
          if(!nodec[v[1]]) nodec[v[1]] = 0;
            nodec[v[1]]++;
          })
          
    if(!isEmpty(nodec)){
          let sortable = [];
      for (let id in nodec) {
          sortable.push([id, nodec[id]]);
      }
      sortable.sort((a, b) => {
          return a[1] - b[1];
      });
      console.log(sortable)
      return bot.music.node.get(parseInt(sortable[0][0]));
    }else{
        return false
    }
    }
    /**
     * 
     * @param {String} guild 
     * @return {WebSocket}
     */
    async function getnode(guild){
      return new Promise(async(resolve,reject)=>{
        if(!bot.music.node.keys()){
            return resolve(false)
        }
        let ws = await bot.music.manage.get(guild)
        if(typeof(ws)!="number"){
            ws = await getminestnode()
            if(!ws) resolve(false)
            else await bot.music.manage.set(guild,ws.id)
        }else{
            ws= bot.music.node.get(ws)
        }
        if(!ws) return resolve(false)
        else return resolve(ws)
      })
    }
    async function send(guild,command,args){
      return new Promise(async(resolve,reject)=>{
        let ws = await getnode(guild)
        if(!ws) return resolve(ws)
        return resolve(ws.send(JSON.stringify({guild,command,args,type:"command"})))
      })
    }
    function hasguild(guild){
    return bot.music.manage.has(guild)
    }
    bot.music.hasguild = hasguild;
    bot.music.getnode = getnode;
    bot.music.send = send;
    bot.music.handleVideo = handleVideo;
}