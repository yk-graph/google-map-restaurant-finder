import { create } from "zustand";

import { ShopItem } from "@/types";
import { categoryLists } from "@/constants/category-items";

interface ShopListState {
  shopList: ShopItem[] | null; // 取得した店舗情報
  setShopList: (results: ShopItem[] | null) => void; // 取得した店舗情報をセットする関数
  isLoaging: boolean; // ローディング中かどうか
  setLoading: (loading: boolean) => void; // ローディング中かどうかをセットする関数
  selectedShop: ShopItem | undefined; // 選択された店舗ID
  setSelectedShop: (shop: ShopItem | undefined) => void; // 選択された店舗IDをセットする関数

  // 検索条件
  selectedCategoryId: number | undefined; // 検索条件で選択されたカテゴリID
  selectedCategoryName: string | undefined; // 検索条件で選択されたカテゴリ名
  setSelectedCategoryId: (id: number) => void; // 検索条件で選択されたカテゴリIDをセットする関数
  radius: number; // 検索条件で選択された半径
  setRadius: (radius: number) => void; // 検索条件で選択された半径をセットする関数
  selectedRaitingIds: number[]; // 検索条件で選択された評価
  setSelectedRaitingIds: (ids: number[]) => void; // 検索条件で選択された評価をセットする関数
}

export const useShopList = create<ShopListState>((set) => ({
  shopList: null,
  setShopList: (results) => set({ shopList: results }),
  isLoaging: false,
  setLoading: (loading) => set({ isLoaging: loading }),
  selectedShop: undefined,
  setSelectedShop: (shopId) => set({ selectedShop: shopId }),

  selectedCategoryId: undefined,
  selectedCategoryName: undefined,
  setSelectedCategoryId: (id) => {
    set({ selectedCategoryId: id });
    set({
      selectedCategoryName: categoryLists.find((item) => item.id === id)?.name,
    });
  },
  radius: 2500,
  setRadius: (radius) => set({ radius }),
  selectedRaitingIds: [],
  setSelectedRaitingIds: (ids) => set({ selectedRaitingIds: ids }),
}));
