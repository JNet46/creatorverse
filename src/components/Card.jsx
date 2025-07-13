import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, url, description, imageURL }) => {
  return (
    <article>
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
  );
};

export default Card;