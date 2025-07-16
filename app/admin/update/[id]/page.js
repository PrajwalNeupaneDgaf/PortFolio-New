'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useMyContext } from '@/app/Context/AppContext';

const EditProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState({
    name: '',
    description: '',
    techStackInput: '',
    techStacks: [],
    demoLink: '',
    githubLink: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {Projects} = useMyContext()

  // Fetch the project by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        
        const data = Projects?.find(itm=>itm._id==id)
        console.log(data)
        if (data) {
          setProject((prev) => ({
            ...prev,
            ...data,
          }));
        } else {
          alert(data.error || 'Failed to load project.');
        }
      } catch (err) {
        console.error(err);
        alert('Error loading project.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

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
    setUpdating(true);

    try {
      const res = await fetch(`/api/projects/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ Project updated!');
        router.push('/admin');
      } else {
        alert(result.error || 'Failed to update project');
      }
    } catch (err) {
      console.error('Error updating:', err);
      alert('Something went wrong.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10 text-gray-500">Loading project...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">✏️ Edit Project</h1>

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
                placeholder="e.g. React"
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
            disabled={updating}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition active:scale-[0.98]"
          >
            {updating ? '⏳ Updating...' : '💾 Update Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
