import React from 'react';
import { GuessedDisplayProps } from '../../Types/index';
// @ts-ignore
import classes from './GuessedDisplay.module.css';

const GuessedDisplay: React.FC<GuessedDisplayProps> = ({ guessedDigits }) => {
    return (
        <div className={classes['guessed-display']}>
            {guessedDigits.map((digit, index) => (
                <div key={index}>{digit.guessed ? digit.value : <>&nbsp;</>}</div>
            ))}
        </div>
    );
};

export default GuessedDisplay;