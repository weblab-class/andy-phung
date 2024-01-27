// not enough of this to justify api (for now)

const catAnimationDict = { // lmfao
    "Comet": {
      "sitting": ["https://cdn.discordapp.com/attachments/754243466241769515/1199658754052988938/comet_sitting.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "standing": ["https://cdn.discordapp.com/attachments/754243466241769515/1199658754875080704/comet_standing.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "sleeping": ["https://cdn.discordapp.com/attachments/754243466241769515/1199658754308853790/comet_sleeping.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
    },
    "Michi": {
      "sitting": ["https://cdn.discordapp.com/attachments/754243466241769515/1199658979060625408/michi_sitting.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "standing": ["https://cdn.discordapp.com/attachments/754243466241769515/1199658979580715090/michi_standing.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "sleeping": ["https://cdn.discordapp.com/attachments/754243466241769515/1199658979312275486/michi_sleeping.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
    },
    "Gojo Satoru": {
      "sitting": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659577604583515/gojo_sitting.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "standing": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659578254688316/gojo_standing.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "sleeping": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659577902387211/gojo_sleeping.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
    },
    "Sukuna": {
      "sitting": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659715546861608/sukuna_sitting.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "standing": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659716062748803/sukuna_standing.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "sleeping": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659715785916466/sukuna_sleeping.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
    },
    "Oye": {
      "sitting": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659865665175582/oye_sitting.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "standing": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659866164314292/oye_standing.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
      "sleeping": ["https://cdn.discordapp.com/attachments/754243466241769515/1199659865912660029/oye_sleeping.png", "https://cdn.discordapp.com/attachments/754243466241769515/1200723809557291008/biscuit_icon.png"],
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
    
export { catAnimationDict, achievements }