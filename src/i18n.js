import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Idioma por defecto
    debug: true,
    interpolation: {
      escapeValue: false, // No escapar valores
    },
    resources: {
      en: {
        translation: {
          title: " Pokemon",
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
          enLanguage: "EN English",
          esLanguage: "ES Español",
          // Tipos de Pokémon (los primeros 151)
          typeNormal: "Normal",
          typeFire: "Fire",
          typeWater: "Water",
          typeGrass: "Grass",
          typeElectric: "Electric",
          typePsychic: "Psychic",
          typeIce: "Ice",
          typeFighting: "Fighting",
          typePoison: "Poison",
          typeBug: "Bug",
          typeGhost: "Ghost",
          typeFairy: "Fairy",
          typeFlying: "Flying",
          typeDragon: "Dragon",
          typeDark: "Dark",
          typeRock:"Rock",
          typeGround:"Ground",
          typeSteel: "Steel",
          // Habilidades de Pokémon
          abilityOvergrow: "Overgrow",
          abilityBlaze: "Blaze",
          abilityTorrent: "Torrent",
          abilityLevitate: "Levitate",
          abilityIntimidate: "Intimidate",
          abilityKeenEye: "Keen Eye",
          abilityChlorophyll: "Chlorophyll",
          abilityRunAway: "Run Away",
          abilityStench: "Stench",
          abilityShedSkin: "Shed Skin",
          abilitySynchronize: "Synchronize",
          abilityClearBody: "Clear Body",
          abilityVitalSpirit: "Vital Spirit",
          abilityImmunity: "Immunity",
          abilityThickFat: "Thick Fat",
          // Estadísticas base
          baseStatHp: "HP",
          baseStatAttack: "Attack",
          baseStatDefense: "Defense",
          baseStatSpecialAttack: "Special Attack",
          baseStatSpecialDefense: "Special Defense",
          baseStatSpeed: "Speed",
        },
      },
      es: {
        translation: {
          title: " Pokemon",
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
          enLanguage: "EN Inglés",
          esLanguage: "ES Español",
          // Tipos de Pokémon (los primeros 151)
          typeNormal: "Normal",
          typeFire: "Fuego",
          typeWater: "Agua",
          typeGrass: "Planta",
          typeElectric: "Eléctrico",
          typePsychic: "Psíquico",
          typeIce: "Hielo",
          typeFighting: "Lucha",
          typePoison: "Veneno",
          typeBug: "Bicho",
          typeGhost: "Fantasma",
          typeFairy: "Hada",
          typeFlying: "Volador",
          typeDragon: "Dragon",
          typeDark: "Siniestro",
          typeRock:"Roca",
          typeGround:"Tierra",
          typeSteel:"Acero",
          // Habilidades de Pokémon
          abilityOvergrow: "Espesura",
          abilityBlaze: "Llamarada",
          abilityTorrent: "Torrente",
          abilityLevitate: "Levitación",
          abilityIntimidate: "Intimidación",
          abilityKeenEye: "Ojo Avizor",
          abilityChlorophyll: "Clorofila",
          abilityRunAway: "Huir",
          abilityStench: "Hedor",
          abilityShedSkin: "Piel Árida",
          abilitySynchronize: "Sincronizar",
          abilityClearBody: "Cuerpo Claro",
          abilityVitalSpirit: "Espíritu Vital",
          abilityImmunity: "Inmunidad",
          abilityThickFat: "Grasa Corporal",
          // Estadísticas base
          baseStatHp: "PS",
          baseStatAttack: "Ataque",
          baseStatDefense: "Defensa",
          baseStatSpecialAttack: "Ataque Especial",
          baseStatSpecialDefense: "Defensa Especial",
          baseStatSpeed: "Velocidad",
        },
      },
    },
  });

export default i18n;
