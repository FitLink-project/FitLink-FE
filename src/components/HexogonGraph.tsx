export interface HexagonGraphProps {
  data?: Record<string, number>; // 위쪽부터 시계방향 순서
}

export default function HexagonGraph({
  data = {
    체력: 80,
    지력: 60,
    매력: 90,
    근력: 70,
    민첩: 85,
    행운: 50,
  },
}: HexagonGraphProps) {
  const cx = 50; // SVG 중심 좌표
  const cy = 50;
  const radius = 30; // 육각형 반지름
  const textRadius = radius + 10; // 텍스트 위치 (반지름보다 약간 바깥)

  // 각도 정의 (Top부터 시계방향: -90, -30, 30, 90, 150, 210)
  // 360도를 6으로 나누면 60도씩 증가합니다.
  const angles = [-90, -30, 30, 90, 150, 210];

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

  // 배경 육각형 좌표 계산 (4단계로 나눔)
  const bgHexagons = [4, 3, 2, 1].map((i) => {
    const r = radius * (i / 4);
    return angles
      .map((angle) => {
        const { x, y } = getCoordinate(angle, r);
        return `${x},${y}`;
      })
      .join(" ");
  });

  // 데이터 육각형 좌표 계산
  const dataPoints = angles
    .map((angle, i) => {
      // 데이터가 6개보다 적을 경우를 대비해 scores[i]가 없으면 0 처리
      const score = scores[i] || 0;
      const r = radius * (score / 100);
      const { x, y } = getCoordinate(angle, r);
      return `${x},${y}`;
    })
    .join(" ");

  // 점수의 최댓값과 최솟값 -> 텍스트 색 지정에 사용
  const min = Math.min(...scores);
  const max = Math.max(...scores);

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      {/* 배경 육각형들 */}
      {bgHexagons.map((points, idx) => (
        <polygon
          key={idx}
          points={points}
          fill="none"
          stroke="#CBC9C9"
          strokeWidth="0.5"
        />
      ))}

      {/* 중심선 (선택사항: 중심에서 각 꼭짓점으로 뻗는 선) */}
      {angles.map((angle, i) => {
        const { x, y } = getCoordinate(angle, radius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#E5E7EB"
            strokeWidth="0.5"
          />
        );
      })}

      {/* 데이터 영역 */}
      <polygon
        points={dataPoints}
        fill="rgba(114, 166, 255, 0.5)"
        stroke="#72A6FF"
        strokeWidth="1.5"
      />

      {/* 텍스트 라벨 */}
      {labels.map((label, i) => {
        // 데이터가 각도 개수(6개)보다 많으면 렌더링 중단
        if (i >= angles.length) return null;

        const angle = angles[i];
        const currentScore = scores[i];

        // 텍스트 색 결정
        let fillColor = "#6B7280"; // gray-500
        if (currentScore === max) fillColor = "#3B82F6"; // blue-500
        if (currentScore === min) fillColor = "#EF4444"; // red-500

        // 텍스트 위치 계산
        const { x, y } = getCoordinate(angle, textRadius);

        // 텍스트 정렬 (육각형 위치에 따라 조정)
        let textAnchor: "middle" | "end" | "start" = "middle";

        // 왼쪽 (-90~90 범위 밖인 150, 210)
        if (angle > 90 && angle < 270) {
          textAnchor = "end";
        }
        // 오른쪽 (-30, 30)
        else if (angle > -90 && angle < 90) {
          textAnchor = "start";
        }
        // 위(-90), 아래(90)는 기본값 middle

        // 텍스트 수직 정렬 보정 (Baseline 문제 해결)
        let dy = "0.3em";
        if (angle === -90) dy = "0"; // 맨 위
        if (angle === 90) dy = "0.8em"; // 맨 아래

        return (
          <text
            key={label}
            x={x}
            y={y}
            dy={dy}
            textAnchor={textAnchor}
            fontSize="4"
            fill={fillColor}
            className="font-bold"
            style={{ fontSize: "4px" }} // SVG 내 폰트 크기 명시
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
