export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* 애니메이션 점들이 들어갈 컨테이너 */}
      <div className="justify-center">
        <div className="flex items-center justify-center">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="m-4">
          <p className="font-ms1 text-white">체력을 진단하고 있어요</p>
        </div>
      </div>
    </div>
  );
}
