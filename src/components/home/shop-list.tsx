import { useRef } from "react";

import ShopItem from "@/components/home/shop-item";
import { useShopList } from "@/store/use-shoplist";
import SkeltonLoading from "../skelton-loading";

const ShopList = () => {
  const { shopList, isLoaging } = useShopList();
  const elementRef = useRef(null); // Tips: ボタンを押した時にスクロールするようにするためにElementを取得

  const slideLeft = (element: Element | null) => {
    if (!element) return;

    element.scrollLeft -= 500; // Tips: 指定したElementに対して500pxスクロールさせる処理
  };

  const slideRight = (element: Element | null) => {
    if (!element) return;

    element.scrollLeft += 500; // Tips: 指定したElementに対して500pxスクロールさせる処理
  };

  if (!shopList) return null;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        onClick={() => slideLeft(elementRef.current)}
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 absolute rotate-180 top-20 left-0 bg-gray-300 cursor-pointer p-1 rounded-full text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
      {/* Tips: Scrollをスムーズに行うプロパティ -> scroll-smooth | Scrollbarを隠すライブラリ -> scrollbar-hide */}
      <div
        className="flex overflow-scroll overflow-x-auto scrollbar-hide scroll-smooth gap-4"
        ref={elementRef}
      >
        {!isLoaging
          ? shopList.map((shop) => (
              <ShopItem key={shop.place_id} shopItem={shop} />
            ))
          : [...Array(10)].map((_, index) => <SkeltonLoading key={index} />)}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => slideRight(elementRef.current)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 absolute top-20 right-0 bg-gray-300 cursor-pointer p-1 rounded-full text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
};

export default ShopList;
