import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import { motion } from 'framer-motion'; // Import motion

// Define a container variant to orchestrate the stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children by 0.1s
    },
  },
};

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    // ... your fetchCreators function is the same ...
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div>
      {creators && creators.length > 0 ? (
        // Wrap the grid in a motion.div
        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {creators.map((creator) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))}
        </motion.div>
      ) : (
        <h2>No Creators Yet! 😞</h2>
      )}
    </div>
  );
};

export default ShowCreators;