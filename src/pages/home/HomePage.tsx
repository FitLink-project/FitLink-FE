import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        {/* FitLink 로고 */}
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-blue-500">Fit</span>
          <span className="text-gray-900">Link</span>
        </h1>
        <p className="text-gray-600 mb-12 text-lg">
          건강한 라이프스타일을 위한 연결
        </p>

        {/* 로그인 버튼 */}
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
}

