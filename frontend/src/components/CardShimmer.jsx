const CardShimmer = ({ aspectRatioClass = "aspect-[3/4]" }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white animate-pulse">
      <div className={`${aspectRatioClass} bg-gray-200`}></div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CardShimmer;

  