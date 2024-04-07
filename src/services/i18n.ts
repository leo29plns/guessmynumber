import axios from 'axios';

let localeCache: string | null = null;
let translationCache: any = {};

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
    if (localeCache) {
        return localeCache;
    }

    const cookieLocale = getCookieLocale();
    
    if (!cookieLocale) {
        const browserLocale = getBrowserLocale();

        setCookieLocale(browserLocale);
        return browserLocale;
    }
    
    return cookieLocale;
};

export const setLocale = (locale: string): void => {
    setCookieLocale(locale);
    window.location.reload();
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

export const preloadTranslation = async (): Promise<void> => {
    const locale = getLocale();
    const fallbackLocale = import.meta.env.VITE_APP_FALLBACK_LOCALE as string;

    const translateObject = async (obj: Record<string, any>, fromLocale: string, toLocale: string): Promise<Record<string, any>> => {
        const translatedObj: Record<string, any> = {};

        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                const translatedText = await translateText(obj[key], fromLocale, toLocale);
                translatedObj[key] = translatedText;
            } else if (typeof obj[key] === 'object') {
                translatedObj[key] = await translateObject(obj[key], fromLocale, toLocale);
            }
        }

        return translatedObj;
    };

    try {
        const response = await axios.get(`./translations/${locale}.json`);

        translationCache = response.data['data'];
    } catch {
        console.error(`Translation file for locale ${locale} not found.`);
    }

    if (!translationCache) {
        try {
            const response = await axios.get(`./translations/${fallbackLocale}.json`);
            const fallbackTranslations = response.data['data'];

            translationCache = await translateObject(fallbackTranslations, fallbackLocale, locale);
        } catch {
            console.error(`Translation file for fallback locale ${fallbackLocale} not found.`);
        }
    }
};

export const t = (key: string): string => {
    const translationFile = translationCache;
    const keyParts = key.split('.');
    let translation = '';

    if (!translationFile) {
        console.error('Translation file not found.');
        return key;
    }

    translation = keyParts.reduce((acc, curr) => {
        if (acc && acc[curr]) {
            return acc[curr];
        } else {
            console.error(`Translation key '${key}' not found.`);
            return key;
        }
    }, translationFile);

    return translation;
};