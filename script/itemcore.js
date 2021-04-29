/**
 * @param {import("discord.js").Client} bot
 */
module.exports = async (bot) => {
    bot.item = {
        1: {
            name: "*ขยะ*",
            price: 2,
            emoji: "<:trash_can:716570725326258217>",
            type: "fish"
        },
        2: {
            name: "*ปลาโง่ๆ*",
            price: 5,
            emoji: "<:RawFish:716543255017160715>",
            type: "fish"
        },
        3: {
            name: "ปลาธรรมดา",
            price: 10,
            emoji: "<:Raw_Cod:716543255201841204>",
            type: "fish"
        },
        4: {
            name: "**ปลาหายาก**",
            price: 20,
            emoji: "<:Clown_fish:716543255096983616>",
            type: "fish"
        },
        5: {
            name: "*ถ่าน*",
            price: 3,
            emoji: "<:coal:719197530495385600>",
            type: "mine"
        },
        6: {
            name: "เหล็ก",
            price: 15,
            emoji: "<:iron:719197530491191356>",
            type: "mine"
        },
        7: {
            name: "**ทอง**",
            price: 30,
            emoji: "<:Gold:719197530495254588>",
            type: "mine"
        },
        8: {
            name: "**หินแดง**",
            price: 5,
            emoji: "<:redstone:719197530466025513>",
            type: "mine"
        },
        9: {
            name: "**เพรช**",
            price: 50,
            emoji: "<:diamond:719197530448986183>",
            type: "mine"
        },
        10: {
            name: "การ์ดป้องกันขโมย",
            emoji: "<:antithieve:724588587101978655>",
            price: 200,
            type: "card"
        }
    }
    bot.item.backpack = {
        1: {
            name: "**กระเป๋า lvl 1**",
            price: 0,
            emoji: "<:backpack50129941:719644690470928477>"
        },
        2: {
            name: "**กระเป๋า lvl 2**",
            price: 100,
            emoji: "<:backpack50129941:719644690470928477>"
        },
        3: {
            name: "**กระเป๋า lvl 3**",
            price: 2000,
            emoji: "<:backpack50129941:719644690470928477>"
        },
        4: {
            name: "**กระเป๋า lvl 4**",
            price: 6000,
            emoji: "<:backpack50129941:719644690470928477>"
        },

    }
    bot.item.fishing_rod = {
        1: {
            name: "**เบ็ตตกปลา lvl 1**",
            price: 0,
            emoji: "<:Fishing_Rod:719258757699207269>",
            rate: [{
                    id: 1,
                    pct: 50
                },
                {
                    id: 2,
                    pct: 80
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 5
                },
                {
                    id: null,
                    pct: 50
                }
            ]
        },
        2: {
            name: "**เบ็ตตกปลา lvl 2**",
            price: 250,
            emoji: "<:Fishing_Rod:719258757699207269>",
            rate: [{
                    id: 1,
                    pct: 30
                },
                {
                    id: 2,
                    pct: 70
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 5
                },
                {
                    id: null,
                    pct: 30
                }
            ]
        },
        3: {
            name: "**เบ็ตตกปลา lvl 3**",
            price: 2000,
            emoji: "<:Fishing_Rod:719258757699207269>",
            rate: [{
                    id: 1,
                    pct: 20
                },
                {
                    id: 2,
                    pct: 60
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 6
                },
                {
                    id: null,
                    pct: 20
                }
            ]
        },
        4: {
            name: "**เบ็ตตกปลา lvl 4**",
            price: 7000,
            emoji: "<:Fishing_Rod:719258757699207269>",
            rate: [{
                    id: 1,
                    pct: 10
                },
                {
                    id: 2,
                    pct: 50
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 7
                },
                {
                    id: null,
                    pct: 8
                }
            ]
        },
    }
    bot.item.pickaxe = {
        1: {
            name: "**ที่ขุด lvl 1**",
            price: 0,
            emoji: "<:wooden_pickaxe:721275736127701103>",
            rate: [{
                    id: 5,
                    pct: 10
                },
                {
                    id: null,
                    pct: 3
                }
            ]
        },
        2: {
            name: "**ที่ขุด lvl 2**",
            price: 300,
            emoji: "<:stone_pickaxe:721275736127701072>",
            rate: [{
                    id: 5,
                    pct: 10
                },
                {
                    id: 6,
                    pct: 5
                },
                {
                    id: null,
                    pct: 4
                }
            ]
        },
        3: {
            name: "**ที่ขุด lvl 3**",
            price: 2500,
            emoji: "<:iron_pickaxe:721275735926636597>",
            rate: [{
                    id: 5,
                    pct: 8
                },
                {
                    id: 6,
                    pct: 10
                },
                {
                    id: 7,
                    pct: 6
                },
                {
                    id: 8,
                    pct: 20
                },
                {
                    id: 9,
                    pct: 1
                },
                {
                    id: null,
                    pct: 6
                }
            ]
        },
        4: {
            name: "**ที่ขุด lvl 4**",
            price: 8500,
            emoji: "<:golden_pickaxe:721275736316444712>",
            rate: [{
                    id: 5,
                    pct: 8
                },
                {
                    id: 6,
                    pct: 15
                },
                {
                    id: 7,
                    pct: 7
                },
                {
                    id: 8,
                    pct: 25
                },
                {
                    id: 9,
                    pct: 2
                },
                {
                    id: null,
                    pct: 8
                }
            ]
        },
        5: {
            name: "**ที่ขุด lvl 5**",
            price: 15000,
            emoji: "<:diamond_pickaxe:721275736228626542>",
            rate: [{
                    id: 5,
                    pct: 4
                },
                {
                    id: 6,
                    pct: 15
                },
                {
                    id: 7,
                    pct: 8
                },
                {
                    id: 8,
                    pct: 25
                },
                {
                    id: 9,
                    pct: 5
                },
                {
                    id: null,
                    pct: 8
                }
            ]
        },
    }
    bot.item.findkey = (name) => {
            for (let [key, value] of Object.entries(bot.item)) {
                if(!value.name) continue;
            value.id= key;
            if(value.name.match(new RegExp(name,"i"))||key==name) return key;
        }
    }
}