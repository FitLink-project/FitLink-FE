interface FacilityCardProps {
  title: string;
  address: string;
  tags?: string[];
  prescription?: string[];
  homepageUrl?: string;
  onViewDetails?: () => void;
}

export function FacilityCard({
  title,
  address,
  tags = [],
  prescription = [],
  homepageUrl,
  onViewDetails,
}: FacilityCardProps) {
  const handleHomepageClick = () => {
    if (homepageUrl) {
      window.open(homepageUrl, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-5 font-mplus1">
      {/* 제목 및 길찾기 버튼 */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-softBlack font-mplus1">
            {title}
          </h3>
        </div>
        <button className="text-xs text-gray hover:text-main transition-colors ml-2 flex-shrink-0">
          길찾기
        </button>
      </div>

      {/* 주소 */}
      <p className="text-xs text-gray font-mplus1 mb-3">{address}</p>

      {/* 태그 */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-1 rounded-full font-mplus1 ${
              prescription.includes(tag) ? "bg-red-100 text-red-500" : "hidden"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2">
        <button
          onClick={handleHomepageClick}
          disabled={!homepageUrl}
          className="flex-1 py-2 px-3 border border-main text-main bg-white rounded-lg text-sm font-semibold font-mplus1 hover:bg-main hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          홈페이지
        </button>
        <button
          onClick={onViewDetails}
          className="flex-1 py-2 px-3 bg-main text-white rounded-lg text-sm font-semibold font-mplus1 hover:opacity-90 transition-opacity"
        >
          상세보기
        </button>
      </div>
    </div>
  );
}
