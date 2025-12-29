
import React from 'react';
import { Language } from '../types';
import { COLORS } from '../constants';

interface LanguageSelectorProps {
  selected: Language | null;
  onSelect: (lang: Language) => void;
  disabledLang: Language | null;
  gridHeight: number;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selected, 
  onSelect, 
  disabledLang,
  gridHeight 
}) => {
  const languages = [Language.ENGLISH, Language.SPANISH, Language.FRENCH, Language.GERMAN];
  const tileHeight = (gridHeight - 8) / 2; // 8px for gap

  return (
    <div className="grid grid-cols-2 gap-2 w-full" style={{ height: `${gridHeight}px` }}>
      {languages.map((lang) => {
        const isSelected = selected === lang;
        const isDisabled = disabledLang === lang;
        
        return (
          <button
            key={lang}
            onClick={() => !isDisabled && onSelect(lang)}
            disabled={isDisabled}
            style={{ height: `${Math.max(tileHeight, 56)}px` }}
            className={`
              flex items-center justify-center rounded-xl font-bold transition-all duration-200 text-sm uppercase tracking-widest
              ${isSelected ? 'bg-white text-[#6865F0] border-2 border-white' : 'bg-white/10 text-white border-2 border-transparent'}
              ${isDisabled ? 'opacity-20 grayscale' : 'active:scale-95'}
            `}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
