import { ArrowLeft, ArrowRight, Home, Globe } from 'lucide-react';
import DeutscheBahnIcon from '../../assets/icons/DeutscheBahnIcon.svg';
import './Navigation.scss'

export function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <img className="logo" src={DeutscheBahnIcon} alt="Deutsche Bahn" />
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
