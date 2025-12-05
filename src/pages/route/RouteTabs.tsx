// src/pages/route/RouteTabs.tsx
interface Props {
  count: number;
  selectedIndex: number;
  onChange: (idx: number) => void;
}

export default function RouteTabs({ count, selectedIndex, onChange }: Props) {
  return (
    <div className="flex gap-2 px-4 mb-4">
      {[...Array(count)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-2 rounded-full text-sm border ${
            selectedIndex === i
              ? "bg-blue-600 text-white"
              : "bg-white border-gray-300"
          }`}
          onClick={() => onChange(i)}
        >
          최적 경로 {i + 1}
        </button>
      ))}
    </div>
  );
}
