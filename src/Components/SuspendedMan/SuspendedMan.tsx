import React, { useRef, useEffect } from 'react';
import { SuspendedManProps } from '../../Types/index';
// @ts-ignore
import classes from './SuspendedMan.module.css';

const SuspendedMan: React.FC<SuspendedManProps> = ({ lives, maxLives }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageIndexStart = 1;
    const imageIndexEnd = 5;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (ctx && canvas) {
            const image = new Image();
            const svgPath = getSVGPath(lives);
            image.src = svgPath;

            image.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
            };
        }
    }, [lives]);

    const getSVGPath = (lives: number): string => {
        const imageIndex = Math.round((lives / maxLives) * (imageIndexEnd - imageIndexStart)) + imageIndexStart;
        let clampedImageIndex = Math.min(Math.max(imageIndex, imageIndexStart), imageIndexEnd);
        
        if (clampedImageIndex === imageIndexStart && lives !== 0) {
            clampedImageIndex = imageIndexStart + 1;
        }
    
        return `images/svg/man/life=${clampedImageIndex}.svg`;
    };

    return (
        <div>
            <canvas ref={canvasRef} width={'400px'} height={window.innerHeight} className={classes['suspended-man']} />
        </div>
    );
};

export default SuspendedMan;