// src/components/Layout.jsx

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Layout = () => {
  return (
    <div>
      <header>
        <nav className="header-nav">

          {/* Use the new CSS class instead of the inline style */}
          <strong className="site-title">
            CreatorVerse
          </strong>

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