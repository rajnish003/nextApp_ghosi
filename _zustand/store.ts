// store/useCardStore.ts
import { create } from "zustand";
import { CardData } from "@/types/card";
import { VocalData } from "./vocalData"; // this should be an array of CardData

interface CardStore {
  cards: CardData[];
  addCard: (card: CardData) => void;
  removeCard: (id: number) => void;
  setCards: (cards: CardData[]) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  cards: VocalData, // Make sure VocalData is CardData[]
  addCard: (card) =>
    set((state) => ({
      cards: [...state.cards, card],
    })),
  removeCard: (id) => 
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
    })),
  setCards: (cards) => set({ cards }),
}));