import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import BackIcon from "../../assets/Icon/Back-Hover.png";
import { searchFacilities } from "../../api/facility";

export default function FacilitySearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch() {
    if (!keyword.trim()) return;

    try {
      const data = await searchFacilities(keyword);
      if (data.isSuccess) setResults(data.result.facilities);
    } catch (e) {
      console.error("검색 실패:", e);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function handleSelect(item: any) {
    navigate("/facility", {
      state: {
        center: { lat: item.latitude, lng: item.longitude },
        selectedFacility: item,
      },
    });
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <TopBar isLoggedIn={true} />

      {/* 검색바 */}
      <div className="mt-[72px] px-4">
        <div className="w-full h-[48px] rounded-2xl flex items-center px-4 gap-3 bg-[#EEEEEE]">
          <button onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="back" className="w-5 h-5 opacity-70" />
          </button>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}  // ⬅ 엔터로 검색 실행
            placeholder="지하철역 또는 체육시설 검색"
            className="flex-1 bg-transparent text-[15px] text-gray-700
                       placeholder:text-[#A1A1A1] focus:outline-none"
          />
        </div>
      </div>

      {/* 안내 문구 */}
      {results.length === 0 && keyword.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <p className="text-gray-500 text-sm mt-10">
            근처 지하철역이나 공공체육시설 명으로 검색해보세요!
          </p>
        </div>
      )}

      {/* 검색 결과 */}
      {results.length > 0 && (
        <div className="px-4 mt-4 overflow-y-auto flex-1">
          {results.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="py-4 border-b cursor-pointer"
            >
              <div className="text-[16px] font-semibold">
                {item.facility_name}
              </div>
              <div className="text-[13px] text-gray-500">{item.address}</div>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full z-30">
        <BottomBar />
      </div>
    </div>
  );
}
