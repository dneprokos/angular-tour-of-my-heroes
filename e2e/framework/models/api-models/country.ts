import { Currency } from "./currency";
import { Flags } from "./flags";
import { Language } from "./language";
import { RegionalBloc } from "./regional-block";
import { Translations } from "./translations";

//NOTE: There is no reason to describe all fields. Only those you gonna use. This one was created just as an example of full data.
export interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    subregion: string;
    region: string;
    population: number;
    latlng: number[];
    demonym: string;
    area: number;
    gini: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    flags: Flags;
    currencies: Currency[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs: RegionalBloc[];
    cioc: string;
    independent: boolean;
}