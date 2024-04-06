export interface GameProps {
    apiEndpoint: string;
    initialLives: number;
    locale: string;
    translateFromWeb: boolean;
}

export interface KeyboardProps {
    keys: boolean[];
    onGuess: (guess: number) => void;
    loadSubject: () => void;
}

export interface GuessedDigit {
    value: string;
    guessed: boolean;
}

export interface GuessedDisplayProps {
    guessedDigits: GuessedDigit[];
}

export interface LivesDisplayProps {
    lives: number;
}

export interface SuspendedManProps {
    lives: number;
    maxLives: number;
}