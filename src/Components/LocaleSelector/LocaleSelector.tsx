import React from 'react';
import localesFile from "../../assets/locales.json";
import { getLocale, setLocale } from '../../services/i18n';
import { Locale } from '../../Types/index';
// @ts-ignore
import classes from './LocaleSelector.module.css';

const LocaleSelector: React.FC = () => {
  const locales: Locale[] = localesFile.data;
  const defaultLocale = getLocale();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    setLocale(selectedLocale);
  };

  return (
    <select defaultValue={defaultLocale} onChange={handleLocaleChange} className={classes['select']}>
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.name}
        </option>
      ))}
    </select>
  );
};

export default LocaleSelector;