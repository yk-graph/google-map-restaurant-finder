/* eslint-disable react-hooks/exhaustive-deps */
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import Markers from "@/components/home/markers";
import { useLocation } from "@/store/use-location";
import { useShopList } from "@/store/use-shoplist";
import { useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const GoogleMapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const { location, userLocation, map, setMap } = useLocation();
  const { shopList, selectedShop } = useShopList();

  useEffect(() => {
    if (map && selectedShop) {
      map.panTo(selectedShop.geometry!.location!);
    }

    console.log("pan!!!!!!!!!", selectedShop);
  }, [selectedShop]);

  return isLoaded && location ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        onLoad={(map) => setMap(map)}
        zoom={16}
      >
        {userLocation && (
          <MarkerF
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
        {shopList &&
          shopList.map((shop) => <Markers key={shop.place_id} shop={shop} />)}
      </GoogleMap>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default GoogleMapView;
