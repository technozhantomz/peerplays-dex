import {getStorage} from "../storage";
import {defaultLocales} from "../../params/defaultLocales";

export const localeFromStorage = () => {
    let selectedLang = getStorage('settings').language;

    if(!selectedLang){
        const defaultLanguage = navigator.languages[0].split('-')[0].toUpperCase();
        selectedLang = defaultLocales.some(e => e.type === defaultLanguage) ? defaultLanguage : 'EN';
    }

    return selectedLang;
};
