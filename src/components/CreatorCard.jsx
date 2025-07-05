// src/components/CreatorCard.jsx - The NEW Version

import { Link } from 'react-router-dom'; // Import Link

// Your icon components can stay the same
const YouTubeIcon = () => { /* ... */ }; 
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;

// The props `onDelete` and `onEdit` are removed
function CreatorCard({ creator }) {
  const defaultImage = "https://i.imgur.com/3YQ4Q9s.png";

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-2">
      <img
        src={creator.image_url || defaultImage}
        alt={`Image of ${creator.name}`}
        className="w-full h-56 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src=defaultImage; }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{creator.name}</h3>
        {/* The YouTube link can stay the same */}
        
        {/* The action button is now a Link to the view page */}
        <div className="mt-auto pt-4 border-t border-slate-700">
           <Link 
              to={`/view/${creator.id}`} 
              className="flex justify-center items-center w-full px-3 py-2 text-sm font-medium text-cyan-300 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-md"
            >
              <InfoIcon /> View Details
           </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;