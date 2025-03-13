import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

const Home = ({ pokemonList }) => {
  const { t } = useTranslation(); // Traducción de los textos
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Espera de 500ms antes de aplicar el filtro
  const [selectedType, setSelectedType] = useState(''); // Tipo de Pokémon seleccionado para el filtrado
  const [currentPage, setCurrentPage] = useState(1); // Página actual para la paginación
  const itemsPerPage = 12; // Número de elementos por página

  // Filtrar los Pokémon según el término de búsqueda y el tipo seleccionado
  const filteredPokemons = useMemo(() => {
    return pokemonList.filter((pokemon) =>
      (pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
      (selectedType ? pokemon.types.some(type => type.type.name === selectedType) : true)
    );
  }, [debouncedSearchTerm, selectedType, pokemonList]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  // Obtener los Pokémon para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, startIndex + itemsPerPage);

  // Funciones de paginación
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Función para traducir los tipos y habilidades
  const translateTypeOrAbility = (term, type = true) => {
    return type ? t(`type${term.charAt(0).toUpperCase() + term.slice(1)}`) || term : t(`ability${term.charAt(0).toUpperCase() + term.slice(1)}`) || term;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Título de la página */}
      <div className="bg-red-600 text-center py-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-6xl font-bold" style={{ fontFamily: 'Press Start 2P', fontWeight: 'normal' }}>
          {t('title')}
        </h1>
      </div>

      {/* Contenedor para la barra de búsqueda y los botones de filtro */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Barra de búsqueda y botones */}
        <div className="flex items-center gap-3 w-50">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="bg-gray-700 text-white p-3 pl-10 pr-4 rounded-xl outline-none w-full sm:w-72 shadow-lg focus:ring-2 focus:ring-red-600 transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedType('')} className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 shadow-md transition transform hover:scale-105">
              {t('allTypes')}
            </button>
            {['fire', 'water', 'grass', 'electric', 'bug', 'psychic', 'normal', 'fairy', 'dragon', 'ice', 'ghost', 'dark', 'steel', 'fighting', 'rock', 'ground', 'poison', 'flying'].map((type) => (
              <button key={type} onClick={() => setSelectedType(type)} className={`bg-gray-800 text-white p-2 rounded-md shadow-md hover:bg-opacity-80 transition transform hover:scale-105`}>
                {translateTypeOrAbility(type)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Pokémon */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-8">
        {currentPokemons.map((pokemon) => (
          <li key={pokemon.id} className="bg-gray-800 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl p-4 text-center relative">
            {/* ID del Pokémon en la esquina superior izquierda dentro del recuadro */}
            <div className="absolute top-2 left-2 text-white bg-gray-800 opacity-80 rounded-full px-3 py-1 text-lg">
              #{pokemon.id}
            </div>
            <Link to={`/pokemon/${pokemon.id}`} className="relative">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-full h-32 object-contain mb-4" />
              <h2 className="text-lg font-semibold">{pokemon.name}</h2>
              <div className="mt-2 flex justify-center space-x-2">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className="bg-gray-700 text-white rounded-full py-1 px-3 text-sm">{translateTypeOrAbility(type.type.name)}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8 space-x-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-red-600 text-white py-2 px-6 rounded-xl disabled:opacity-50 hover:bg-red-700 transform hover:scale-105">Previous</button>
        <span className="text-white">{`${currentPage} / ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-red-600 text-white py-2 px-6 rounded-xl disabled:opacity-50 hover:bg-red-700 transform hover:scale-105">Next</button>
      </div>
    </div>
  );
};

export default Home;
