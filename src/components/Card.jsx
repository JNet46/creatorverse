import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

// Define the animation variant for a single card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Card = ({ id, name, url, description, imageURL }) => {
  return (
    // Use motion.div and pass the variants
    <motion.div className="card-container" variants={cardVariants}>
      <article>
        {/* ... rest of your card component is the same ... */}
        <img src={imageURL} alt={name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
        <div className="card-content">
          <h3>{name}</h3>
          <p>{description.substring(0, 100)}...</p>
          <a href={url} target="_blank" rel="noopener noreferrer" role="button" className="secondary">
            Visit Channel
          </a>
          <Link to={`/${id}`} role="button">
            View Details
          </Link>
        </div>
      </article>
    </motion.div>
  );
};

export default Card;