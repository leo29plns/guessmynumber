import React from 'react';
import { LivesDisplayProps } from '../../Types/index';
// @ts-ignore
import classes from './LivesDisplay.module.css';

const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives }) => {
    const hearts = Array.from({ length: lives }, (_, index) => <span key={index}>❤️</span>);

    return (
        <div aria-label={lives.toString()} className={classes['lives']}>
            {hearts}
        </div>
    );
};

export default LivesDisplay;