import React, { useState, useEffect } from 'react';
import { supabase } from './client';
import CreatorCard from './components/CreatorCard';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all creators from the database when the component mounts
  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Could not fetch creators.');
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []); // The empty dependency array means this effect runs only once

  return (
    // Main container with a dark background and a subtle dotted pattern
    <div 
      className="bg-gray-900 min-h-screen text-white font-sans" 
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #4B5563 1px, transparent 0)', 
        backgroundSize: '25px 25px'
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="container mx-auto p-4 sm:p-8">
        <header className="text-center my-12">
          {/* Main heading with a gradient text effect and a subtle animation */}
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent pb-2 animate-fade-in-down">
            CreatorVerse
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Discover, showcase, and manage your favorite content creators all in one place.
          </p>
        </header>

        <main>
          {/* A styled link that navigates to the "Add Creator" page */}
          <div className="text-center mb-16">
            <Link 
              to="/add" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-cyan-400/20"
            >
              + Add a New Creator
            </Link>
          </div>

          <div className="mt-8">
            {/* Conditional Rendering: Show loading, the grid, or a "not found" message */}
            {loading ? (
              <p className="text-gray-500 text-center py-8 text-lg">Loading creators...</p>
            ) : creators.length > 0 ? (
              // The responsive grid container
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {creators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            ) : (
              // A styled message for when no creators exist in the database
              <div className="text-center py-16 px-6 bg-gray-800/50 border border-gray-700 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-200">No Creators Found</h3>
                <p className="text-gray-400 mt-2">Get started by adding your first creator!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;