// src/App.jsx - The NEW Simplified Version

import { useState, useEffect } from 'react';
import { supabase } from './client';
import CreatorCard from './components/CreatorCard';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'; // Import Link for the "Add" button

function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  // ALL THE handleSaveCreator, handleDeleteCreator, handleEdit, etc. functions are REMOVED.
  // The CreatorForm is also REMOVED from this page.

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <Toaster position="top-center" />
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-cyan-400">CreatorVerse</h1>
          <p className="text-slate-400 mt-2">Your personal showcase of favorite content creators.</p>
        </header>

        <main>
          {/* A simple link to the new "Add Creator" page */}
          <div className="text-center mb-12">
            <Link to="/add" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-md shadow-lg transition-transform transform hover:scale-105">
              + Add a New Creator
            </Link>
          </div>

          <div className="mt-8">
            {loading ? (
              <p className="text-slate-500 text-center py-8">Loading creators...</p>
            ) : creators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* The CreatorCard no longer needs onDelete or onEdit props */}
                {creators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No creators found. Add one to get started!</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;