import React from 'react';
import { DeutscheBahnIcon } from '../../assets/icons/DeutscheBahnIcon';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { LanguageIcon } from '../../assets/icons/LanguageIcon';
import IconButton from '../ui/IconButton/IconButton';
import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <DeutscheBahnIcon className="nav-db-icon" />
        </div>
      </div>
      <div className="nav-right">
        <IconButton icon={HomeIcon} ariaLabel="Home" />
        <IconButton icon={LanguageIcon} ariaLabel="Language" />
      </div>
    </nav>
  );
};

export default Navigation;