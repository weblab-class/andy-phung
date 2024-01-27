// not enough of this to justify api (for now)

const catDict = { // lmfao
    "Comet": {
      "sitting": "https://cdn.discordapp.com/attachments/754243466241769515/1199658754052988938/comet_sitting.png?ex=65c35847&is=65b0e347&hm=a89fb29ae6d8db555d513b5db0f489177ce996b0370bd7847b51f7e576bea083&",
      "standing": "https://cdn.discordapp.com/attachments/754243466241769515/1199658754875080704/comet_standing.png?ex=65c35847&is=65b0e347&hm=7a90550af6752df7ee5b96b880ccf221cf96f76b4505fb5b2e3db0b888a57fff&",
      "sleeping": "https://cdn.discordapp.com/attachments/754243466241769515/1199658754308853790/comet_sleeping.png?ex=65c35847&is=65b0e347&hm=11fa36f2d508b7c32c51a7de7f9da887b0c45b217526cd4bcd33d290c07b6cb3&",
    },
    "Michi": {
      "sitting": "https://cdn.discordapp.com/attachments/754243466241769515/1199658979060625408/michi_sitting.png?ex=65c3587d&is=65b0e37d&hm=d8ae0499a971fa6955546b9b5a9ccb5de51c31ac418b2f92b5d68c984ef53efb&",
      "standing": "https://cdn.discordapp.com/attachments/754243466241769515/1199658979580715090/michi_standing.png?ex=65c3587d&is=65b0e37d&hm=814f7c3170958a4e57b95f29a08487f78e426f83f4d1147e8448e3ce3f470d69&",
      "sleeping": "https://cdn.discordapp.com/attachments/754243466241769515/1199658979312275486/michi_sleeping.png?ex=65c3587d&is=65b0e37d&hm=fa65f752d0346b74c3fa1371298f08fad9388d137021c9a4e1555767911bd322&",
    },
    "Gojo Satoru": {
      "sitting": "https://cdn.discordapp.com/attachments/754243466241769515/1199659577604583515/gojo_sitting.png?ex=65c3590b&is=65b0e40b&hm=145b2f03ebff45cc91da00fcff33a1f829c5e42137c3e5016a2db6a746cc908c&",
      "standing": "https://cdn.discordapp.com/attachments/754243466241769515/1199659578254688316/gojo_standing.png?ex=65c3590c&is=65b0e40c&hm=22ce1b2dc2f329ef7a7d58fbb92ffb07b8f236d36b11da2db9eeab0172969709&",
      "sleeping": "https://cdn.discordapp.com/attachments/754243466241769515/1199659577902387211/gojo_sleeping.png?ex=65c3590b&is=65b0e40b&hm=e66dc3b910d70db41cf092b52823b4208e8ec089ab32aa026358f4cb7bb6d274&",
    },
    "Sukuna": {
      "sitting": "https://cdn.discordapp.com/attachments/754243466241769515/1199659715546861608/sukuna_sitting.png?ex=65c3592c&is=65b0e42c&hm=99952777e19fa9eab74362b4fe0b1fb27f7d452149b61f41d8a4755fc894bc33&",
      "standing": "https://cdn.discordapp.com/attachments/754243466241769515/1199659716062748803/sukuna_standing.png?ex=65c3592c&is=65b0e42c&hm=3978619dd3a95d94b9a8591a2f64421382439cbc2f624c76c63d59c16ab48ae1&",
      "sleeping": "https://cdn.discordapp.com/attachments/754243466241769515/1199659715785916466/sukuna_sleeping.png?ex=65c3592c&is=65b0e42c&hm=24f3c42b06845aab2baafb2025207bb40fac1e0224f71502d2661102a05baa7d&",
    },
    "Oye": {
      "sitting": "https://cdn.discordapp.com/attachments/754243466241769515/1199659865665175582/oye_sitting.png?ex=65c35950&is=65b0e450&hm=544c43ef68aa6a8a21499ee1c759a1270189c32f78157d26f12908b00b429bd5&",
      "standing": "https://cdn.discordapp.com/attachments/754243466241769515/1199659866164314292/oye_standing.png?ex=65c35950&is=65b0e450&hm=c9b571b80cc5c40e121faf9d4fef4ae9d6e1d92f2260d4418937d81925cfc931&",
      "sleeping": "https://cdn.discordapp.com/attachments/754243466241769515/1199659865912660029/oye_sleeping.png?ex=65c35950&is=65b0e450&hm=ba11d214e0526a6c145374e632247e3dc319c70f22f08aaecd83b86de8823e02&",
    },
  };
  
  
  const achievements = [
    {
        name: "Feline Motivated",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Finish 1 task.",
        condition: {
            tasksCompleted: 1,
        }
    },
    {
        name: "Not Kitten",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Finish 5 tasks.",
        condition: {
            tasksCompleted: 5,
        }
    },
    {
        name: "Litter-ally Grinding",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Finish 20 tasks.",
        condition: {
            tasksCompleted: 20,
        }
    },
    {
        name: "Fur Real?",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Finish 50 tasks.",
        condition: {
            tasksCompleted: 50,
        }
    },
    {
        name: "Maximum Outpurrt",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Finish 100 tasks.",
        condition: {
            tasksCompleted: 100,
        }
    },
    {
        name: "Purrductive",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Finish 200 tasks.",
        condition: {
            tasksCompleted: 200,
        }
    },
    {
        name: "Paws-itively Awful",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Complete 5 sessions.",
        condition: {
            sessionsCompleted: 5,
        }
    },
    {
        name: "Cat-thartic Screaming",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Complete 10 sessions.",
        condition: {
            sessionsCompleted: 10,
        }
    },
    {
        name: "Cat-astrophe",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Complete 20 sessions.",
        condition: {
            sessionsCompleted: 20,
        }
    },
    {
        name: "I Hate This Fur-cking Place",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Complete 40 sessions.",
        condition: {
            sessionsCompleted: 40,
        }
    },
    {
        name: "Fur-midable Work Ethic",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Complete 80 sessions.",
        condition: {
            sessionsCompleted: 80,
        }
    },
    {
        name: "Stand purr-oud, you're strong",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Complete 120 sessions.",
        condition: {
            sessionsCompleted: 120,
        }
    },
    {
        name: "Nyani?",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Purchase 1 toy.",
        condition: {
        }
    },
    {
        name: "Hiss-terical",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Purchase 5 toys.",
        condition: {
        }
    },
    {
        name: "Meow and Fur-ever",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Purchase 10 toys.",
        condition: {
        }
    },
    {
        name: "I Have Truly Found Purr-adise",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Purchase 20 toys.",
        condition: {
        }
    },
    {
        name: "The Tuxedo Turns Up",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Attract Comet!",
        condition: {
        }
    },
    {
        name: "Michi",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Attract Michi!",
        condition: {
        }
    },
    {
        name: "oye.",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "attract oye",
        condition: {
        }
    },
    {
        name: "Nah, I'd win",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Attract Gojocat!",
        condition: {
        }
    },
    {
        name: "Sukatna, King of Curses",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Attract Sukatna!",
        condition: {
        }
    },
    {
        name: "Battle of the Strongest",
        img: "https://cdn.discordapp.com/attachments/1152789674289528903/1200270172670394388/2Q.png?ex=65c591b5&is=65b31cb5&hm=249593700160cefea38b8de9caa7e838640aa33ca3762671eed2ee0cd1385ff0&",
        desc: "Attract both Gojocat and Sukatna.",
        condition: {
        }
    },
]
    
export { catDict, achievements }