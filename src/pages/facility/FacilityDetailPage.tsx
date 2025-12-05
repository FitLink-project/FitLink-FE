import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import SearchBar from "../../components/SearchBar";
import MapContainer from "../../components/MapContainer";
import { getFacilityDetail } from "../../api/facility";

// 아이콘
import CopyDefault from "../../assets/Icon/Copy-Default.png";
import CopyHover from "../../assets/Icon/Copy-Hover.png";

export default function FacilityDetailPage() {
    const { facilityId } = useParams();
    const navigate = useNavigate();
    const [facility, setFacility] = useState<any>(null);
    const [copyHover, setCopyHover] = useState(false);


    const [userLat, setUserLat] = useState<number | null>(null);
    const [userLng, setUserLng] = useState<number | null>(null);


    //현재 위치 가져오기 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLat(pos.coords.latitude);
            setUserLng(pos.coords.longitude);
        });
    }, []);


    useEffect(() => {
        async function load() {
            if (!facilityId) return;
            const data = await getFacilityDetail(Number(facilityId));
            setFacility(data);
        }
        load();
    }, [facilityId]);

    if (!facility) return <div>불러오는 중...</div>;

    // 주소 복사하기
    const handleCopy = () => {
        navigator.clipboard.writeText(facility.address);
        alert("주소가 복사되었습니다!");
    };

    // 길찾기 이동 
    const handleRoute = () => {
        navigate(`/facility/${facilityId}/route`, {
            state: {
                originName: "내 위치",
                destName: facility.facilityName,
                userLat,
                userLng,
                destLat: facility.latitude,
                destLng: facility.longitude,
            },
        });
    };

    return (
        <div className="w-full h-screen flex flex-col bg-softWhite relative overflow-hidden">

            {/* TOP BAR */}
            <div className="fixed top-0 left-0 w-full z-40">
                <TopBar isLoggedIn={true} />
            </div>

            {/* 지도 전체 */}
            <div className="absolute inset-0 z-10">
                <MapContainer
                    center={{ lat: facility.latitude, lng: facility.longitude }}
                    facilities={[facility]}
                    selectedFacility={facility}
                />
            </div>

            {/* 검색바 — 지도 위 중앙 */}
            <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-[400px]">
                <SearchBar
                    type="default"
                    placeholder="검색어를 입력하세요"
                    onClick={() => navigate("/facility/search")}
                />
            </div>

            {/* 상세 카드 — 지도 위에 떠 있음 */}
            <div className="absolute bottom-[70px] left-0 w-full px-4 z-20">
                <div className="w-full bg-white shadow-lg rounded-xl px-5 py-5">

                    {/* 시설명 + 길찾기 */}
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold text-softBlack">{facility.facilityName}</h2>

                        {/* 길찾기 버튼 */}
                        <button
                            onClick={handleRoute}
                            className="text-sm bg-[#EDEDED] px-3 py-1 rounded-full"
                        >
                            길찾기
                        </button>
                    </div>

                    {/* 주소 + 복사 아이콘 */}
                    <div className="flex items-center gap-2 text-gray mt-1">
                        <p>{facility.address}</p>

                        <img
                            src={copyHover ? CopyHover : CopyDefault}
                            onClick={handleCopy}
                            onMouseEnter={() => setCopyHover(true)}
                            onMouseLeave={() => setCopyHover(false)}
                            alt="copy"
                            className="w-4 h-4 cursor-pointer"
                        />
                    </div>

                    {/* 운영 프로그램 */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2 text-softBlack">운영 프로그램</h3>

                        {facility.programNames?.length > 0 ? (
                            <ul className="list-disc pl-5 text-gray">
                                {facility.programNames.map((p: string, i: number) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray">등록된 프로그램이 없습니다.</p>
                        )}
                    </div>

                    {/* 버튼 2개 — 홈페이지 / 상세보기 */}
                    <div className="flex gap-2 mt-5">

                        {/* 홈페이지 */}
                        <button
                            className="flex-1 py-3 bg-[#E5EDFF] text-main font-semibold rounded-lg"
                            onClick={() => window.open(facility.homepageUrl)}
                        >
                            홈페이지
                        </button>

                        {/* 프로그램 상세보기 */}
                        <button
                            className="flex-1 py-3 bg-main text-white font-semibold rounded-lg"
                            onClick={() => navigate(`/facility/${facilityId}/programs`)}
                        >
                            프로그램 상세보기
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <BottomBar />
        </div>
    );
}