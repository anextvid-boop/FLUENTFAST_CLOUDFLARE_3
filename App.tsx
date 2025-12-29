
import React, { useState, useEffect } from 'react';
import { Page, Language, SessionState, CycleState } from './types';
import { COLORS } from './constants';
import LanguageSelector from './components/LanguageSelector';
import SessionView from './components/SessionView';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [session, setSession] = useState<SessionState>({
    playerALang: null,
    playerBLang: null,
    phraseIndex: 0,
    cycleStateA: CycleState.DEFAULT,
    cycleStateB: CycleState.DEFAULT
  });

  // OPEN_SPLASH auto-advance
  useEffect(() => {
    if (currentPage === Page.OPEN_SPLASH) {
      const timer = setTimeout(() => setCurrentPage(Page.SESSION), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const updateSession = (updates: Partial<SessionState>) => {
    setSession(prev => ({ ...prev, ...updates }));
  };

  const renderPage = () => {
    const safePadding = "p-8";
    
    switch (currentPage) {
      case Page.HOME:
        return (
          <div className={`w-full h-full flex flex-col items-center justify-center text-center bg-[#6865F0] ${safePadding}`}>
            <h1 className="text-white text-5xl font-black mb-12 tracking-tighter leading-none">FLUENT<br/>FAST</h1>
            <p className="text-white/80 text-lg mb-12 font-medium uppercase tracking-[0.2em]">Conversations</p>
            <button 
              onClick={() => setCurrentPage(Page.PARTNER)}
              className="bg-white text-[#6865F0] px-12 py-4 rounded-full font-bold text-xl active:scale-95 transition-transform"
            >
              START
            </button>
          </div>
        );

      case Page.PARTNER:
        return (
          <div className={`w-full h-full flex flex-col items-center justify-center text-center bg-[#6865F0] ${safePadding}`}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8">
               <div className="w-8 h-8 border-4 border-white rounded-full"></div>
            </div>
            <h2 className="text-white text-3xl font-bold mb-6">Partner Up</h2>
            <p className="text-white/80 text-xl leading-relaxed mb-12">
              Sit face-to-face.<br/>Share one device.
            </p>
            <button 
              onClick={() => setCurrentPage(Page.LANGUAGE_SELECTION)}
              className="bg-white text-[#6865F0] px-12 py-4 rounded-full font-bold text-xl active:scale-95 transition-transform"
            >
              GOT IT
            </button>
          </div>
        );

      case Page.LANGUAGE_SELECTION:
        const vh = window.innerHeight;
        const hTitle = vh * 0.14;
        const hLabel = vh * 0.06;
        const hButton = vh * 0.12;
        const remaining = vh - (hTitle + (hLabel * 2) + hButton + 64); // 64 for total padding
        const gridHeight = remaining / 2;

        return (
          <div className="w-full h-full flex flex-col bg-[#6865F0] px-6 py-4 overflow-hidden">
            <h2 className="flex items-center justify-center text-white font-black text-2xl uppercase tracking-widest" style={{ height: `${hTitle}px` }}>
              Languages
            </h2>
            
            <label className="flex items-center text-white/60 text-xs font-bold uppercase tracking-widest" style={{ height: `${hLabel}px` }}>
              Player Blue
            </label>
            <LanguageSelector 
              selected={session.playerALang} 
              onSelect={(l) => updateSession({ playerALang: l })}
              disabledLang={session.playerBLang}
              gridHeight={gridHeight}
            />

            <label className="flex items-center text-white/60 text-xs font-bold uppercase tracking-widest" style={{ height: `${hLabel}px` }}>
              Player White
            </label>
            <LanguageSelector 
              selected={session.playerBLang} 
              onSelect={(l) => updateSession({ playerBLang: l })}
              disabledLang={session.playerALang}
              gridHeight={gridHeight}
            />

            <div className="flex items-center justify-center" style={{ height: `${hButton}px` }}>
              <button 
                disabled={!session.playerALang || !session.playerBLang}
                onClick={() => setCurrentPage(Page.READY)}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg transition-all
                  ${(!session.playerALang || !session.playerBLang) 
                    ? 'bg-white/10 text-white/20 cursor-not-allowed' 
                    : 'bg-white text-[#6865F0] active:scale-95'}
                `}
              >
                LET'S GO
              </button>
            </div>
          </div>
        );

      case Page.READY:
        return (
          <div className={`w-full h-full flex flex-col items-center justify-center text-center bg-[#6865F0] ${safePadding}`}>
            <h2 className="text-white text-4xl font-black mb-12 italic">READY?</h2>
            <div className="flex gap-4 mb-12">
               <div className="w-16 h-1 bg-white/30 rounded"></div>
               <div className="w-16 h-1 bg-white rounded"></div>
               <div className="w-16 h-1 bg-white/30 rounded"></div>
            </div>
            <button 
              onClick={() => setCurrentPage(Page.OPEN_SPLASH)}
              className="bg-white text-[#6865F0] px-12 py-4 rounded-full font-bold text-xl active:scale-95 transition-transform"
            >
              START SESSION
            </button>
          </div>
        );

      case Page.OPEN_SPLASH:
        return (
          <div className="w-full h-full flex flex-col bg-black">
            <div className="flex-1 bg-[#6865F0] flex items-center justify-center">
               <span className="text-white text-3xl font-black rotate-180 uppercase tracking-widest">{session.playerALang}</span>
            </div>
            <div className="h-2 bg-black"></div>
            <div className="flex-1 bg-white flex items-center justify-center">
               <span className="text-[#6865F0] text-3xl font-black uppercase tracking-widest">{session.playerBLang}</span>
            </div>
          </div>
        );

      case Page.SESSION:
        return (
          <SessionView 
            session={session} 
            onUpdate={updateSession}
            onExit={() => {
              updateSession({ phraseIndex: 0, cycleStateA: CycleState.DEFAULT, cycleStateB: CycleState.DEFAULT });
              setCurrentPage(Page.HOME);
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      {renderPage()}
    </div>
  );
};

export default App;
