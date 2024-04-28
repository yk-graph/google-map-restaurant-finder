/* eslint-disable react-hooks/exhaustive-deps */
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import { useMap } from "@/store/use-map";
import { useShopList } from "@/store/use-shoplist";
import Markers from "./markers";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const GoogleMapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });
  const { userLocation } = useMap();
  const { shopList } = useShopList();

  return isLoaded && userLocation ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
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
