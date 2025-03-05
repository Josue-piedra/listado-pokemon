import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-gray-400',
  psychic: 'bg-pink-400',
  bug: 'bg-green-600',
  rock: 'bg-orange-700',
  ghost: 'bg-purple-800',
  dragon: 'bg-blue-900',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300'
};

const Home = ({ pokemonList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  // Calcular los Pokémon a mostrar en la página actual
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Encabezado */}
      <div className="bg-red-600 text-center py-4">
        <h1 className="text-3xl font-bold">POKEDEX KANTO</h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex justify-center mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            className="bg-gray-700 text-white p-2 pl-10 rounded-lg outline-none"
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Lista de Pokémon */}
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {currentPokemon.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-gray-800 rounded-xl p-4 text-center shadow-lg border border-gray-700"
          >
            <Link to={`/pokemon/${pokemon.id}`} className="block">
              <h2 className="text-lg font-semibold">{pokemon.name}</h2>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto h-24 w-24 mt-2"
              />
              <p className="text-gray-400">ID: {pokemon.id}</p>
              <div className="flex justify-center mt-2 space-x-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white ${typeColors[type.type.name] || 'bg-gray-500'}`}
                  >
                    {type.type.name.toUpperCase()}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-lg font-bold">{currentPage} / {totalPages}</span>
        <button
          className="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
