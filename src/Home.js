// Home.js
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import Pagination from "./components/Pagination.js";
import SearchAndFilter from './components/SearchAndFilter.js';
import PokemonList from './components/PokemonList.js';

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
    return type
      ? t(`type${term.charAt(0).toUpperCase() + term.slice(1)}`) || term
      : t(`ability${term.charAt(0).toUpperCase() + term.slice(1)}`) || term;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Título de la página */}
      <div className="bg-red-600 text-center py-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-6xl font-bold" style={{ fontFamily: 'Press Start 2P', fontWeight: 'normal' }}>
          {t('title')}
        </h1>
      </div>

      {/* Componente para la barra de búsqueda y los filtros */}
      <SearchAndFilter
        setSearchTerm={setSearchTerm}
        setSelectedType={setSelectedType}
        translateTypeOrAbility={translateTypeOrAbility}
      />

      {/* Componente para la lista de Pokémon */}
      <PokemonList
        pokemons={currentPokemons}
        translateTypeOrAbility={translateTypeOrAbility}
      />

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </div>
  );
};

export default Home;
