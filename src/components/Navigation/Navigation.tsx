import React from 'react';
import { ArrowLeft, ArrowRight, Home, Globe } from 'lucide-react';
import { DeutscheBahnIcon } from '../../assets/icons/DeutscheBahnIcon';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import IconButton from '../ui/IconButton';
import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <DeutscheBahnIcon />
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-button">
          <ArrowLeft className="icon" />
        </button>

        <button className="nav-button">
          <ArrowRight className="icon" />
          <IconButton icon={HomeIcon} ariaLabel="Home" />
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
};

export default Navigation;