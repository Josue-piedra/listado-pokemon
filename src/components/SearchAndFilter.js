import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Componente que muestra la barra de búsqueda y los botones de filtrado.
const SearchAndFilter = ({ setSearchTerm, setSelectedType, translateTypeOrAbility }) => {
  const { t } = useTranslation();

  // Lista de tipos de Pokémon para generar los botones de filtro.
  const types = [
    'fire', 'water', 'grass', 'electric', 'bug', 'psychic', 'normal',
    'fairy', 'dragon', 'ice', 'ghost', 'dark', 'steel', 'fighting',
    'rock', 'ground', 'poison', 'flying'
  ];

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Barra de búsqueda */}
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="bg-gray-700 text-white p-3 pl-10 pr-4 rounded-xl outline-none w-full sm:w-72 shadow-lg focus:ring-2 focus:ring-red-600 transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Botones de filtrado */}
      <div className="flex flex-wrap gap-2">
        {/* Botón para mostrar todos los tipos */}
        <button
          onClick={() => setSelectedType('')}
          className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 shadow-md transition transform hover:scale-105"
        >
          {t('allTypes')}
        </button>
        {/* Se generan los botones para cada tipo */}
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className="bg-gray-800 text-white p-2 rounded-md shadow-md hover:bg-opacity-80 transition transform hover:scale-105"
          >
            {translateTypeOrAbility(type)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
