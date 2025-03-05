import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import PokemonDetail from './PokemonDetail';
import './index.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonData = await Promise.all(result.data.results.map(async (p, index) => {
        const details = await axios.get(p.url);
        return details.data;
      }));
      setPokemon(pokemonData);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home pokemonList={pokemon} />} />
          <Route path="/pokemon/:id" element={<PokemonDetail pokemonList={pokemon} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
