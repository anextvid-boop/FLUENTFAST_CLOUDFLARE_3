
export enum Language {
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German'
}

export enum Page {
  HOME = 'HOME',
  PARTNER = 'PARTNER',
  LANGUAGE_SELECTION = 'LANGUAGE_SELECTION',
  READY = 'READY',
  OPEN_SPLASH = 'OPEN_SPLASH',
  SESSION = 'SESSION'
}

export enum CycleState {
  DEFAULT = 'DEFAULT',
  UNDERLINE = 'UNDERLINE',
  TEST = 'TEST'
}

export interface PhraseSet {
  id: number;
  [Language.ENGLISH]: string;
  [Language.SPANISH]: string;
  [Language.FRENCH]: string;
  [Language.GERMAN]: string;
}

export interface SessionState {
  playerALang: Language | null;
  playerBLang: Language | null;
  phraseIndex: number;
  cycleStateA: CycleState;
  cycleStateB: CycleState;
}
