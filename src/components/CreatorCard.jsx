import React from 'react';
import { Link } from 'react-router-dom';


function CreatorCard({ creator }) {
  const defaultImage = "https://i.imgur.com/3YQ4Q9s.png"; // A placeholder for broken images

  return (
    // 1. The Main Card Container
    // This creates the card's background, border, shadow, and rounded corners.
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-cyan-500/10">
      
      {/* 2. The Image Container */}
      <div className="overflow-hidden">
        <img
          src={creator.image_url || defaultImage}
          alt={`Image of ${creator.name}`}
          // This makes the image cover its container without stretching.
          className="w-fit h-56 object-cover transition-transform duration-300 group-hover:scale-106"
          onError={(e) => { e.target.onerror = null; e.target.src=defaultImage; }}
        />
      </div>

      {/* 3. The Content Container */}
      {/* This adds padding and uses Flexbox to arrange content. */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* 4. The Typography */}
        {/* We give the text proper sizing, weight, and color. */}
        <h3 className="text-2xl font-bold text-gray-100 mb-2 truncate">
          {creator.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
          {creator.description.substring(0, 100)}{creator.description.length > 100 && '...'}
        </p>
        
        {/* 5. The Action Button/Link */}
        <div className="mt-auto pt-4 border-t border-gray-700/50">
           <Link 
              to={`/view/${creator.id}`} 
              // This styles the link to look like a modern button.
              className="flex justify-center items-center w-full px-4 py-2 font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-md transition-all duration-300"
            >
              View Details
           </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;