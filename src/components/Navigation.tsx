import { ArrowLeft, ArrowRight, Home, Globe } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          DB
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-button">
          <ArrowLeft className="icon" />
        </button>
        <button className="nav-button">
          <ArrowRight className="icon" />
        </button>
        <button className="nav-button">
          <Home className="icon" />
        </button>
        <button className="nav-button">
          <Globe className="icon" />
        </button>
      </div>
    </nav>
  );
}
