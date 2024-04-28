function SkeltonLoading() {
  return (
    <div>
      <div className="w-40 flex-shrink-0 p-2 rounded-lg bg-white">
        <div className="animate-pulse flex flex-col gap-2">
          <div className="rounded-lg bg-slate-200 aspect-video" />
          <div className="h-4 bg-slate-200 rounded" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-slate-200 rounded col-span-2" />
            <div className="h-4 bg-slate-200 rounded col-span-1" />
          </div>
          <div className="h-4 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeltonLoading;
