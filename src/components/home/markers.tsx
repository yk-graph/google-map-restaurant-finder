import { MarkerF, OverlayView } from "@react-google-maps/api";

import ShopItem from "@/components/home/shop-item";
import { useLocation } from "@/store/use-location";
import { useShopList } from "@/store/use-shoplist";
import { ShopItem as ShopItemType } from "@/types";

interface MarkersProps {
  shop: ShopItemType;
}

const Markers = ({ shop }: MarkersProps) => {
  const { selectedShop, setSelectedShop } = useShopList();
  const { setLocation } = useLocation();

  if (!shop.geometry || !shop.geometry.location) {
    return null;
  }

  return (
    <MarkerF
      position={shop.geometry.location}
      icon={{
        url: "/circle.png",
        scaledSize: {
          width: 15,
          height: 15,
          equals: () => false,
        },
      }}
      onClick={() => {
        setSelectedShop(shop);
        setLocation({
          lat: shop.geometry!.location!.lat as unknown as number,
          lng: shop.geometry!.location!.lng as unknown as number,
        });
      }}
    >
      {selectedShop && selectedShop.place_id === shop.place_id ? (
        <OverlayView
          position={shop.geometry.location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="-ml-20 -mt-48">
            <ShopItem shopItem={shop} />
          </div>
        </OverlayView>
      ) : null}
    </MarkerF>
  );
};

export default Markers;
