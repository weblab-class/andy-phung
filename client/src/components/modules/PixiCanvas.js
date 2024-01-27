import React, { memo } from 'react';
import { Stage, Container, AnimatedSprite } from '@pixi/react';
import { Texture } from 'pixi.js';


const PixiCanvas = memo((props) => { // for now, j takes in textures
    const textures = [
        Texture.from("https://cdn.discordapp.com/attachments/754243466241769515/1199658754052988938/comet_sitting.png?ex=65c35847&is=65b0e347&hm=a89fb29ae6d8db555d513b5db0f489177ce996b0370bd7847b51f7e576bea083&"),
        Texture.from("https://cdn.discordapp.com/attachments/754243466241769515/1199658979060625408/michi_sitting.png?ex=65c3587d&is=65b0e37d&hm=d8ae0499a971fa6955546b9b5a9ccb5de51c31ac418b2f92b5d68c984ef53efb&"),
        Texture.from("https://cdn.discordapp.com/attachments/754243466241769515/1199659577604583515/gojo_sitting.png?ex=65c3590b&is=65b0e40b&hm=145b2f03ebff45cc91da00fcff33a1f829c5e42137c3e5016a2db6a746cc908c&"),
        Texture.from("https://cdn.discordapp.com/attachments/754243466241769515/1199659715546861608/sukuna_sitting.png?ex=65c3592c&is=65b0e42c&hm=99952777e19fa9eab74362b4fe0b1fb27f7d452149b61f41d8a4755fc894bc33&"),
        Texture.from("https://cdn.discordapp.com/attachments/754243466241769515/1199659865665175582/oye_sitting.png?ex=65c35950&is=65b0e450&hm=544c43ef68aa6a8a21499ee1c759a1270189c32f78157d26f12908b00b429bd5&"),
    ];

    const width = 1200;
    const height = 250;
    const stageProps = {
        height,
        width,
        options: {
            backgroundAlpha: 0,
        },
    };

    return (
        <Stage className="absolute bottom-0 left-0 right-0 ml-auto mr-auto z-0 cafe-mockup-bg" width={1200} height={250} options={{ backgroundAlpha: 0 }}>
        <Container position={[150, 150]}>
        <AnimatedSprite
            width={84.75}
            height={60.1875}
            anchor={0.85}
            textures={textures}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.05}
        />
        </Container>
    </Stage>
    );
});

export { PixiCanvas }
