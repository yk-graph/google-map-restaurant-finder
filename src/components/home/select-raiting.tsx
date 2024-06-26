import { raitingLists } from "@/constants/category-items";
import { useShopList } from "@/store/use-shoplist";

const SelectRaiting = () => {
  const { selectedRaitingIds, setSelectedRaitingIds } = useShopList();

  return (
    <div>
      <h2 className="font-bold">Select Raiting</h2>
      <div>
        {raitingLists.map((item) => (
          <div key={item.id} className="flex justify-between">
            <label>{item.icon}</label>
            <input
              type="checkbox"
              value={item.id}
              onChange={(e) => {
                setSelectedRaitingIds(
                  selectedRaitingIds.includes(Number(e.target.value))
                    ? selectedRaitingIds.filter(
                        (id) => id !== Number(e.target.value)
                      )
                    : [...selectedRaitingIds, Number(e.target.value)]
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRaiting;
