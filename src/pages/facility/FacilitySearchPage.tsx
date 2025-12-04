import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import BackIcon from "../../assets/Icon/Back-Hover.png";
import DeleteIcon from "../../assets/Icon/Delete-Default.png";
import SearchIcon from "../../assets/Icon/Search-Gray.png";
import { searchFacilities } from "../../api/facility";

export default function FacilitySearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch() {
    if (!keyword.trim()) return;

    try {
      const data = await searchFacilities(keyword);
      console.log("🔥 검색 API 응답:", data);

      if (data.isSuccess) {
        setResults(data.result.facilities);
        console.log("🔥 facilities:", data.result.facilities);

      }
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
    console.log("클릭된 item:", item);
    console.log("item.latitude:", item.latitude);
    console.log("item.longitude:", item.longitude);

   /* navigate("/facility", {
      state: {
        center: { lat: item.latitude, lng: item.longitude },
        selectedFacility: item,
      },
    });*/
     navigate(`/facility/${item.facility_id}`); //상세 페이지로 이동 
  }

  // 검색어 삭제 
  function handleClear() {
    setKeyword(""); setResults([]);
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <TopBar isLoggedIn={true} />

      {/* 검색바 */}
      <div className="mt-[72px] px-4">
        <div className="w-full h-[48px] rounded-2xl flex items-center px-4 bg-[#EEEEEE]">

          <button onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="back" className="w-5 h-5 opacity-70" />
          </button>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="지하철역 또는 체육시설 검색"
            className="
        flex-1 bg-transparent text-[15px] text-gray-700
        placeholder:text-[#A1A1A1] focus:outline-none
        mr-2
      "
          />

          {/* X 버튼 */}
          {keyword.length > 0 && (
            <button onClick={handleClear}>
              <img src={DeleteIcon} alt="delete" className="w-4 h-4 opacity-70" />
            </button>
          )}
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
      {keyword.length > 0 && (
        <div className="px-4 mt-4 overflow-y-auto flex-1">

          {results.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="py-4 flex items-start gap-3 cursor-pointer"
            >
              {/* 왼쪽 돋보기 아이콘 */}
              <img
                src={SearchIcon}
                alt="search"
                className="w-5 h-5 mt-[2px] opacity-70"
              />

              {/* 텍스트 */}
              <div>
                <div className="text-[16px] font-semibold text-gray-800">
                  {item.facility_name}
                </div>
                <div className="text-[13px] text-gray-500">
                  {item.address}
                </div>
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div className="text-center text-gray-400 mt-10">
              검색 결과가 없습니다.
            </div>
          )}

        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full z-30">
        <BottomBar />
      </div>
    </div>
  );
}