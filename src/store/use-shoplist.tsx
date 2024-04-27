import { create } from "zustand";

import { ShopItem } from "@/types";

interface ShopListState {
  shopList: ShopItem[] | null;
  setShopList: (results: ShopItem[] | null) => void;
}

export const useShopList = create<ShopListState>((set) => ({
  shopList: null,
  setShopList: (results) => set({ shopList: results }),
}));
