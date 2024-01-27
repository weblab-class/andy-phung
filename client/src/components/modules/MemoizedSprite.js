import React, { memo } from 'react';
import { AnimatedSprite } from '@pixi/react';
import { Texture } from 'pixi.js';


const MemoizedSprite = memo((props) => { // j takes in textures, x, y
    return (
            <AnimatedSprite
            width={84.75}
            height={60.1875}
            x={props.x}
            y={-1 * props.y}
            textures={props.textures}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.05}
            className="fade-in-cat"
            />
        
    );
});

export { MemoizedSprite }
