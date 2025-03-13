import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const PokemonDetail = ({ pokemonList }) => {
  const { t } = useTranslation(); // Traducción de los textos
  const { id } = useParams(); // Obtener el ID del Pokémon de la URL
  const navigate = useNavigate(); // Función de navegación para mover entre páginas
  const selectedPokemon = pokemonList.find((p) => p.id === parseInt(id)); // Encontrar el Pokémon seleccionado por ID
  const [description, setDescription] = useState(''); // Estado para almacenar la descripción del Pokémon

  // Ejecutar cada vez que cambie el idioma
  useEffect(() => {
    if (selectedPokemon) {
      fetch(selectedPokemon.species.url)
        .then((response) => response.json())
        .then((speciesData) => {
          // Filtrar la descripción en el idioma actual
          const languageCode = i18n.language === 'es' ? 'es' : 'en'; // Definir el idioma (español o inglés)
          const desc = speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === languageCode
          );

          setDescription(desc ? desc.flavor_text : t('descriptionNotAvailable')); // Establecer la descripción
        })
        .catch((error) => console.error('Error fetching Pokémon description:', error));
    }
  }, [selectedPokemon, t]); // Ejecutar cada vez que el Pokémon o el idioma cambien

  // Función para traducir tipos y habilidades
  const translateType = (type) => {
    return t(`type${type.charAt(0).toUpperCase() + type.slice(1)}`) || type; // Traducir el tipo de Pokémon
  };

  const translateAbility = (ability) => {
    return t(`ability${ability.charAt(0).toUpperCase() + ability.slice(1)}`) || ability; // Traducir la habilidad
  };

  if (!selectedPokemon) return <p className="p-4 text-white">{t('pokemonNotFound')}</p>; // Si no se encuentra el Pokémon, muestra mensaje de error

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Encabezado */}
      <div className="bg-red-600 text-center py-4 mb-7 rounded-lg">
        <h1 className="text-4xl font-bold">{selectedPokemon.name.toUpperCase()}</h1> {/* Nombre del Pokémon */}
      </div>

      {/* Sprites */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t('sprites')}</h2> {/* Título de los sprites */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {/* Muestra los sprites del Pokémon */}
          <img src={selectedPokemon.sprites.front_default} alt="Front" className="h-32 w-32" />
          <img src={selectedPokemon.sprites.back_default} alt="Back" className="h-32 w-32" />
          <img src={selectedPokemon.sprites.front_shiny} alt="Shiny Front" className="h-32 w-32" />
          <img src={selectedPokemon.sprites.back_shiny} alt="Shiny Back" className="h-32 w-32" />
        </div>
      </div>

      {/* Descripción */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t('description')}</h2> {/* Título de la descripción */}
        <p className="text-gray-400">{description}</p> {/* Descripción del Pokémon */}
      </div>

      {/* Información General */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">{t('generalData')}</h2> {/* Título de datos generales */}
        <p>{t('pokemonId')}: {selectedPokemon.id}</p> {/* ID del Pokémon */}
        <p>{t('height')}: {selectedPokemon.height} dm</p> {/* Altura del Pokémon */}
        <p>{t('weight')}: {selectedPokemon.weight} hg</p> {/* Peso del Pokémon */}
        <p>{t('baseExperience')}: {selectedPokemon.base_experience}</p> {/* Experiencia base */}
      </div>

      {/* Tipos y Habilidades */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{t('types')}</h2> {/* Título de tipos */}
          <ul>
            {selectedPokemon.types.map((type) => (
              <li key={type.type.name} className="text-gray-400 capitalize">
                {translateType(type.type.name)} {/* Traducir el tipo */}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{t('abilities')}</h2> {/* Título de habilidades */}
          <ul>
            {selectedPokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="text-gray-400 capitalize">
                {translateAbility(ability.ability.name)} {/* Traducir la habilidad */}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Estadísticas Base */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">{t('baseStats')}</h2> {/* Título de estadísticas base */}
        {selectedPokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="mb-2">
            <p className="text-gray-400 capitalize">{t(stat.stat.name)}: {stat.base_stat}</p> {/* Estadística del Pokémon */}
            <div className="w-full bg-gray-600 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(stat.base_stat / 150) * 100}%` }} // Barra de progreso con el valor de la estadística
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación entre Pokémon */}
      <div className="mt-8 flex justify-center gap-6">
        <button
          className="bg-gray-700 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-gray-900"
          onClick={() => navigate(`/pokemon/${Math.max(1, selectedPokemon.id - 1)}`)} // Navegar al Pokémon anterior
        >
          ← {t('previous')}
        </button>
        <button
          className="bg-gray-700 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-gray-900"
          onClick={() => navigate(`/pokemon/${selectedPokemon.id + 1}`)} // Navegar al siguiente Pokémon
        >
          {t('next')} →
        </button>
      </div>

      {/* Botón para volver a la página principal */}
      <div className="mt-8 text-center">
        <button
          className="bg-red-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-700"
          onClick={() => navigate('/')} // Volver a la página principal
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
};

export default PokemonDetail;

