import React from 'react';
import PokemonCard from './PokemonCard.js';

//tarjetas de Pokémon.
const PokemonList = ({ pokemons, translateTypeOrAbility }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-8">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          translateTypeOrAbility={translateTypeOrAbility}
        />
      ))}
    </div>
  );
};

export default PokemonList;
