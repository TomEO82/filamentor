export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Welcome to Filamentor</h2>
      <p className="text-gray-600">Use the navigation to explore Spools, Jobs, Requests and Alerts.</p>
      <a href="/dashboard" className="btn btn-primary w-fit">Open Dashboard</a>
    </div>
  );
}

