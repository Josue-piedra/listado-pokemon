import React from 'react';
import { Link } from 'react-router-dom';

// Componente para representar la tarjeta de un Pokémon.
const PokemonCard = ({ pokemon, translateTypeOrAbility }) => {
  return (
    <li className="bg-gray-800 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl p-4 text-center relative">
      {/* ID del Pokémon */}
      <div className="absolute top-2 left-2 text-white bg-gray-800 opacity-80 rounded-full px-3 py-1 text-lg">
        #{pokemon.id}
      </div>
      <Link to={`/pokemon/${pokemon.id}`} className="relative">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-full h-32 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold">{pokemon.name}</h2>
        <div className="mt-2 flex justify-center space-x-2">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className="bg-gray-700 text-white rounded-full py-1 px-3 text-sm">
              {translateTypeOrAbility(type.type.name)}
            </span>
          ))}
        </div>
      </Link>
    </li>
  );
};

export default PokemonCard;
