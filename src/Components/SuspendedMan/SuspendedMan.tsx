import React, { useRef, useEffect } from 'react';
import { SuspendedManProps } from '../../Types/index';
import classes from './SuspendedMan.module.css';

const SuspendedMan: React.FC<SuspendedManProps> = ({ lives, maxLives }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const imageIndexStart = 1;
    const imageIndexEnd = 5;

    useEffect(() => {
        const image = imageRef.current;

        if (image) {
            const yPos = image.parentElement!.offsetHeight - image.offsetHeight - (lives * (image.parentElement!.offsetHeight - image.offsetHeight)) / maxLives;

            image.style.transform = `translate3D(0, ${yPos}px, 0)`;
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
        <div className={classes['suspended-man-canvas']}>
            <img ref={imageRef} src={getSVGPath(lives)} alt="" className={classes['suspended-man']} />
        </div>
    );
};

export default SuspendedMan;
