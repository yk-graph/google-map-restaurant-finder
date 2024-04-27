/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useLayoutEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import axiosInstance from "@/libs/axios";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const GoogleMapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const [userLocation, setUserLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >();

  const getUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const getGooglePlace = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/google-place", {
        params: {
          category: "restaurant",
          lat: userLocation?.lat,
          lng: userLocation?.lng,
          radius: 5000,
        },
      });

      if (res.data.status !== "OK") {
        throw new Error("データの取得に失敗しました");
      }

      return res.data.results;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useLayoutEffect(() => {
    getUserLocation();
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={16}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "/user-location.png",
              scaledSize: {
                width: 40,
                height: 40,
                equals: () => false,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  ) : null;
};

export default GoogleMapView;
