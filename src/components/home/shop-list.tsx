import { useShopList } from "@/store/use-shoplist";
import ShopItem from "@/components/home/shop-item";

const ShopList = () => {
  const { shopList } = useShopList();

  return (
    <div className="flex overflow-scroll scrollbar-hide gap-4">
      {shopList
        ? shopList.map((shop) => (
            <ShopItem key={shop.place_id} shopList={shop} />
          ))
        : null}
    </div>
  );
};

export default ShopList;
