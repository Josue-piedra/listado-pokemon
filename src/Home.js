import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Home = ({ pokemonList }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Paginación
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(pokemonList.filter((pokemon) => pokemon.name.includes(searchTerm)).length / itemsPerPage);

  // Obtener los Pokémon para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemons = pokemonList
    .filter((pokemon) => pokemon.name.includes(searchTerm))
    .slice(startIndex, startIndex + itemsPerPage);

  // Funciones de paginación
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="bg-red-600 text-center py-4">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </div>

      <div className="flex justify-center mt-6 relative">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="bg-gray-700 text-white p-2 pl-10 rounded-lg outline-none"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Lista de Pokémon */}
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {currentPokemons.map((pokemon) => (
          <li key={pokemon.id} className="bg-gray-800 rounded-xl p-4 text-center">
            <Link to={`/pokemon/${pokemon.id}`}>
              <h2 className="text-lg font-semibold">{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              {/* Mostrar los tipos de Pokémon */}
              <div className="mt-2">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className="bg-blue-500 text-white rounded-full py-1 px-3 text-sm mr-2">
                    {type.type.name}
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
          className="bg-red-600 text-white py-2 px-4 rounded-lg mr-4"
        >
          {t('previous')}
        </button>
        <span className="text-white">{`${currentPage} / ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-red-600 text-white py-2 px-4 rounded-lg ml-4"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default Home;