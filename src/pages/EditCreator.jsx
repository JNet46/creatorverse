import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({ name: '', url: '', description: '', imageURL: '' });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        navigate('/'); // Redirect home if creator not found
      } else {
        setCreator(data);
      }
    };
    fetchCreator();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => ({ ...prev, [name]: value }));
  };

  const updateCreator = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL,
      })
      .eq('id', id);

    if (error) {
      alert('Error updating creator. Check console.');
      console.error(error);
    } else {
      alert('Creator updated successfully!');
      navigate(`/${id}`); // Go back to the detail view
    }
  };

  const deleteCreator = async (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm("Are you sure you want to delete this creator?");

    if (userConfirmed) {
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting creator. Check console.');
            console.error(error);
        } else {
            alert('Creator deleted successfully!');
            navigate('/'); // Go back to the home page
        }
    }
  };

  return (
    <div>
      <h2>Edit Creator</h2>
      <form onSubmit={updateCreator}>
        <label>Name</label>
        <input type="text" name="name" value={creator.name} onChange={handleChange} required />
        <label>Image URL</label>
        <input type="text" name="imageURL" value={creator.imageURL} onChange={handleChange} />
        <label>Description</label>
        <textarea name="description" value={creator.description} onChange={handleChange} required></textarea>
        <label>Platform URL</label>
        <input type="text" name="url" value={creator.url} onChange={handleChange} required />
        <br />
        <button type="submit">Update Creator</button>
        <button className="secondary" onClick={deleteCreator} style={{ marginLeft: '10px' }}>Delete Creator</button>
      </form>
    </div>
  );
};

export default EditCreator;