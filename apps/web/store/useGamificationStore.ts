import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GamificationState {
  level: number;
  exp: number;
  maxExp: number;
  gold: number;
  playerName: string;
  playerClass: string;
  recentExpGains: { id: string; amount: number; message: string }[];
  
  // Actions
  gainExp: (amount: number, message: string) => void;
  gainGold: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  clearExpGains: (id: string) => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => ({
      level: 1,
      exp: 0,
      maxExp: 1000,
      gold: 50,
      playerName: "Rusdi",
      playerClass: "Novice Scholar",
      recentExpGains: [],

      gainExp: (amount, message) => set((state) => {
        let newExp = state.exp + amount;
        let newLevel = state.level;
        let newMaxExp = state.maxExp;
        
        // Handle Level Up
        if (newExp >= newMaxExp) {
          newLevel += 1;
          newExp = newExp - newMaxExp;
          newMaxExp = Math.floor(newMaxExp * 1.5); // Increase requirement by 50%
          
          // Class progression
          let newClass = state.playerClass;
          if (newLevel >= 5) newClass = "Apprentice Adept";
          if (newLevel >= 10) newClass = "Master Virtuoso";
          if (newLevel >= 20) newClass = "Grandmaster Ascendant";

          return {
            exp: newExp,
            level: newLevel,
            maxExp: newMaxExp,
            playerClass: newClass,
            gold: state.gold + 100, // Bonus gold on level up
            recentExpGains: [
              ...state.recentExpGains, 
              { id: Date.now().toString(), amount, message: `LEVEL UP! ${message}` }
            ]
          };
        }

        return {
          exp: newExp,
          recentExpGains: [
            ...state.recentExpGains,
            { id: Date.now().toString(), amount, message }
          ]
        };
      }),

      gainGold: (amount) => set((state) => ({ gold: state.gold + amount })),

      spendGold: (amount) => {
        let success = false;
        set((state) => {
          if (state.gold >= amount) {
            success = true;
            return { gold: state.gold - amount };
          }
          return state;
        });
        return success;
      },

      clearExpGains: (id) => set((state) => ({
        recentExpGains: state.recentExpGains.filter((g) => g.id !== id)
      }))
    }),
    {
      name: "supernova-gamification-storage", // stores in localStorage
    }
  )
);
