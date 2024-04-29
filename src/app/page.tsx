/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CategoryList from "@/components/home/category-list";
import GoogleMapView from "@/components/home/google-map-view";
import RangeSelect from "@/components/home/range-select";
import SelectRaiting from "@/components/home/select-raiting";
import ShopList from "@/components/home/shop-list";
import { categoryLists } from "@/constants/category-items";
import axiosInstance from "@/libs/axios";
import { useMap } from "@/store/use-map";
import { useShopList } from "@/store/use-shoplist";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { userLocation, setUserLocation } = useMap();
  const { setShopList, setLoading } = useShopList();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [radius, setRadius] = useState(2500);
  const [selectedRaitingIds, setSelectedRaitingIds] = useState<number[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }

    getUserLocation();
  }, [session, router]);

  const getUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const getGooglePlace = useCallback(
    async ({
      categoryId,
      radiusNumber,
    }: {
      categoryId?: number;
      radiusNumber?: number;
    }) => {
      if (!categoryId && !selectedCategoryId) return;

      try {
        setLoading(true);

        const params = {
          category: categoryLists.find(
            (item) => item.id === (categoryId || selectedCategoryId)
          )?.name,
          lat: userLocation?.lat,
          lng: userLocation?.lng,
          radius: radiusNumber === 0 ? 0 : radiusNumber || radius,
        };

        console.log("params", params);
        const res = await axiosInstance.get("/google-place", {
          params,
        });

        if (res.status !== 200) {
          throw new Error("データの取得に失敗しました");
        }

        setShopList(res.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategoryId, radius]
  );

  if (!session) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className="p-4 space-y-8 bg-white">
        <CategoryList
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          handleSearchShopCategory={getGooglePlace}
        />
        <RangeSelect
          radius={radius}
          setRadius={setRadius}
          handleSearchShopRadius={getGooglePlace}
        />
        <SelectRaiting
          selectedRaitingIds={selectedRaitingIds}
          setSelectedRaitingIds={setSelectedRaitingIds}
          handleSearchShopRaiting={getGooglePlace}
        />
      </div>
      <div className="col-span-3 bg-slate-100">
        <GoogleMapView />
        <div className="w-full p-4">
          <ShopList />
        </div>
      </div>
    </div>
  );
}
