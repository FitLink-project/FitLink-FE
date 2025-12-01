export interface TriangleGraphProps {
  data: Record<string, number>; // 위, 왼쪽 아래, 오른쪽 아래 순서대로
}

export default function TriangleGraph({
  data = { 체력: 80, 지력: 60, 매력: 90 },
}: TriangleGraphProps) {
  const cx = 50; // SVG 중심 좌표
  const cy = 50;
  const radius = 30; // 삼각형 반지름
  const textRadius = radius + 8; // 텍스트 위치

  // 각도 정의 (순서는 [Top, Left-Bottom, Right-Bottom] 고정)
  const angles = [-90, 150, 30];

  // 데이터 추출
  const labels = Object.keys(data);
  const scores = Object.values(data);

  // 각도와 반지름으로 좌표 구하는 함수
  const getCoordinate = (
    angle: number,
    r: number
  ): { x: number; y: number } => {
    const radian = (angle * Math.PI) / 180;
    const x = cx + r * Math.cos(radian);
    const y = cy + r * Math.sin(radian);
    return { x, y };
  };

  // 배경 삼각형 좌표 계산
  const bgTriangles = [4, 3, 2, 1].map((i) => {
    const r = radius * (i / 4);
    return angles
      .map((angle) => {
        const { x, y } = getCoordinate(angle, r);
        return `${x},${y}`;
      })
      .join(" ");
  });

  // 데이터 삼각형 좌표 계산
  const dataPoints = angles
    .map((angle, i) => {
      const r = radius * (scores[i] / 100);
      const { x, y } = getCoordinate(angle, r);
      return `${x},${y}`;
    })
    .join(" ");

  // 점수의 최댓값과 최솟값 -> 텍스트 색 지정에 사용
  const min = Math.min(...scores);
  const max = Math.max(...scores);

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      {/* 배경 삼각형들 */}
      {bgTriangles.map((points, idx) => (
        <polygon
          key={idx}
          points={points}
          fill="none"
          stroke="#CBC9C9"
          strokeWidth="0.5"
        />
      ))}

      {/* 데이터 삼각형 */}
      <polygon
        points={dataPoints}
        fill="rgba(114, 166, 255, 0.5)"
        stroke="#72A6FF"
        strokeWidth="1.5"
      />

      {/* 텍스트 라벨 */}
      {labels.map((label, i) => {
        const angle = angles[i];
        const currentScore = data[label];

        // 텍스트 색 결정
        let fillColor = "#6B7280"; // 기본 gray-500
        if (currentScore === max) fillColor = "#3B82F6"; // blue-500
        if (currentScore === min) fillColor = "#EF4444"; // red-500

        // 텍스트 위치 계산
        const { x, y } = getCoordinate(angle, textRadius);

        let textAnchor: "middle" | "end" | "start" = "middle";
        if (angle === 150) textAnchor = "end"; // 왼쪽 라벨: 텍스트의 끝을 꼭짓점 쪽에 고정
        if (angle === 30) textAnchor = "start"; // 오른쪽 라벨: 텍스트의 시작을 꼭짓점 쪽에 고정

        return (
          <text
            key={label}
            x={x}
            y={y}
            textAnchor={textAnchor}
            fontSize="4"
            fill={fillColor}
            className="font-bold"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
