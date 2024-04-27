import { create } from "zustand";

interface MapState {
  userLocation: google.maps.LatLng | google.maps.LatLngLiteral | null;
  setUserLocation: (
    location: google.maps.LatLng | google.maps.LatLngLiteral
  ) => void;
}

export const useMap = create<MapState>((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}));
