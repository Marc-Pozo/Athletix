// store/locationStore.ts
import { create } from 'zustand';

import { Location } from '@/constants/interfaces';

interface LocationStore {
    selectedLocation: Location | null;
    setSelectedLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
    selectedLocation: null,
    setSelectedLocation: (location) => set({ selectedLocation: location }),
}));
