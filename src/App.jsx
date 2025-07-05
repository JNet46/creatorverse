import { useState, useEffect } from 'react';
import { supabase } from './client';
import CreatorCard from './components/CreatorCard';
import CreatorForm from './components/CreatorForm';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [creators, setCreators] = useState([]);
  const [editingCreator, setEditingCreator] = useState(null);
  const [loading, setLoading] = useState(true); // Added for loading state

  // READ: Fetch all creators on initial component mount
  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators') // Make sure your table is named 'creators'
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

  // CREATE & UPDATE: Unified function to handle both
  const handleSaveCreator = async (creatorData) => {
    if (editingCreator) {
      // UPDATE logic
      const { error } = await supabase
        .from('creators')
        .update(creatorData)
        .eq('id', editingCreator.id);

      if (error) {
        toast.error('Failed to update creator.');
        console.error('Error updating:', error);
      } else {
        toast.success('Creator updated successfully!');
        setEditingCreator(null); // Reset editing state
        // Manually update the local state for instant feedback
        setCreators(creators.map(c => c.id === editingCreator.id ? {...c, ...creatorData} : c));
      }
    } else {
      // CREATE logic
      const { data, error } = await supabase
        .from('creators')
        .insert([creatorData])
        .select(); // Use .select() to get the newly created row back

      if (error) {
        toast.error('Failed to add creator.');
        console.error('Error adding:', error);
      } else {
        toast.success('Creator added successfully!');
        // Add the new creator to the top of the list for instant feedback
        setCreators(prevCreators => [data[0], ...prevCreators]);
      }
    }
  };

  // DELETE: Remove a creator
  const handleDeleteCreator = async (creatorId) => {
    // Optimistic UI update: remove from state first
    const originalCreators = [...creators];
    setCreators(creators.filter(c => c.id !== creatorId));

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', creatorId);

    if (error) {
      toast.error('Failed to delete creator.');
      console.error('Error deleting:', error);
      // Revert state if the delete fails
      setCreators(originalCreators);
    } else {
      toast.success('Creator deleted.');
    }
  };

  // Helper function to set the creator to be edited
  const handleEdit = (creator) => {
    setEditingCreator(creator);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Helper function to cancel the edit mode
  const handleCancelEdit = () => {
    setEditingCreator(null);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      {/* This component displays the toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container mx-auto p-4 sm:p-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-cyan-400">CreatorVerse</h1>
          <p className="text-slate-400 mt-2">Your personal showcase of favorite content creators.</p>
        </header>

        <main>
          {/* Form for Creating and Editing */}
          <CreatorForm 
            onSave={handleSaveCreator} 
            initialData={editingCreator} 
            onCancel={handleCancelEdit}
          />

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-slate-700 pb-2">All Creators</h2>
            {loading ? (
              <p className="text-slate-500 text-center py-8">Loading...</p>
            ) : creators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {creators.map((creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    onDelete={() => handleDeleteCreator(creator.id)}
                    onEdit={() => handleEdit(creator)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No creators found. Add one above to get started!</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;