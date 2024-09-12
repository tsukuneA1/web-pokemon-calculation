import PokeSuggestion from '@/components/molecules/pokeSuggestion';
import { useWindowSize } from '@/function/GetWindowSize';
import React, { useEffect, useRef, useState } from 'react';

export interface Pokemon {
  id: number;
  name: string;
  src: string;
  type1: string;
  type2: string;
  ability1: string;
  ability2: string;
  ability3: string;
  hp: number;
  attack: number;
  defence: number;
  spAttack: number;
  spDefence: number;
  speed: number;
  weight: number;
  anotherName: string;
  rank: number;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  skill5: string;
}

interface SearchBoxProps {
  text: string;
  onClick: (poke: Pokemon) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ text, onClick }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('/api/pokemons');
      const data = await response.json();
      setPokemons(data);
    };

    fetchPokemons();
  }, []);
  const [query, setQuery] = useState<string>(text);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Pokemon[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setQuery(text);
  }, [text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    const filtered = pokemons
      .filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(userInput.toLowerCase()) ||
          pokemon.anotherName.toLowerCase().includes(userInput.toLowerCase()),
      )
      .sort((a, b) => a.rank - b.rank);

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handlePokeClick = (pokemon: Pokemon) => {
    setQuery(pokemon.name);
    onClick(pokemon);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (query === '') {
      setFilteredSuggestions([...pokemons].sort((a, b) => a.rank - b.rank));
    }
    setShowSuggestions(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  const clearText = () => {
    setQuery('');
    setFilteredSuggestions([...pokemons].sort((a, b) => a.rank - b.rank));
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const windowSize = useWindowSize();

  return (
    <div style={{ width: '100%' }}>
      <div className="relative flex justify-items-center items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="w-full text-base sm:text-lg py-1 pl-1 md:pl-2 border-2"
          style={{
            boxSizing: 'border-box',
            borderRadius: '20px',
            ...styles.search,
          }}
        />
        {query && (
          <button
            onClick={clearText}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '2px solid',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '24px',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Clear text"
            className="w-6 h-6 md:w-7 md:h-7"
          >
            ×
          </button>
        )}
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionBoxRef}
          style={{
            position: 'absolute',
            width: 'auto',
            maxHeight: '500px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            listStyle: 'none',
            padding: 0,
            marginRight: '100px',
            zIndex: 1,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handlePokeClick(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: index % 2 ? '#f9f9f9' : '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <PokeSuggestion poke={suggestion} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
};

export default SearchBox;
