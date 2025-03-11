import React, { useState, useEffect, useMemo } from 'react';  
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

const Home = ({ pokemonList }) => {
  const { t } = useTranslation(); // Traducción de los textos
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Espera 500ms antes de aplicar el filtro
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtrar los Pokémon según el término de búsqueda
  const filteredPokemons = useMemo(() => {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, pokemonList]);

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

  // Función para traducir tipos y habilidades
  const translateTypeOrAbility = (term, type = true) => {
    // Si es un tipo (por defecto), se traduce con el prefijo "type"
    if (type) {
      return t(`type${term.charAt(0).toUpperCase() + term.slice(1)}`) || term;
    }
    // Si no es un tipo (es una habilidad), se traduce con el prefijo "ability"
    return t(`ability${term.charAt(0).toUpperCase() + term.slice(1)}`) || term;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="bg-red-600 text-center py-4">
        <h1 className="text-3xl font-bold">{t('title')}</h1> {/* Título de la página */}
      </div>

      {/* Campo de búsqueda */}
      <div className="flex justify-center mt-6 relative">
        <input
          type="text"
          placeholder={t('searchPlaceholder')} // Texto del placeholder
          className="bg-gray-700 text-white p-2 pl-10 rounded-lg outline-none"
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" /> {/* Icono de búsqueda */}
      </div>

      {/* Lista de Pokémon */}
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {currentPokemons.map((pokemon) => (
          <li key={pokemon.id} className="bg-gray-800 rounded-xl p-4 text-center">
            <Link to={`/pokemon/${pokemon.id}`}>
              <h2 className="text-lg font-semibold">{pokemon.name}</h2> {/* Nombre del Pokémon */}
              <img src={pokemon.sprites.front_default} alt={pokemon.name} /> {/* Imagen del Pokémon */}
              <div className="mt-2">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className="bg-blue-500 text-white rounded-full py-1 px-3 text-sm mr-2">
                    {translateTypeOrAbility(type.type.name)} {/* Traducción de los tipos */}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`bg-red-600 text-white py-2 px-4 rounded-lg mr-4 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {t('previous')} {/* Texto de "Anterior" */}
        </button>
        <span className="text-white">{`${currentPage} / ${totalPages}`}</span> {/* Indicador de página */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-red-600 text-white py-2 px-4 rounded-lg ml-4 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {t('next')} {/* Texto de "Siguiente" */}
        </button>
      </div>
    </div>
  );
};

export default Home;



