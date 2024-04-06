import React from 'react';
import Game from './Game';
import { getLocale }  from './services/i18n';

const App: React.FC = () => {
    // @ts-ignore
    const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT as string;
    // @ts-ignore
    const initialLives = import.meta.env.VITE_APP_LIVES as number;
    const locale = getLocale();
    const translateFromWeb = false;

    return (
        <Game apiEndpoint={apiEndpoint} initialLives={initialLives} locale={locale} translateFromWeb={translateFromWeb} />
    );
};

export default App;