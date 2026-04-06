import Dashboard from '../components/Dashboard';

/**
 * Dashboard page component
 * Admin view for managing orders
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-amber-400 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-zinc-400">
            Manage and track all customer orders
          </p>
        </div>

        <Dashboard />
      </div>
    </div>
  );
}
