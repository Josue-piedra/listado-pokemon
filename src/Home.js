import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ pokemonList }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Pokedex Primera Generacion </h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemonList.map(pokemon => (
                    <li key={pokemon.id} className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
                        <Link to={`/pokemon/${pokemon.id}`} className="block p-4">
                            <h2 className="text-xl font-semibold text-center text-gray-800">{pokemon.name}</h2>
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="mx-auto h-32 w-32 object-contain"
                            />
                            <p className="text-center text-sm text-gray-500">ID: {pokemon.id}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
