import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import CreatorForm from '../components/CreatorForm'; // Reusing the form component
import { toast, Toaster } from 'react-hot-toast';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);

  // Step 1: Fetch the existing data for the creator to be edited.
  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single(); // Use .single() to get one object, not an array

      if (error) {
        console.error("Error fetching creator for edit:", error);
        toast.error("Could not find the specified creator.");
        navigate('/'); // Redirect to the home page if creator is not found
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id, navigate]); // Dependency array ensures this runs when the ID changes

  // Step 2: Define the function that will be called when the form is submitted.
  const handleUpdateCreator = async (updatedData) => {
    const { error } = await supabase
      .from('creators')
      .update(updatedData)
      .eq('id', id);

    if (error) {
      toast.error('Failed to update creator. Please try again.');
      console.error('Update error:', error);
    } else {
      toast.success('Creator updated successfully!');
      // Navigate to the view page for the updated creator for confirmation.
      navigate(`/view/${id}`); 
    }
  };
  
  // Step 3: Define the function for the cancel button.
  const handleCancel = () => {
    // Simply navigate back to the view page without saving any changes.
    navigate(`/view/${id}`);
  };

  // Show a loading state while fetching data.
  if (loading) {
    return <div className="text-white bg-slate-900 min-h-screen flex justify-center items-center text-xl">Loading Editor...</div>;
  }

  // Step 4: Render the reusable CreatorForm component.
  return (
    <div className="bg-slate-900 min-h-screen text-white p-4 sm:p-8">
      {/* Toaster is needed here to display notifications on this page */}
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400">Edit Creator</h1>
        
        {/* 
          Conditionally render the form only when 'creator' data is available.
          This prevents errors from passing 'null' as initialData.
        */}
        {creator && (
          <CreatorForm 
            initialData={creator} 
            onSave={handleUpdateCreator}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

// The essential default export that makes it importable.
export default EditCreator;