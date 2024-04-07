import React, { useState, useEffect } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import GuessedDisplay from '../GuessedDisplay/GuessedDisplay';
import LivesDisplay from '../LivesDisplay/LivesDisplay';
import { fetchDataFromApi } from '../../services/api';
import { translateText } from '../../services/i18n';
import { GameProps, GuessedDigit } from '../../Types/index';
import SuspendedMan from '../SuspendedMan/SuspendedMan';
import confetti from 'canvas-confetti';
// @ts-ignore
import classes from './Game.module.css';

const Game: React.FC<GameProps> = ({ apiEndpoint, initialLives, locale, translateFromWeb }) => {
    const initialKeys = Array(10).fill(true);

    const [keys, setKeys] = useState<boolean[]>(initialKeys);
    const [subject, setSubject] = useState<string>('Please wait');
    const [guessedDigits, setGuessedDigits] = useState<GuessedDigit[]>([]);
    const [lives, setLives] = useState<number>(initialLives);

    const loadSubject = async () => {
        const data = await fetchDataFromApi(apiEndpoint, locale);

        const toGuess = (data.type === 'date') ? (new Date(data.toGuess)).toLocaleDateString(locale) : data.toGuess.toString();
        const guessedDigitsArray: GuessedDigit[] = Array.from(toGuess, (char: string) => ({
            value: char,
            guessed: /[0-9]/.test(char) ? false : true
        }));

        setGuessedDigits(guessedDigitsArray);
        setSubject(data.subject);
        setLives(initialLives);
        setKeys(initialKeys);

        if (data.locale !== locale && translateFromWeb) {
            const subject = await translateText(data.subject, data.locale, locale);

            setSubject(subject);
            console.log('Locale not found, text was translated.');
        }
    };

    const endGame = () => {
        const updatedGuessedDigits = guessedDigits.map(digit => ({ ...digit, guessed: true }));
        const updatedKeys = keys.map(() => false);

        setGuessedDigits(updatedGuessedDigits);
        setKeys(updatedKeys);
    };

    const winGame = () => {
        confetti();
        endGame();
    }

    const loseGame = () => {
        endGame();
    }

    useEffect(() => {
        loadSubject();
    }, [apiEndpoint]);

    const handleGuess = (guess: number) => {
        const index = guessedDigits.findIndex(digit => !digit.guessed);

        if (guessedDigits[index].value === guess.toString()) {
            const updatedGuessedDigits = [...guessedDigits];

            updatedGuessedDigits[index] = { ...updatedGuessedDigits[index], guessed: true };
            setGuessedDigits(updatedGuessedDigits);
            setKeys(initialKeys);

            if (updatedGuessedDigits.every(digit => digit.guessed)) {
                winGame();
            }
        } else {
            const updatedKeys = [...keys];

            updatedKeys[guess] = false;
            setKeys(updatedKeys);
            setLives((prevLives) => {
                if (lives <= 1) {
                    loseGame();
                }

                return prevLives - 1
            });
        }
    };

    return (
        <div className={classes['main-content']}>
            <h1 className={classes['site-title']}>Guess My Number</h1>
            <div className={classes['guess']}>
                <h2>{subject}</h2>
                <GuessedDisplay guessedDigits={guessedDigits} />
            </div>
            <LivesDisplay lives={lives} />
            <Keyboard keys={keys} onGuess={handleGuess} loadSubject={loadSubject} />
            <SuspendedMan lives={lives} maxLives={initialLives} />
        </div>
    );
};

export default Game;