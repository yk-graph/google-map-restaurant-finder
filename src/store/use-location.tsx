import { create } from "zustand";

interface LocationState {
  userLocation: google.maps.LatLng | google.maps.LatLngLiteral | null;
  setUserLocation: (
    location: google.maps.LatLng | google.maps.LatLngLiteral
  ) => void;
  location: google.maps.LatLng | google.maps.LatLngLiteral | null;
  setLocation: (
    location: google.maps.LatLng | google.maps.LatLngLiteral
  ) => void;
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
}

export const useLocation = create<LocationState>((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  location: null,
  setLocation: (location) => set({ location }),
  map: null,
  setMap: (map) => set({ map }),
}));
