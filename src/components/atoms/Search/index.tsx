import { useEffect, useRef, useState } from 'react';
import { customSkill, toHiragana, toKatakana } from '../SkillSearch';
import { Skill } from '@/app/store';
import { useWindowSize } from '@/function/GetWindowSize';
import { Type, typeInterface } from '@/interfaces';
import SkillSuggestion from '@/components/molecules/skillSuggestion';

interface props {
  initialSkill: Skill | undefined;
  skills: customSkill[];
  setSkill: (skill: Skill) => void;
}

const SavedSkillSearch: React.FC<props> = ({ initialSkill, skills, setSkill }) => {
  const [query, setQuery] = useState<string>(initialSkill ? initialSkill.name : '');
  const [filteredSuggestions, setFilteredSuggestions] = useState<customSkill[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (initialSkill && initialSkill.name) {
      setQuery(initialSkill.name);
    }
  }, [initialSkill]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    const filtered = skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(userInput.toLowerCase()) ||
        toKatakana(skill.name).toLowerCase().includes(userInput.toLowerCase()) ||
        toHiragana(skill.name).toLowerCase().includes(userInput.toLowerCase()),
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSkillClick = (skill: Skill) => {
    setQuery(skill.name);
    setSkill(skill);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (query === '') {
      setFilteredSuggestions(skills);
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
    setFilteredSuggestions(skills);
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  function catchType(name: string): Type {
    let ret = typeInterface.find((type: { name: string }) => type.name === name);
    if (!ret) {
      ret = typeInterface[0];
    }
    return ret;
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const windowSize = useWindowSize();

  return (
    <div style={{ position: 'relative', width: '250px' }}>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            outline: 'none',
          }}
          className="text-sm sm:text-base p-1 sm:p-2 border-2 flex rounded-2xl md:rounded-3xl"
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
            width: windowSize.width < 640 ? '240px' : '400px',
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            zIndex: 1,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() =>
                handleSkillClick({
                  name: suggestion.name,
                  power: suggestion.power,
                  type: catchType(suggestion.type),
                  classification: suggestion.classification,
                })
              }
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: index % 2 ? '#f9f9f9' : '#fff',
              }}
            >
              <SkillSuggestion skill={suggestion} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedSkillSearch;
