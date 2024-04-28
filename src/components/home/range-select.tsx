interface RangeSelectProps {
  radius: number;
  setRadius: (radius: number) => void;
  handleSearchShopRadius: ({
    categoryId,
    radiusNumber,
  }: {
    categoryId?: number;
    radiusNumber?: number;
  }) => Promise<void>;
}

const RangeSelect = ({
  radius,
  setRadius,
  handleSearchShopRadius,
}: RangeSelectProps) => {
  return (
    <div>
      <h2 className="font-bold">Select Radius (In Meter)</h2>
      <input
        type="range"
        className="w-full bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min={0}
        max={5000}
        step={500}
        onChange={(e) => {
          setRadius(parseInt(e.target.value));
          handleSearchShopRadius({ radiusNumber: parseInt(e.target.value) });
        }}
        defaultValue={radius}
      />
      <label className="text-gray-500">{radius} in Meter</label>
    </div>
  );
};

export default RangeSelect;
