// not enough of this to justify api (for now)

const cats = {
    "Shiro": {
        pic: "",
        personality: "Chill",
        attribution: "(not snowball)",
        rare: false,
    },
    "Tobi": {
        pic: "",
        personality: "Triumphant",
        attribution: "Ethan's cat",
        rare: false,
    },
    "Mocha": {
        pic: "",
        personality: "Sleepy",
        attribution: "Andy's cat",
        rare: false,
    },
    "Megumi": {
        pic: "",
        personality: "Depressed",
        attribution: "Gojo Catoru's son",
        rare: false,
    },
    "Guangdang": {
        pic: "",
        personality: "Sad",
        attribution: "@guangdang005",
        rare: false,
    },
    "Luna": {
        pic: "",
        personality: "Sus",
        attribution: "@monkeycatluna",
        rare: false,
    },
    "Kiko": {
        pic: "",
        personality: "Hungry",
        attribution: "Lilian's cat",
        rare: false,
    },
    "Sesame": {
        pic: "",
        personality: "Goofy",
        attribution: "Cody's cat",
        rare: false,
    },
    "Lola": {
        pic: "",
        personality: "Aesthetic",
        attribution: "Hannah's cat",
        rare: false,
    },
    "Comet": {
        pic: "",
        personality: "Grumpy",
        attribution: "Nicole Li's chonky cat",
        rare: true,
    },
    "Michi": {
        pic: "",
        personality: "Rowdy",
        attribution: "Gracie's suitemate's cat",
        rare: true,
    },
    "oye": {
        pic: "",
        personality: "oye",
        attribution: "oye",
        rare: true,
    },
    "Gojo Catoru": {
        pic: "",
        personality: "Strongest",
        attribution: "nah, i'd win", // more like a desc now
        rare: true,
    },
    "Sukatna": {
        pic: "",
        personality: "Strongest",
        attribution: "i'm not a fraud i swear",
        rare: true,
    },
}
  
  const achievements = [
    {
        name: "Feline Motivated",
        img: "https://i.imgur.com/PXSITjR.png",
        desc: "Finish 1 task.",
        condition: {
            tasksCompleted: 1,
        }
    },
    {
        name: "Not Kitten",
        img: "https://i.imgur.com/Kpe3uQZ.png",
        desc: "Finish 5 tasks.",
        condition: {
            tasksCompleted: 5,
        }
    },
    {
        name: "Litter-ally Grinding",
        img: "https://i.imgur.com/bXsTmQE.png",
        desc: "Finish 20 tasks.",
        condition: {
            tasksCompleted: 20,
        }
    },
    {
        name: "Fur Real?",
        img: "https://i.imgur.com/Ywu8bTc.png",
        desc: "Finish 50 tasks.",
        condition: {
            tasksCompleted: 50,
        }
    },
    {
        name: "Maximum Outpurrt",
        img: "https://i.imgur.com/pwJ4WU6.png",
        desc: "Finish 100 tasks.",
        condition: {
            tasksCompleted: 100,
        }
    },
    {
        name: "Purrductive",
        img: "https://i.imgur.com/nxBubxB.png",
        desc: "Finish 200 tasks.",
        condition: {
            tasksCompleted: 200,
        }
    },
    {
        name: "Paws-itively Awful",
        img: "https://i.imgur.com/iqeBWiP.png",
        desc: "Complete 5 sessions.",
        condition: {
            sessionsCompleted: 5,
        }
    },
    {
        name: "Cat-thartic Screaming",
        img: "https://i.imgur.com/7ShsERF.png",
        desc: "Complete 10 sessions.",
        condition: {
            sessionsCompleted: 10,
        }
    },
    {
        name: "Cat-astrophe",
        img: "https://i.imgur.com/YpoXjtJ.png",
        desc: "Complete 15 sessions.",
        condition: {
            sessionsCompleted: 15,
        }
    },
    {
        name: "I Hate This Fur-cking Place",
        img: "https://i.imgur.com/jyu7PXN.png",
        desc: "Complete 25 sessions.",
        condition: {
            sessionsCompleted: 25,
        }
    },
    {
        name: "Fur-midable Work Ethic",
        img: "https://i.imgur.com/N8YoKLb.png",
        desc: "Complete 40 sessions.",
        condition: {
            sessionsCompleted: 40,
        }
    },
    {
        name: "Stand purr-oud, you're strong",
        img: "https://i.imgur.com/vA0mXDf.png",
        desc: "Complete 60 sessions.",
        condition: {
            sessionsCompleted: 60,
        }
    },
    {
        name: "Nyani?",
        img: "https://i.imgur.com/mYxh1NS.png",
        desc: "Purchase 1 toy.",
        condition: {
            toysBought: [1],
        }
    },
    {
        name: "Hiss-terical",
        img: "https://i.imgur.com/QNfdeSm.png",
        desc: "Purchase 5 toys.",
        condition: {
            toysBought: [5],
        }
    },
    {
        name: "Meow and Fur-ever",
        img: "https://i.imgur.com/Fbia6gs.png",
        desc: "Purchase 10 toys.",
        condition: {
            toysBought: [10],
        }
    },
    {
        name: "I Have Truly Found Purr-adise",
        img: "https://i.imgur.com/I8ndmAD.png",
        desc: "Purchase 15 toys.",
        condition: {
            toysBought: [15],
        }
    },
    {
        name: "The Tuxedo Turns Up",
        img: "https://i.imgur.com/SsEBkjE.png",
        desc: "Attract Comet!",
        condition: {
            catsSeen: "Comet",
        }
    },
    {
        name: "Michi",
        img: "https://i.imgur.com/KnDhU7Q.jpeg",
        desc: "Attract Michi!",
        condition: {
            catsSeen: "Michi",
        }
    },
    {
        name: "oye.",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "attract oye",
        condition: {
            catsSeen: "oye",
        }
    },
    {
        name: "Nah, I'd win",
        img: "https://i.imgur.com/Sn3gnXB.png",
        desc: "Attract Gojo Catoru!",
        condition: {
            catsSeen: "Gojo Catoru",
        }
    },
    {
        name: "Sukatna, King of Curses",
        img: "https://i.imgur.com/tK3pFFF.png",
        desc: "Attract Sukatna!",
        condition: {
            catsSeen: "Sukatna",
        }
    },
    {
        name: "Battle of the Strongest",
        img: "https://i.imgur.com/7bbZ48I.png",
        desc: "Attract Gojo Catoru and Sukatna.",
        condition: {
        }
    },
];

