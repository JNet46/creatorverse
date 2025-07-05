// src/components/CreatorForm.jsx
import { useState, useEffect } from 'react';

function CreatorForm({ onSave, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    youtube_url: '',
    description: ''
  });

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form when not editing
      setFormData({ name: '', image_url: '', youtube_url: '', description: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      alert('Name and Description are required!');
      return;
    }
    onSave(formData);
    // Reset form only if we are not in edit mode
    if (!isEditing) {
        setFormData({ name: '', image_url: '', youtube_url: '', description: '' });
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-lg shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        {isEditing ? 'Edit Creator' : 'Add a New Creator'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-slate-300">Image URL (Optional)</label>
          <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="youtube_url" className="block text-sm font-medium text-slate-300">YouTube URL (Optional)</label>
          <input type="text" name="youtube_url" id="youtube_url" value={formData.youtube_url} onChange={handleChange}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
          <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-end space-x-4">
          {isEditing && (
             <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-md shadow-sm">
                Cancel
             </button>
          )}
          <button type="submit"
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-md shadow-sm">
            {isEditing ? 'Save Changes' : 'Add Creator'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatorForm;