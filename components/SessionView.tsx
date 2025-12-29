
import React, { useState } from 'react';
import { Language, CycleState, SessionState } from '../types';
import { COLORS, PHRASES, ICONS } from '../constants';
import AutoFitText from './AutoFitText';
import { playSpeech } from '../services/audioService';

interface SessionViewProps {
  session: SessionState;
  onUpdate: (updates: Partial<SessionState>) => void;
  onExit: () => void;
}

const PlayerPanel: React.FC<{
  isBlue: boolean;
  lang: Language;
  phrase: string;
  rootPhrase: string;
  state: CycleState;
  onCycle: () => void;
  onPlay: (slow: boolean) => void;
}> = ({ isBlue, lang, phrase, rootPhrase, state, onCycle, onPlay }) => {
  const isTest = state === CycleState.TEST;
  const isUnderline = state === CycleState.UNDERLINE;

  return (
    <div 
      className={`relative flex-1 flex flex-col p-5 gap-[6px] overflow-hidden ${isBlue ? 'bg-[#6865F0]' : 'bg-white'}`}
      style={{ transform: isBlue ? 'rotate(180deg)' : 'none' }}
    >
      {/* Target Card (70%) */}
      <div 
        onClick={onCycle}
        className={`rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300
          ${isBlue ? 'bg-white/10' : 'bg-[#6865F0]/10'}
        `}
        style={{ height: isTest ? '100%' : '70%' }}
      >
        <AutoFitText 
          text={phrase} 
          minSize={12} 
          color={isBlue ? COLORS.WHITE : COLORS.BRAND_BLUE}
          weight="700"
          underline={isUnderline}
        />
      </div>

      {/* Root Card (30%) */}
      {!isTest && (
        <div 
          onClick={() => onPlay(false)}
          className={`rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer h-[30%]
            ${isBlue ? 'bg-black/20' : 'bg-black/5'}
          `}
        >
          <AutoFitText 
            text={rootPhrase} 
            minSize={14} 
            color={isBlue ? COLORS.WHITE : COLORS.BLACK}
          />
        </div>
      )}

      {/* Play Controls (Overlays for accessibility if needed, though cards are tap targets) */}
      <div className="absolute top-2 right-2 flex gap-2">
         {/* Could add mini speaker icons here if desired, spec focuses on cards */}
      </div>
    </div>
  );
};

const SessionView: React.FC<SessionViewProps> = ({ session, onUpdate, onExit }) => {
  const currentPhraseSet = PHRASES[session.phraseIndex];
  const controlBarHeight = '8%';

  const handleNext = () => {
    if (session.phraseIndex < PHRASES.length - 1) {
      onUpdate({ 
        phraseIndex: session.phraseIndex + 1,
        cycleStateA: CycleState.DEFAULT,
        cycleStateB: CycleState.DEFAULT
      });
    }
  };

  const handlePrev = () => {
    if (session.phraseIndex > 0) {
      onUpdate({ 
        phraseIndex: session.phraseIndex - 1,
        cycleStateA: CycleState.DEFAULT,
        cycleStateB: CycleState.DEFAULT
      });
    }
  };

  const cycleState = (player: 'A' | 'B') => {
    const key = player === 'A' ? 'cycleStateA' : 'cycleStateB';
    const current = session[key];
    let next = CycleState.DEFAULT;
    if (current === CycleState.DEFAULT) next = CycleState.UNDERLINE;
    else if (current === CycleState.UNDERLINE) next = CycleState.TEST;
    onUpdate({ [key]: next });
  };

  return (
    <div className="w-full h-full flex flex-col bg-black">
      {/* Player Blue (Top, 180 rotated) */}
      <PlayerPanel 
        isBlue={true} 
        lang={session.playerALang!} 
        phrase={currentPhraseSet[session.playerALang!]}
        rootPhrase={currentPhraseSet[session.playerBLang!]}
        state={session.cycleStateA}
        onCycle={() => cycleState('A')}
        onPlay={(slow) => playSpeech(currentPhraseSet[session.playerALang!], true, slow)}
      />

      {/* Control Bar (8%) */}
      <div 
        className="flex items-center justify-around bg-black px-6"
        style={{ height: controlBarHeight }}
      >
        <button onClick={handlePrev} className="text-white hover:opacity-70 transition-opacity">
          {ICONS.PREV}
        </button>
        <button onClick={onExit} className="text-white hover:opacity-70 transition-opacity">
          {ICONS.RESTART}
        </button>
        <button onClick={() => {
          // Play both in sequence or focused? Spec says "One voice at a time".
          // We'll play Player White (male) then Player Blue (female)? 
          // Actually, let's play based on active tap. Bar button is usually Reset/Nav.
        }} className="text-white hover:opacity-70 transition-opacity">
          {ICONS.PLAY}
        </button>
        <button onClick={handleNext} className="text-white hover:opacity-70 transition-opacity">
          {ICONS.NEXT}
        </button>
      </div>

      {/* Player White (Bottom, Upright) */}
      <PlayerPanel 
        isBlue={false} 
        lang={session.playerBLang!} 
        phrase={currentPhraseSet[session.playerBLang!]}
        rootPhrase={currentPhraseSet[session.playerALang!]}
        state={session.cycleStateB}
        onCycle={() => cycleState('B')}
        onPlay={(slow) => playSpeech(currentPhraseSet[session.playerBLang!], false, slow)}
      />
    </div>
  );
};

export default SessionView;
