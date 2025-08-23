import './globals.css';

export const metadata = {
  title: 'Filamentor',
  description: '3D Printing Business App',
  themeColor: '#0ea5e9',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <aside className="w-56 bg-gray-800 text-white flex flex-col p-4">
            <div className="text-2xl font-bold mb-6">Filamentor</div>
            <nav className="flex-1">
              <ul className="space-y-2">
                <li><a href="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</a></li>
                <li><a href="/spools" className="block py-2 px-3 rounded hover:bg-gray-700">Spools</a></li>
                <li><a href="/jobs" className="block py-2 px-3 rounded hover:bg-gray-700">Jobs</a></li>
                <li><a href="/catalog" className="block py-2 px-3 rounded hover:bg-gray-700">Catalog</a></li>
                <li><a href="/inventory" className="block py-2 px-3 rounded hover:bg-gray-700">Inventory</a></li>
                <li><a href="/requests" className="block py-2 px-3 rounded hover:bg-gray-700">Requests</a></li>
                <li><a href="/alerts" className="block py-2 px-3 rounded hover:bg-gray-700">Alerts</a></li>
                <li><a href="/scan" className="block py-2 px-3 rounded hover:bg-gray-700">Scan</a></li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

