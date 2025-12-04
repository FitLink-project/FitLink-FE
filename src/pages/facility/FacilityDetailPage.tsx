import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFacilityPrograms } from "../../api/facility";
import BackIcon from "../../assets/Icon/Back-Default.png";
import CopyIcon from "../../assets/Icon/Copy-Default.png"; // 복사 아이콘 경로 맞춰 수정

export default function ProgramDetailPage() {
    const { facilityId } = useParams();
    const navigate = useNavigate();
    const [facility, setFacility] = useState<any>(null);

    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function loadData() {
            if (!facilityId) return;

            const res = await getFacilityPrograms(Number(facilityId));
            const data = res.result;
            if (!data) return;
            
            setFacility(data);

            const categoryList = Array.from(
                new Set(data.programs.map((p: any) => p.name))
            );

            setCategories(["전체", ...categoryList]);
        }

        loadData();
    }, [facilityId]);

    if (!facility) return <div className="p-4 text-gray">불러오는 중...</div>;

    const filteredPrograms =
        selectedCategory === "전체"
            ? facility.programs
            : facility.programs.filter((p: any) => p.name.includes(selectedCategory));

    /** -------------------------
     *   주소 복사 기능(alert 포함)
     -------------------------- */
    const copyAddress = () => {
        navigator.clipboard.writeText(facility.address);
        alert("주소가 복사되었습니다!");
    };

    /** -------------------------
     *   길찾기 (카카오맵)
     -------------------------- */
    const openMap = () => {
        const url = `https://map.kakao.com/link/to/${facility.facilityName},${facility.latitude},${facility.longitude}`;
        window.open(url);
    };

    return (
        <div className="w-full min-h-screen bg-softWhite flex flex-col">

            {/* 상단바 */}
            <div className="fixed top-0 left-0 w-full z-30 flex items-center px-4 h-[60px] bg-white shadow">
                <button onClick={() => navigate(-1)}>
                    <img src={BackIcon} alt="back" className="w-6 h-6" />
                </button>
                <div className="flex-1 text-center font-semibold text-[16px]">
                    프로그램 정보
                </div>
            </div>

            <div className="mt-[60px] px-4 pb-24">

                {/* 시설 카드 */}
                <div className="bg-white rounded-xl px-4 py-4 mb-4 shadow">

                    {/* 시설명 + 길찾기 */}
                    <div className="flex justify-between items-start">
                        <div className="text-lg font-semibold">{facility.facilityName}</div>

                        <button
                            onClick={openMap}
                            className="px-3 py-1 rounded-full border border-lightGray text-[12px] text-gray-600"
                        >
                            길찾기
                        </button>
                    </div>

                    {/* 주소 + 복사 */}
                    <div className="flex items-center gap-1 mt-1">
                        <div className="text-sm text-gray">{facility.address}</div>

                        <button onClick={copyAddress} className="p-1">
                            <img src={CopyIcon} alt="copy" className="w-4 h-4 opacity-50" />
                        </button>
                    </div>

                    {/* 홈페이지 버튼 */}
                    {facility.homepage && (
                        <button
                            onClick={() => window.open(facility.homepage)}
                            className="w-full bg-main bg-opacity-10 rounded-lg py-3 mt-3 text-main font-medium"
                        >
                            홈페이지
                        </button>
                    )}
                </div>

                {/* 프로그램 제목 */}
                <h3 className="font-semibold text-[16px] mb-3">프로그램 정보</h3>

                {/* 카테고리 */}
                <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap
                                ${
                                    selectedCategory === cat
                                        ? "bg-main text-white border-main"
                                        : "bg-white text-gray border-lightGray"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 프로그램 카드 */}
                {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((p: any) => (
                        <div
                            key={p.programId}
                            className="bg-white p-4 rounded-xl mb-4 shadow-sm"
                        >
                            <div className="flex justify-between items-start">

                                {/* 왼쪽 프로그램명 */}
                                <h3 className="text-main font-semibold text-[15px] w-[35%] leading-[20px]">
                                    {p.name}
                                </h3>

                                {/* 오른쪽 상세 정보 */}
                                <div className="w-[20%] space-y-2 text-[13px]">

                                    <div className="flex">
                                        <span className="text-gray-400 w-14">대상</span>
                                        <span className="text-softBlack ml-12">{p.target}</span>
                                    </div>

                                    <div className="flex">
                                        <span className="text-gray-400 w-14">요일</span>
                                        <span className="text-softBlack ml-12">
                                            {p.days.replace(/\|/g, " / ")}
                                        </span>
                                    </div>

                                    <div className="flex">
                                        <span className="text-gray-400 w-14">시간대</span>
                                        <span className="text-softBlack ml-12">{p.time}</span>
                                    </div>

                                    <div className="flex">
                                        <span className="text-gray-400 w-14">모집인원</span>
                                        <span className="text-softBlack ml-12">{p.capacity}</span>
                                    </div>

                                    <div className="flex font-semibold">
                                        <span className="text-gray-400 w-14">가격</span>
                                        <span className="text-softBlack ml-12">
                                            {p.price.toLocaleString()}원
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray text-sm">등록된 프로그램이 없습니다.</div>
                )}
            </div>
        </div>
    );
}
