
import React from 'react';
import { Language, PhraseSet } from './types';

export const COLORS = {
  BRAND_BLUE: '#6865F0',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

export const PHRASES: PhraseSet[] = [
  {
    id: 1,
    [Language.ENGLISH]: "Hello, how are you today?",
    [Language.SPANISH]: "¿Hola, cómo estás hoy?",
    [Language.FRENCH]: "Bonjour, comment allez-vous aujourd'hui ?",
    [Language.GERMAN]: "Hallo, wie geht es dir heute?"
  },
  {
    id: 2,
    [Language.ENGLISH]: "I am doing very well, thank you.",
    [Language.SPANISH]: "Estoy muy bien, gracias.",
    [Language.FRENCH]: "Je vais très bien, merci.",
    [Language.GERMAN]: "Mir geht es sehr gut, danke."
  },
  {
    id: 3,
    [Language.ENGLISH]: "What is your favorite food?",
    [Language.SPANISH]: "¿Cuál es tu comida favorita?",
    [Language.FRENCH]: "Quel est votre plat préféré ?",
    [Language.GERMAN]: "Was ist dein Lieblingsessen?"
  },
  {
    id: 4,
    [Language.ENGLISH]: "I love eating pizza and pasta.",
    [Language.SPANISH]: "Me encanta comer pizza y pasta.",
    [Language.FRENCH]: "J'adore manger des pizzas et des pâtes.",
    [Language.GERMAN]: "Ich liebe Pizza und Pasta."
  },
  {
    id: 5,
    [Language.ENGLISH]: "Where are you going for vacation?",
    [Language.SPANISH]: "¿A dónde vas de vacaciones?",
    [Language.FRENCH]: "Où partez-vous en vacances ?",
    [Language.GERMAN]: "Wohin fährst du in den Urlaub?"
  }
];

export const ICONS = {
  PREV: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  NEXT: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
  PLAY: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  RESTART: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
};
