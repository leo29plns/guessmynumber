import React, { useState, useEffect } from 'react';
import Keyboard from './Components/Keyboard/Keyboard';
import GuessedDisplay from './Components/GuessedDisplay/GuessedDisplay';
import LivesDisplay from './Components/LivesDisplay/LivesDisplay';
import { fetchDataFromApi } from './services/api';
import { translateText } from './services/i18n';
import { GameProps, GuessedDigit } from './Types/index';
import SuspendedMan from './Components/SuspendedMan/SuspendedMan';
// @ts-ignore
import classes from './Components/Game/index.module.css';

const Game: React.FC<GameProps> = ({ apiEndpoint, initialLives, locale, translateFromWeb }) => {
    const initialKeys = Array(10).fill(false);

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
                loadSubject();
            }
        } else {
            const updatedKeys = [...keys];

            updatedKeys[guess] = true;
            setKeys(updatedKeys);
            setLives((prevLives) => {
                if (lives <= 1) {
                    loadSubject();
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