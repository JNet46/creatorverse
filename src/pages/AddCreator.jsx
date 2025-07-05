// src/pages/AddCreator.jsx - NEW FILE

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import CreatorForm from '../components/CreatorForm';
import { toast, Toaster } from 'react-hot-toast';

const AddCreator = () => {
    const navigate = useNavigate();

    const handleAddCreator = async (creatorData) => {
        const { error } = await supabase
            .from('creators')
            .insert([creatorData]);

        if (error) {
            toast.error("Failed to add creator.");
            console.error(error);
        } else {
            toast.success("Creator added successfully!");
            navigate('/'); // Go back to the homepage
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen text-white p-8">
            <Toaster position="top-center" />
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400">Add a New Creator</h1>
                <CreatorForm onSave={handleAddCreator} onCancel={() => navigate('/')} />
            </div>
        </div>
    );
};

export default AddCreator;