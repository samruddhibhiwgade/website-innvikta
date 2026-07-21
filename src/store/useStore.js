import { create } from 'zustand';

export const useStore = create((set) => ({
  score: 0,
  isHookActive: false,
  setIsHookActive: (active) => set({ isHookActive: active }),
  finishCollection: () => set((state) => ({
    collectibles: state.collectibles.map((c) => 
      c.isCollected ? { ...c, isCollected: false, isInTray: true } : c
    )
  })),
  collectibles: [
    { id: '2', type: 'vishing', position: [1.6, 1.8, 0], isCollected: false, isAttracted: false },
    { id: '3', type: 'qr', position: [-2.5, 3.2, 0], isCollected: false, isAttracted: false },
    { id: '4', type: 'usb', position: [-1.4, 1.8, 0], isCollected: false, isAttracted: false },
    { id: '5', type: 'smishing', position: [2.6, 3.6, 0], isCollected: false, isAttracted: false },
  ],
  collectItem: (id) => set((state) => {
    const item = state.collectibles.find(c => c.id === id);
    if (item && !item.isCollected) {
      return {
        score: state.score + 1,
        collectibles: state.collectibles.map((c) => {
          if (c.id === id) {
            return { ...c, isCollected: true, isAttracted: false };
          } else if (c.isCollected) {
            return { ...c, isCollected: false, isInTray: true };
          }
          return c;
        }),
      };
    }
    return state;
  }),
  setAttracted: (id, attracted) => set((state) => ({
    collectibles: state.collectibles.map((item) =>
      item.id === id ? { ...item, isAttracted: attracted } : item
    ),
  })),
  updatePosition: (id, position) => set((state) => ({
    collectibles: state.collectibles.map((c) => 
      c.id === id ? { ...c, position } : c
    )
  })),
  resetGame: () => set({
    score: 0,
    collectibles: [
      { id: '2', type: 'vishing', position: [1.6, 1.8, 0], isCollected: false, isAttracted: false, isInTray: false },
      { id: '3', type: 'qr', position: [-2.5, 3.2, 0], isCollected: false, isAttracted: false, isInTray: false },
      { id: '4', type: 'usb', position: [-1.4, 1.8, 0], isCollected: false, isAttracted: false, isInTray: false },
      { id: '5', type: 'smishing', position: [2.6, 3.6, 0], isCollected: false, isAttracted: false, isInTray: false },
    ],
  }),
}));
