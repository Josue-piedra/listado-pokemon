import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const PokemonDetail = ({ pokemonList }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedPokemon = pokemonList.find((p) => p.id === parseInt(id));
  const [description, setDescription] = useState('');

  // Ejecutar cada vez que cambie el idioma
  useEffect(() => {
    if (selectedPokemon) {
      fetch(selectedPokemon.species.url)
        .then((response) => response.json())
        .then((speciesData) => {
          // Filtrar la descripción en el idioma actual
          const languageCode = i18n.language === 'es' ? 'es' : 'en';
          const desc = speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === languageCode
          );

          setDescription(desc ? desc.flavor_text : t('descriptionNotAvailable'));
        })
        .catch((error) => console.error('Error fetching Pokémon description:', error));
    }
  }, [selectedPokemon, i18n.language, t]);

  // Traducir tipos y habilidades 
  const translateTypeOrAbility = (term) => {
    // Verifica si ya hay una traducción disponible para el término
    //if (t(term) !== term) {
    return t(term); // Devuelve la traducción
    // }
    //return term; // Si no se encuentra traducción, devuelve el término original
  };

  if (!selectedPokemon) return <p className="p-4 text-white">{t('pokemonNotFound')}</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Encabezado */}
      <div className="bg-red-600 text-center py-4 mb-7 rounded-lg">
        <h1 className="text-4xl font-bold">{selectedPokemon.name.toUpperCase()}</h1>
      </div>

      {/* Sprites */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">{t('sprites')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          <img src={selectedPokemon.sprites.front_default} alt="Front" className="h-32 w-32" />
          <img src={selectedPokemon.sprites.back_default} alt="Back" className="h-32 w-32" />
          <img src={selectedPokemon.sprites.front_shiny} alt="Shiny Front" className="h-32 w-32" />
          <img src={selectedPokemon.sprites.back_shiny} alt="Shiny Back" className="h-32 w-32" />
        </div>
      </div>

      {/* Descripción */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t('description')}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      {/* Información General */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">{t('generalData')}</h2>
        <p>{t('pokemonId')}: {selectedPokemon.id}</p>
        <p>{t('height')}: {selectedPokemon.height} dm</p>
        <p>{t('weight')}: {selectedPokemon.weight} hg</p>
        <p>{t('baseExperience')}: {selectedPokemon.base_experience}</p>
      </div>

      {/* Tipos y Habilidades */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{t('types')}</h2>
          <ul>
            {selectedPokemon.types.map((type) => (
              <li key={type.type.name} className="text-gray-400 capitalize">
                {translateTypeOrAbility(type.type.name)} {/* Traducir el tipo */}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{t('abilities')}</h2>
          <ul>
            {selectedPokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="text-gray-400 capitalize">
                {translateTypeOrAbility(ability.ability.name)} {/* Traducir la habilidad */}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Estadísticas Base */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">{t('baseStats')}</h2>
        {selectedPokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="mb-2">
            <p className="text-gray-400 capitalize">{stat.stat.name}: {stat.base_stat}</p>
            <div className="w-full bg-gray-600 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(stat.base_stat / 150) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación entre Pokémon */}
      <div className="mt-8 flex justify-center gap-6">
        <button
          className="bg-gray-700 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-gray-900"
          onClick={() => navigate(`/pokemon/${Math.max(1, selectedPokemon.id - 1)}`)}
        >
          ← {t('previous')}
        </button>
        <button
          className="bg-gray-700 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-gray-900"
          onClick={() => navigate(`/pokemon/${selectedPokemon.id + 1}`)}
        >
          {t('next')} →
        </button>
      </div>

      {/* Botón para volver a la página principal */}
      <div className="mt-8 text-center">
        <button
          className="bg-red-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-700"
          onClick={() => navigate('/')}
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
};

export default PokemonDetail; 