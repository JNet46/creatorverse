import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><strong>CreatorVerse</strong></li>
          </ul>
          <ul>
            <li><Link to="/" role="button" className="secondary">View All Creators</Link></li>
            <li><Link to="/new" role="button">Add a Creator</Link></li>
          </ul>
        </nav>
      </header>
      <main className="container">
        {/* Wrap Outlet with AnimatePresence */}
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;