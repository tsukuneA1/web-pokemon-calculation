import React, { useState, useRef, useEffect } from 'react';

interface DropdownSearchBoxProps {
  suggestions: string[];
  value: string;
  onClick: (select: string) => void;
}

const DropdownSearchBox: React.FC<DropdownSearchBoxProps> = ({ suggestions, value, onClick }) => {
  const [query, setQuery] = useState<string>(value);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionBoxRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    setQuery(value);
  }, [value])

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(userInput.toLowerCase()));

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onClick(suggestion);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (query === '') {
      setFilteredSuggestions(suggestions);
    }
    setShowSuggestions(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if(
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  }

  const clearText = () => {
    setQuery('');
    setFilteredSuggestions(suggestions);
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '200px' }} >
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            paddingRight: '30px',
            borderBottom: '1px solid #ccc',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            outline: 'none',
          }}
          className="py-1.5 sm:py-2 md:py-3.5 text-sm sm:text-base"
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
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: '#888',
            }}
            aria-label="Clear text"
          >
            &times;
          </button>
        )}
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionBoxRef}
          style={{
            position: 'absolute',
            width: '100%',
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            zIndex: 1,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: index % 2 ? '#f9f9f9' : '#fff',
              }}
              className='text-sm sm:text-base'
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSearchBox;
