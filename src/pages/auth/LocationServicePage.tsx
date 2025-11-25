import PageHeader from "../../components/PageHeader";

export default function LocationServicePage() {

  return (
    <div className="animate-slideUpFadeIn">
      <PageHeader title="위치기반 서비스 이용약관" />

      <div className="bg-white py-4 mt-4 px-9">
        <div className="text-base text-softBlack font-pretendard font-extralight leading-[100%] tracking-normal whitespace-pre-line">
{`제 1장 총칙
본 약관은 회원(약관에 동의한 자를 말합니다. 이하 '회원'이라고 합니다.)이 FitLink(이하 '회사'라고 합니다.)가 제공하는 '위치기반' 서비스(이하 '서비스'라고 합니다.)를 이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제1조(서비스의 내용)
회사가 제공하는 서비스는 아래와 같습니다.
- 회원의 위치 기준 주변 공공체육시설 조회 및 길찾기 수행

제2조(개인정보의 이용 또는 제공)
회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는 경우에는 미리 이용약관에 명시한 후 개인위치정보주체의 동의를 얻어야 합니다. 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 회원가입시 초기 서비스화면에 게시합니다.

제3조(개인위치정보주체의 권리)
회원은 회사에 대하여 언제든지 개인위치정보의 이용·제공의 중지를 요구할 수 있으며, 중지는 회원 탈퇴를 하는 것으로 이루어집니다. 회사는 이를 거절할 수 없습니다.`}
        </div>
      </div>
    </div>
  );
}

