import { useState } from "react";

const RangeSelect = () => {
  const [radius, setRadius] = useState(50);

  return (
    <div>
      <h2 className="font-bold">Select Radius (In Meter)</h2>
      <input
        type="range"
        className="w-full bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min={0}
        max={100}
        step={10}
        onChange={(e) => setRadius(parseInt(e.target.value))}
        defaultValue={radius}
      />
      <label className="text-gray-500">{radius * 100} in Meter</label>
    </div>
  );
};

export default RangeSelect;