const storeItems = [
    {
        name: "Yarn Ball",
        img: "https://i.imgur.com/KGVzVqD.png",
        price: 10,
        attribution: "classic cat toy",
    },
    {
        name: "Boba",
        img: "https://i.imgur.com/QYajpsk.png",
        price: 20,
        attribution: "teado <3",
    },
    {
        name: "Laptop",
        img: "https://i.imgur.com/Rg81uAJ.png",
        price: 20,
        attribution: "psets for cats!",
    },
    {
        name: "Wide Tim?",
        img: "https://i.imgur.com/wLfM6NW.png",
        price: 25,
        attribution: "@wide_tim",
    },
    {
        name: "Fish Plush",
        img: "https://i.imgur.com/PvmOJqk.png",
        price: 20,
        attribution: "suggested by jessica!",
    },
    
    {
        name: "Bear Plush", 
        img: "https://i.imgur.com/1WjVJ5Y.png",
        price: 20,
        attribution: "suggested by ethan!",
    }, 
    {
        name: "Butterfly Teaser",
        img: "https://i.imgur.com/sI5eUPN.png",
        price: 35,
        attribution: "suggested by gracie!",
    }, // everything below should cost more
    {
        name: "Pocky",
        img: "https://i.imgur.com/Et0AGrU.png",
        price: 35,
        attribution: "suggested by andy!",
    },
    {
        name: "Star Plush",
        img: "https://i.imgur.com/yvLBk45.png",
        price: 30,
        attribution: "suggested by vi!",
    },
    
    {
        name: "Tower of Tracks",
        img: "https://i.imgur.com/4hMTehB.png",
        price: 25,
        attribution: "suggested by alena!",
    },
    {
        name: "Shark Plush", // blahaj
        img: "https://i.imgur.com/SJPulM6.png",
        price: 25,
        attribution: "suggested by ethan!",
    },
    {
        name: "Lasagna",
        img: "https://i.imgur.com/qDnHOB1.png",
        price: 25,
        attribution: "suggested by hao!",
    },
    {
        name: "Jenga", // jenga
        img: "https://i.imgur.com/sNj8RMX.png",
        price: 30,
        attribution: "suggested by vinh!",
    },
    {
        name: "Sushi Scratch Post",
        img: "https://i.imgur.com/36BImAT.png",
        price: 40,
        attribution: "suggested by amy!",
    },
    {
        name: "Spaceship",
        img: "https://i.imgur.com/Dziqdrc.png",
        price: 35,
        attribution: "suggested by jasmine!",
    },
    {
        name: "Apricity (Theme)",
        img: "https://i.imgur.com/KEXuGuk.png",
        price: 100,
        attribution: "@apricityshortfilm",
    },

];
    
export { achievements, storeItems, cats }