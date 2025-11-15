import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen text-gray-900 font-mplus1">
      <main className="max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

