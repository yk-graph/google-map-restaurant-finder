/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CategoryList from "@/components/home/category-list";
import GoogleMapView from "@/components/home/google-map-view";
import RangeSelect from "@/components/home/range-select";
import SelectRaiting from "@/components/home/select-raiting";
import ShopList from "@/components/home/shop-list";
import axiosInstance from "@/libs/axios";
import { useLocation } from "@/store/use-location";
import { useShopList } from "@/store/use-shoplist";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { location, setLocation, setUserLocation } = useLocation();
  const {
    setShopList,
    setLoading,
    selectedCategoryId,
    selectedCategoryName,
    radius,
  } = useShopList();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }

    getlocation();
  }, [session, router]);

  useEffect(() => {
    getGooglePlace();
  }, [selectedCategoryId, radius]);

  const getlocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const getGooglePlace = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        category: selectedCategoryName,
        lat: location?.lat,
        lng: location?.lng,
        radius,
      };

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
  }, [selectedCategoryId, radius]);

  if (!session) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className="p-4 space-y-8 bg-white">
        <CategoryList />
        <RangeSelect />
        <SelectRaiting />
      </div>
      <div className="col-span-3 bg-slate-100">
        <GoogleMapView />
        <div className="relative w-full p-4">
          <ShopList />
        </div>
      </div>
    </div>
  );
}
