import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = ({ pokemon }) => {
  const { id } = useParams();
  const selectedPokemon = pokemon.find(p => p.id === parseInt(id));

  if (!selectedPokemon) return <p className="p-4">No se encontró el Pokémon.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-red-600">{selectedPokemon.name}</h1>
      <div className="flex flex-col items-center mt-4">
        <img
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
          className="h-64 w-64 object-contain"
        />
        <div className="mt-6 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Habilidades:</h2>
          <ul className="list-disc list-inside mb-4">
            {selectedPokemon.abilities.map(ability => (
              <li key={ability.ability.name} className="text-gray-700">{ability.ability.name}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold text-gray-800">Tipos:</h2>
          <ul className="list-disc list-inside">
            {selectedPokemon.types.map(type => (
              <li key={type.type.name} className="text-gray-700">{type.type.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
