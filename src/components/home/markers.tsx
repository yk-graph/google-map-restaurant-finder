import { useShopList } from "@/store/use-shoplist";
import { ShopItem as ShopItemType } from "@/types";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import ShopItem from "./shop-item";

interface MarkersProps {
  shop: ShopItemType;
}

const Markers = ({ shop }: MarkersProps) => {
  const { selectedShopId, setSelectedShopId } = useShopList();

  if (!shop.geometry || !shop.geometry.location) {
    return null;
  }

  return (
    <MarkerF
      position={shop.geometry.location}
      icon={{
        url: "/circle.png",
        scaledSize: {
          width: 10,
          height: 10,
          equals: () => false,
        },
      }}
      onClick={() => setSelectedShopId(shop.place_id)}
    >
      {selectedShopId === shop.place_id ? (
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
