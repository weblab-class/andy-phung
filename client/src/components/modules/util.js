import React, { useEffect, useState } from "react";

const Modal = (props) => { // 600px, 350px default
    //console.log(props.width);
    //console.log(props.height);
    return props.visible && (
        <div className={`bg-[#E7AE6C] border-[#694F31] border-4 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[350px] z-30 overflow-auto`}>
            {props.content}
        </div>
    )
}

const CenterScreen = (props) => { // TODO: pass dims by props; 500px, 263px for createjoinroom
    return <div className="bg-[#E7AE6C] border-[#694F31] border-4 rounded-[2rem] w-[500px] h-[263px] flex items-center justify-center">
        {props.content}
    </div>
}

const SpinningCat = (props) => {
    const [ spinClass, setSpinClass ] = useState(props.first);

    const cats = ["cat-spin-1", "cat-spin-2", "cat-spin-3", "cat-spin-4", "cat-spin-5", "cat-spin-6"]; 


    useEffect(() => {
        setInterval(() => {
            setSpinClass(Math.floor(Math.random()*cats.length));
        }, 10000);
    }, []); // runs only once

    useEffect(() => {
        
    }, [spinClass])


    return (
        <div className={`${cats[spinClass]} z-[-1]`}>
            
        </div>
    )
}

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
        name: "Stand proud, you're strong",
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
        desc: "Attract Gojocat and Sukatna in the same session.",
        condition: {
        }
    },
]

export { CenterScreen, Modal, SpinningCat, achievements }