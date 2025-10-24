import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="min-h-screen">
      {/* simple nav for testing */}
      <nav className="p-3 flex gap-4">
        <Link to="/" className="underline">Home</Link>
        <Link to="/bench" className="underline">Bench</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
