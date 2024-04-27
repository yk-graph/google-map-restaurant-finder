import { useState } from "react";

import { raitingLists } from "@/constants/category-items";

const SelectRaiting = () => {
  const [selectedRaitingIds, setSelectedRaitingIds] = useState<number[]>([]);

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
              onChange={(e) =>
                setSelectedRaitingIds((prev) =>
                  prev.includes(Number(e.target.value))
                    ? prev.filter((id) => id !== Number(e.target.value))
                    : [...prev, Number(e.target.value)]
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRaiting;
