import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { toast, Toaster } from 'react-hot-toast';

// Helper Icon Components
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const YouTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);
  const defaultImage = "https://i.imgur.com/3YQ4Q9s.png";

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        toast.error("Creator not found.");
        navigate('/'); // Redirect to home if the creator doesn't exist
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this creator? This action cannot be undone.")) {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error("Failed to delete creator. Please try again.");
        console.error("Delete error:", error);
      } else {
        toast.success("Creator deleted successfully!");
        navigate('/'); // Redirect to home page after successful deletion
      }
    }
  };

  if (loading) {
    return <div className="text-white bg-slate-900 min-h-screen flex justify-center items-center text-xl">Loading Creator...</div>;
  }

  // This check is a safeguard, but the navigate() in the fetch hook should prevent this state.
  if (!creator) {
    return <div className="text-white bg-slate-900 min-h-screen flex justify-center items-center text-xl">Creator not found.</div>;
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white p-4 sm:p-8">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">← Back to Creator Gallery</Link>

        <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden md:flex">
          <img 
            src={creator.image_url || defaultImage} 
            alt={`Image of ${creator.name}`}
            className="w-full md:w-1/3 h-64 md:h-auto object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src=defaultImage; }}
          />
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{creator.name}</h1>
              <p className="text-slate-300 mb-6">{creator.description}</p>
              
              {creator.youtube_url && (
                <a 
                  href={creator.youtube_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md shadow-sm mb-6 transition-colors"
                >
                  <YouTubeIcon />
                  Visit on YouTube
                </a>
              )}
            </div>

            <div className="flex space-x-4 mt-auto border-t border-slate-700 pt-6">
              <Link to={`/edit/${id}`} className="flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-md shadow-sm transition-colors">
                <EditIcon /> Edit
              </Link>
              <button onClick={handleDelete} className="flex items-center px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition-colors">
                <DeleteIcon /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// This is the crucial line that makes the import in main.jsx work.
export default ViewCreator;