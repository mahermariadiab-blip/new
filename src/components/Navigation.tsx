import { ArrowLeft, ArrowRight, Home, Globe } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-red-600 text-white font-bold text-2xl px-3 py-1 rounded">
          DB
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowRight className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Home className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Globe className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </nav>
  );
}
