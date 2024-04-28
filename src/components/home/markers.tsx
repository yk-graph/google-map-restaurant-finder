import { ShopItem } from "@/types";
import { MarkerF } from "@react-google-maps/api";

interface MarkersProps {
  shop: ShopItem;
}

const Markers = ({ shop }: MarkersProps) => {
  if (!shop.geometry || !shop.geometry.location) {
    return null;
  }

  return (
    <div className="absolute z-10">
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
      />
    </div>
  );
};

export default Markers;
