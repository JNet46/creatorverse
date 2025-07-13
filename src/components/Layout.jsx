// src/components/Layout.jsx

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Layout = () => {
  return (
    <div>
      <header>
        {/* We will style this using a class name now */}
        <nav className="header-nav">

          {/* 1. The title is now just a strong tag */}
          <strong style={{ fontSize: '1.5rem' }}>CreatorVerse</strong>

          {/* 2. The buttons are grouped inside their own div */}
          <div className="nav-buttons">
            <Link to="/" role="button" className="secondary">
              View All Creators
            </Link>
            <Link to="/new" role="button">
              Add a Creator
            </Link>
          </div>
          
        </nav>
      </header>
      <main className="container">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;