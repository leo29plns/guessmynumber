import React from 'react';
import { MessengerProps } from '../../Types/index';
// @ts-ignore
import classes from './Messenger.module.css';

const Messenger: React.FC<MessengerProps> = ({ lives }) => {
    const hearts = Array.from({ length: lives }, (_, index) => <span key={index}>❤️</span>);

    return (
        <div aria-label={lives.toString()} className={classes['lives']}>
            {hearts}
        </div>
    );
};

export default Messenger;