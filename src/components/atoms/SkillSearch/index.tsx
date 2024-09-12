import SkillSuggestion from '@/components/molecules/skillSuggestion';
import { Type, typeInterface } from '@/interfaces';
import { RootState, setSkill, Skill } from '@/app/store';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '@/function/GetWindowSize';

export function toKatakana(input: string): string {
  return input.replace(/[\u3041-\u3096]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60));
}

export function toHiragana(input: string): string {
  return input.replace(/[\u30a1-\u30f6]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60));
}

export interface customSkill {
  id: number;
  name: string;
  power: number;
  type: string;
  classification: string;
}

const SkillSearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const selectedSkill = useSelector((state: RootState) => state.stats.selectedSkill);
  const poke = useSelector((state: RootState) => state.stats.atPoke);
  const dfPoke = useSelector((state: RootState) => state.defender.poke);
  const [query, setQuery] = useState<string>(selectedSkill.name);
  const [filteredSuggestions, setFilteredSuggestions] = useState<customSkill[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [skills, setSkills] = useState<customSkill[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  const topSkills: customSkill[] = [
    customSKillSearch(poke.skill1),
    customSKillSearch(poke.skill2),
    customSKillSearch(poke.skill3),
    customSKillSearch(poke.skill4),
    customSKillSearch(poke.skill5),
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/model');
        const data = await response.json();
        if (Array.isArray(data.skill)) {
          setSkills(data.skill);
        } else {
          console.error('Expected an array but got:', data.skill);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (selectedSkill && selectedSkill.name) {
      setQuery(selectedSkill.name);
    }
  }, [selectedSkill]);

  function customSKillSearch(name: string): customSkill {
    const ret = skills.find((skill) => skill.name === name);
    if (!ret) {
      return skills[0];
    }
    return ret;
  }

  function removeDuplicates(array: customSkill[]): customSkill[] {
    const seen = new Set<string>();
    return array.filter((skill) => {
      if (!skill || !skill.name) {
        return false;
      }
      const duplicate = seen.has(skill.name);
      seen.add(skill.name);
      return !duplicate;
    });
  }

  const customed = removeDuplicates([...topSkills, ...skills]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    const filtered = customed.filter(
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
    dispatch(setSkill({ skill: skill, dfPoke: dfPoke }));
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (query === '') {
      setFilteredSuggestions(customed);
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
    setFilteredSuggestions(customed);
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

export default SkillSearchBox;
