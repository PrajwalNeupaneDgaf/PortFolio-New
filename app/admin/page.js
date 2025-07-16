'use client';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DialogComp from '../Components/DialogComp';
import { useRouter } from 'next/navigation';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const router = useRouter();

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/projects/remove/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      // Update UI
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🛠️ Admin – All Projects</h1>

      {loading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : (
        <div className="space-y-6">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.techStacks.map((stack, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Project"
                      onClick={() => router.push(`/admin/update/${project._id}`)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(project._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Project"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {confirmDeleteId && (
        <DialogComp
          title="Delete this project?"
          description="Are you sure you want to delete this project permanently?"
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={() => handleDelete(confirmDeleteId)}
        />
      )}
    </div>
  );
};

export default AdminProjectsPage;
