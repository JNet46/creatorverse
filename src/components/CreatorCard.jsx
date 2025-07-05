// src/components/CreatorCard.jsx

// Simple icon components for clarity
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const YouTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


function CreatorCard({ creator, onDelete, onEdit }) {
  const defaultImage = "https://i.imgur.com/3YQ4Q9s.png"; // A generic placeholder image

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img
        src={creator.image_url || defaultImage}
        alt={`Image of ${creator.name}`}
        className="w-full h-56 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src=defaultImage; }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{creator.name}</h3>
        <p className="text-slate-400 flex-grow mb-4">{creator.description}</p>
        
        <div className="mt-auto">
          {creator.youtube_url && (
            <a href={creator.youtube_url} target="_blank" rel="noopener noreferrer" 
              className="flex items-center text-red-500 hover:text-red-400 transition-colors duration-200 mb-4">
              <YouTubeIcon />
              <span className="ml-2 font-semibold">View on YouTube</span>
            </a>
          )}
          
          <div className="flex justify-between items-center border-t border-slate-700 pt-4">
            <button onClick={() => onEdit(creator)} className="flex items-center px-3 py-2 text-sm font-medium text-yellow-400 bg-yellow-900/50 hover:bg-yellow-800/50 rounded-md">
              <EditIcon /> Edit
            </button>
            <button onClick={() => onDelete(creator.id)} className="flex items-center px-3 py-2 text-sm font-medium text-red-400 bg-red-900/50 hover:bg-red-800/50 rounded-md">
              <DeleteIcon /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;