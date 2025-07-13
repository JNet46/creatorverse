import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import AnimatedPage from '../components/AnimatedPage'; // <-- IMPORT ANIMATION WRAPPER

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
      if (error) console.error('Error fetching creator:', error);
      else setCreator(data);
    };
    fetchCreator();
  }, [id]);

  if (!creator) {
    return <h2>Loading...</h2>;
  }

  return (
    // WRAP THE ENTIRE PAGE IN THE ANIMATION COMPONENT
    <AnimatedPage>
      <article>
        <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: '400px', objectFit: 'cover' }} />
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button">
          Visit Channel
        </a>
        <Link to={`/edit/${id}`} role="button" className="contrast">
          Edit Creator
        </Link>
      </article>
    </AnimatedPage>
  );
};

export default ViewCreator;