const CardSkeletons = () => {
  return (
    <div className="bg-[#FFFFFF] rounded-[20px] overflow-hidden shadow-lg basis-[300px] animate-pulse">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-5 space-y-4">
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeletons;
