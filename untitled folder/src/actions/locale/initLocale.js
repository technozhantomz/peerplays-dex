import {defaultLocales} from "../../params/defaultLocales";
import counterpart from "counterpart";
import {setLocale} from "./setLocale";
import {localeFromStorage} from "./localeFromStorage";

export const initLocale = () => {
    defaultLocales.forEach(({type, json}) => counterpart.registerTranslations(type, json));
    setLocale(localeFromStorage());
};
