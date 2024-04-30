import Image from "next/image";

import { categoryLists } from "@/constants/category-items";
import { useLocation } from "@/store/use-location";
import { useShopList } from "@/store/use-shoplist";

const CategoryList = () => {
  const { location } = useLocation();
  const { selectedCategoryId, setSelectedCategoryId } = useShopList();

  return (
    <div>
      <h2 className="font-bold">Select Food Type</h2>
      <div className="grid grid-cols-2">
        {categoryLists.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col justify-center items-center bg-gray-100 p-2 m-2 rounded-lg grayscale hover:grayscale-0 cursor-pointer transition-all
              ${
                selectedCategoryId === item.id &&
                "grayscale-0 border border-purple-400"
              }
              ${!location && "pointer-events-none"}
              `}
            onClick={() => setSelectedCategoryId(item.id)}
          >
            <Image src={item.icon} alt={item.name} height={40} width={40} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
