import axios from 'axios';

const getBrowserLocale = (): string => {
    // @ts-ignore
    return navigator.language ?? import.meta.env.VITE_APP_FALLBACK_LOCALE as string;
};

const getCookieLocale = (): string | undefined => {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');

        if (name.trim() === 'locale') {
            return value.trim();
        }
    }
    return undefined;
};

const setCookieLocale = (locale: string): void => {
    document.cookie = `locale=${locale};`;
};

export const getLocale = (): string => {
    const cookieLocale = getCookieLocale();
    
    if (!cookieLocale) {
        const browserLocale = getBrowserLocale();

        setCookieLocale(browserLocale);
        return browserLocale;
    }
    
    return cookieLocale;
};

export const translateText = async (text: string, fromLocale: string, toLocale: string): Promise<string> => {
    try {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: {
                q: text,
                langpair: `${fromLocale}|${toLocale}`
            }
        });

        const translatedText = response.data.responseData.translatedText;

        if (translatedText) {
            return translatedText;
        } else {
            console.error('Translation failed: ', response.data.responseData.error);

            return text;
        }
    } catch (error) {
        console.error('Translation error: ', error);

        return text;
    }
};
