import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Home from './Home';
import PokemonDetail from './PokemonDetail';
import './index.css';
import './i18n';
const App = () => {
  const { t, i18n } = useTranslation();
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonData = await Promise.all(
        result.data.results.map(async (p) => {
          const details = await axios.get(p.url);
          return details.data;
        })
      );
      setPokemon(pokemonData);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Selector de idioma */}
        <div className="p-4 text-center bg-gray-800 text-white">
          <button
            className="mx-2 px-4 py-2 bg-blue-500 rounded-lg"
            onClick={() => i18n.changeLanguage('en')}
          >
            {t('enLanguage')} {/* Traducción del botón "EN English" */}
          </button>
          <button
            className="mx-2 px-4 py-2 bg-red-500 rounded-lg"
            onClick={() => i18n.changeLanguage('es')}
          >
            {t('esLanguage')} {/* Traducción del botón "ES Español" */}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home pokemonList={pokemon} />} />
          <Route path="/pokemon/:id" element={<PokemonDetail pokemonList={pokemon} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
