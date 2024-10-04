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

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
};

const dialogBoxStyle: React.CSSProperties = {
  backgroundColor: 'white',
  // padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  width: '100%', // 必要に応じてサイズ調整
  maxWidth: '300px', // モーダルの最大幅を設定
  position: 'relative', // ulタグを正しく配置するためにrelativeを使用
};

const suggestionBoxStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '300px',
  overflowY: 'auto',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDialogOpen(false);
      }
    };

    if(isDialogOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDialogOpen]);

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
    setIsDialogOpen(false);
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
    <div style={{ width: '250px', cursor: 'pointer' }} onClick={() => setIsDialogOpen(true)} >
      <div className='text-start border-b-2 py-2 text-lg'>{selectedSkill.name}</div>
      {isDialogOpen ? (
  <div style={overlayStyle}>
    <div style={dialogBoxStyle}>
      <fieldset
        className="relative"
      >
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            outline: 'none',
          }}
          className='bg-zinc-300 flex justify-between items-center py-2 rounded-t-lg'
        >
          <div className='flex items-center'>
            <button
              type='button'
              onMouseDown={() => handleSkillClick(selectedSkill)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m6.921 12.5l5.439 5.439q.146.146.153.344q.006.198-.16.363q-.164.16-.353.163q-.188.002-.354-.163l-6.08-6.08q-.131-.132-.184-.268T5.329 12t.053-.298t.184-.267l6.08-6.081q.14-.14.341-.15q.202-.01.367.15q.165.165.165.356q0 .192-.165.357L6.92 11.5H18.5q.214 0 .357.143T19 12t-.143.357t-.357.143z"/></svg>
            </button>
            <input
              ref={inputRef}
              type="text"
              name="name"
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              style={{
                outline: 'none',
                border: 'none',
              }}
              className="text-sm sm:text-base px-2 pl-2 rounded-2xl md:rounded-3xl bg-inherit my-auto"
            />
          </div>
          
          {
            <div>
              {query == '' ? '技を入力' : query}
            </div>

           && (
            <button
              onClick={clearText}
              style={{
                background: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#888',
                display: query === '' ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Clear text"
              className="w-6 h-6 md:w-7 md:h-7 text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z"/></svg>
            </button>
          )}
        </div>
        
      </fieldset>
      <ul ref={suggestionBoxRef} style={suggestionBoxStyle}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              className="container"
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
                cursor: 'pointer',
                backgroundColor: index % 2 ? '#f9f9f9' : '#fff',
              }}
            >
              <SkillSuggestion skill={suggestion} />
            </li>
          ))}
        </ul>
    </div>
  </div>
) : null}

      
    </div>
  );
};

export default SkillSearchBox;
