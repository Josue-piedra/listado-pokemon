import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, 
    },
    resources: {
        en: {
          translation: {
            title: "Kanto Pokédex",
            searchPlaceholder: "Search Pokémon...",
            previous: "Previous",
            next: "Next",
            pokemonId: "ID",
            height: "Height",
            weight: "Weight",
            baseExperience: "Base Experience",
            description: "Description",
            descriptionNotAvailable: "Description not available.",
            pokemonNotFound: "Pokémon not found.",
            generalData: "General Data",
            types: "Types",
            abilities: "Abilities",
            baseStats: "Base Stats",
            sprites: "Sprites",
            backToHome: "Back to Home",
          },
        },
        es: {
          translation: {
            title: "Pokédex Kanto",
            searchPlaceholder: "Buscar Pokémon...",
            previous: "Anterior",
            next: "Siguiente",
            pokemonId: "ID",
            height: "Altura",
            weight: "Peso",
            baseExperience: "Experiencia Base",
            description: "Descripción",
            descriptionNotAvailable: "Descripción no disponible.",
            pokemonNotFound: "No se encontró el Pokémon.",
            generalData: "Datos Generales",
            types: "Tipos",
            abilities: "Habilidades",
            baseStats: "Estadísticas Base",
            sprites: "Sprites",
            backToHome: "Volver a la Página Principal",
          },
        },
      },
  });

export default i18n;
