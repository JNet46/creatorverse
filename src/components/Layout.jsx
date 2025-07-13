import React from 'react';
import { Link, Outlet } from 'react-router-dom';

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
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;