import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import Pagination from './components/Pagination';

const PokemonDetail = ({ pokemonList }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar el Pokémon seleccionado según el ID obtenido de la URL
  const selectedPokemon = pokemonList.find((p) => p.id === parseInt(id));
  const [description, setDescription] = useState('');

  // Obtener la descripción del Pokémon según el idioma actual
  useEffect(() => {
    if (selectedPokemon) {
      fetch(selectedPokemon.species.url)
        .then((response) => response.json())
        .then((speciesData) => {
          const languageCode = i18n.language === 'es' ? 'es' : 'en';
          const desc = speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === languageCode
          );
          setDescription(desc ? desc.flavor_text : t('descriptionNotAvailable'));
        })
        .catch((error) =>
          console.error('Error fetching Pokémon description:', error)
        );
    }
  }, [selectedPokemon, t]);

  // Funciones de traducción para tipos y habilidades
  const translateType = (type) => {
    return t(`type${type.charAt(0).toUpperCase() + type.slice(1)}`) || type;
  };

  const translateAbility = (ability) => {
    return t(`ability${ability.charAt(0).toUpperCase() + ability.slice(1)}`) || ability;
  };

  // Si no se encuentra el Pokémon, muestra un mensaje de error
  if (!selectedPokemon)
    return <p className="p-4 text-white">{t('pokemonNotFound')}</p>;

  // Calcular el índice actual y datos de paginación
  const currentIndex = pokemonList.findIndex((p) => p.id === parseInt(id));
  const currentPage = currentIndex + 1;
  const totalPages = pokemonList.length;

  // Funciones para navegar al Pokémon previo o siguiente
  const handlePreviousPage = () => {
    if (currentIndex > 0) {
      navigate(`/pokemon/${pokemonList[currentIndex - 1].id}`);
    }
  };

  const handleNextPage = () => {
    if (currentIndex < pokemonList.length - 1) {
      navigate(`/pokemon/${pokemonList[currentIndex + 1].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Encabezado */}
      <div className="bg-red-600 text-center py-4 mb-7 rounded-lg">
        <h1 className="text-4xl font-bold">
          {selectedPokemon.name.toUpperCase()}
        </h1>
      </div>

      {/* Sprites */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t('sprites')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          <img
            src={selectedPokemon.sprites.front_default}
            alt="Front"
            className="h-32 w-32"
          />
          <img
            src={selectedPokemon.sprites.back_default}
            alt="Back"
            className="h-32 w-32"
          />
          <img
            src={selectedPokemon.sprites.front_shiny}
            alt="Shiny Front"
            className="h-32 w-32"
          />
          <img
            src={selectedPokemon.sprites.back_shiny}
            alt="Shiny Back"
            className="h-32 w-32"
          />
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
        <p>
          {t('pokemonId')}: {selectedPokemon.id}
        </p>
        <p>
          {t('height')}: {selectedPokemon.height} dm
        </p>
        <p>
          {t('weight')}: {selectedPokemon.weight} hg
        </p>
        <p>
          {t('baseExperience')}: {selectedPokemon.base_experience}
        </p>
      </div>

      {/* Tipos y Habilidades */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{t('types')}</h2>
          <ul>
            {selectedPokemon.types.map((type) => (
              <li key={type.type.name} className="text-gray-400 capitalize">
                {translateType(type.type.name)}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{t('abilities')}</h2>
          <ul>
            {selectedPokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="text-gray-400 capitalize">
                {translateAbility(ability.ability.name)}
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
            <p className="text-gray-400 capitalize">
              {t(stat.stat.name)}: {stat.base_stat}
            </p>
            <div className="w-full bg-gray-600 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(stat.base_stat / 150) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
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

      {/* Paginación para navegar entre Pokémon */}
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
};

export default PokemonDetail;
