import React from 'react';
import { MessengerProps } from '../../Types/index';
// @ts-ignore
import classes from './Messenger.module.css';

const Messenger: React.FC<MessengerProps> = ({ message }) => {


    return (
        <p className={classes['message']}>
            {message}
        </p>
    );
};

export default Messenger;