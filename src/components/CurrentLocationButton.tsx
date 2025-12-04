// src/components/CurrentLocationButton.tsx
import MapClick from "../assets/Icon/Location-Default.png";

interface Props {
  onClick: () => void;
}

export default function CurrentLocationButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        absolute bottom-100 right-4 
        w-12 h-12 flex items-center justify-center   /* 크기 고정 */
        bg-white rounded-full shadow-lg
      "
    >
      <img src={MapClick} alt="my location" className="w-6 h-6" />
    </button>
  );
}
