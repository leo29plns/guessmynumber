import React, { useEffect } from 'react';
import { KeyboardProps } from '../../Types/index';
// @ts-ignore
import classes from './Keyboard.module.css';

const Keyboard: React.FC<KeyboardProps> = ({ keys, onGuess, loadSubject }) => {
    const handleClick = (guess: number) => {
        if (keys[guess]) {
            onGuess(guess);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const keyIndex = event.key;

            if (/[0-9]/.test(keyIndex)) {
                handleClick(parseInt(keyIndex));
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [keys]);

    const buttons = keys.map((enabled, index) => (
        <button key={index} data-key={index.toString()} onClick={() => handleClick(index)} disabled={!enabled}>
            {enabled ? index : <del>{index}</del>}
        </button>
    ));

    return (
        <div className={classes['keyboard']}>
            {buttons}
            <button className={classes['next']} onClick={loadSubject}>Next</button>
        </div>
    );
};

export default Keyboard;