'use client';
import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const AddProjectPage = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    techStackInput: '',
    techStacks: [],
    demoLink: '',
    githubLink: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleAddStack = () => {
    if (project.techStackInput.trim() === '') return;
    setProject({
      ...project,
      techStacks: [...project.techStacks, project.techStackInput.trim()],
      techStackInput: ''
    });
  };

  const handleRemoveStack = (index) => {
    const updated = [...project.techStacks];
    updated.splice(index, 1);
    setProject({ ...project, techStacks: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: project.name,
          description: project.description,
          techStacks: project.techStacks,
          demoLink: project.demoLink,
          githubLink: project.githubLink,
          imageUrl: project.imageUrl
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || 'Something went wrong.');
      } else {
        setMessage('✅ Project added successfully!');
        // Optionally clear form
        setProject({
          name: '',
          description: '',
          techStackInput: '',
          techStacks: [],
          demoLink: '',
          githubLink: '',
          imageUrl: ''
        });
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🚀 Add a New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">📌 Project Name</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">📝 Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">🧠 Tech Stacks</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                name="techStackInput"
                value={project.techStackInput}
                onChange={handleChange}
                placeholder="e.g. React, Node.js"
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddStack}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 flex items-center gap-1"
              >
                <FaPlus size={14} />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStacks.map((stack, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {stack}
                  <button
                    type="button"
                    onClick={() => handleRemoveStack(index)}
                    className="text-blue-700 hover:text-red-500"
                  >
                    <FaTimes size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">🔗 Demo Link</label>
              <input
                type="url"
                name="demoLink"
                value={project.demoLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">📁 GitHub Link</label>
              <input
                type="url"
                name="githubLink"
                value={project.githubLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">🖼️ Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={project.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition active:scale-[0.98] disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Submitting...' : '💾 Submit Project'}
          </button>

          {message && (
            <div className="mt-4 text-center font-medium text-sm text-gray-700">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
