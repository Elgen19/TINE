import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]); 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPokemonList(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '10px', marginTop: '10px' }}> 
        <button onClick={() => handleLanguageChange('english')} style={{ marginRight: '5px' }}>English</button>
        <button onClick={() => handleLanguageChange('japanese')} style={{ marginRight: '5px' }}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')} style={{ marginRight: '5px' }}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div style={{ marginBottom: '10px' }}> 
        <span>{currentPage} out of {totalPages}</span>
      </div>
      <div style={{ marginBottom: '10px' }}> 
        <button onClick={handlePrevPage} disabled={currentPage === 1} style={{ marginRight: '5px' }}>Back</button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)} disabled={currentPage === index + 1} style={{ marginRight: '5px' }}>{index + 1}</button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {pokemonList.map((pokemon, index) => (
            <Pokemon
              key={index}
              id={pokemon.id}
              name={pokemon.name[language]}
              imageUrl={pokemon.image}
              style={{ flex: '0 0 33.33%' }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
