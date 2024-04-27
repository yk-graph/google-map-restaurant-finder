"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import CategoryList from "@/components/home/category-list";
import RangeSelect from "@/components/home/range-select";
import SelectRaiting from "@/components/home/select-raiting";
import GoogleMapView from "@/components/home/google-map-view";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className="p-4 space-y-8">
        <CategoryList />
        <RangeSelect />
        <SelectRaiting />
      </div>
      <div className="col-span-3">
        <GoogleMapView />
      </div>
    </div>
  );
}
