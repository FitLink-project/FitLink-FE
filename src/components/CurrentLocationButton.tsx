// src/components/CurrentLocationButton.tsx
import MapClick from "@/assets/Icon/Map-Click.png";

interface Props {
  onClick: () => void;
}

export default function CurrentLocationButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-32 right-4 shadow-lg rounded-full bg-white p-2"
    >
      <img src={MapClick} alt="my location" className="w-10 h-10" />
    </button>
  );
}
