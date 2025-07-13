import React, { useState } from 'react';
import { supabase } from '../client';
import { toast } from 'react-toastify';        // <-- IMPORT TOAST
import AnimatedPage from '../components/AnimatedPage'; // <-- IMPORT ANIMATION WRAPPER

const AddCreator = () => {
  const [creator, setCreator] = useState({ name: '', url: '', description: '', imageURL: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createCreator = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('creators')
      .insert({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL,
      });

    if (error) {
      console.error('Error inserting data:', error);
      toast.error('Error adding creator. Check the console.'); // <-- USE TOAST FOR ERROR
    } else {
      toast.success('Creator added successfully!'); // <-- USE TOAST FOR SUCCESS
      window.location = "/"; // Redirect to home page
    }
  };

  return (
    // WRAP THE ENTIRE PAGE IN THE ANIMATION COMPONENT
    <AnimatedPage>
      <div>
        <h2>Add a New Content Creator</h2>
        <form onSubmit={createCreator}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />

          <label htmlFor="imageURL">Image URL</label>
          <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleChange} />
          <small>Provide a URL to an image of the creator.</small>

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={creator.description} onChange={handleChange} required></textarea>
          <small>Provide a description of the creator.</small>

          <label htmlFor="url">YouTube/Twitch URL</label>
          <input type="text" id="url" name="url" value={creator.url} onChange={handleChange} required />
          <small>Provide a link to their main platform.</small>

          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default AddCreator;