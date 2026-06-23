import { create } from "zustand";

interface GamificationState {
  level: number;
  exp: number;
  maxExp: number;
  gold: number;
  playerName: string;
  playerClass: string;
  recentExpGains: { id: string; amount: number; message: string }[];
  
  // Actions
  gainExp: (amount: number, message: string) => Promise<void>;
  gainGold: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  clearExpGains: (id: string) => void;
  setPlayerName: (name: string) => void;
  setStats: (stats: Partial<GamificationState>) => void;
}

export const useGamificationStore = create<GamificationState>()(
  (set, get) => ({
    level: 1,
    exp: 0,
    maxExp: 1000,
    gold: 50,
    playerName: "Rusdi",
    playerClass: "Novice Scholar",
    recentExpGains: [],

    gainExp: async (amount, message) => {
      // Optimistic update
      const id = Date.now().toString();
      set((state) => ({
        recentExpGains: [...state.recentExpGains, { id, amount, message }]
      }));

      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch(`http://${window.location.hostname}:4000/gamification/exp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ amount, message })
        });
        
        if (res.ok) {
          const data = await res.json();
          set({
            level: data.level,
            exp: data.exp,
            maxExp: data.maxExp,
            gold: data.gold,
            playerClass: data.playerClass
          });
        }
      } catch (err) {
        console.error("Failed to sync EXP", err);
      }
    },

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
    })),

    setPlayerName: (name) => set({ playerName: name }),
    setStats: (stats) => set(stats)
  })
);
