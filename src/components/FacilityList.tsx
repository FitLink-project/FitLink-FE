import type { Facility } from "../types/facilityTypes";

interface FacilityListProps {
  facilities: Facility[];
}

export default function FacilityList({ facilities }: FacilityListProps) {
  return (
    <div className="bg-white p-4 shadow-md rounded-t-xl">
      {facilities.map((f) => (
        <div key={f.id} className="py-3 border-b last:border-none">
          <p className="font-semibold">{f.name}</p>
          <p className="text-sm text-gray-600">{f.address}</p>
        </div>
      ))}
    </div>
  );
}
