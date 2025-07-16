'use client';
import React from 'react';
import { FaShieldAlt, FaUserTie, FaUser } from 'react-icons/fa';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const users = [
  {
    id: 1,
    name: 'Prajwal Neupane',
    email: 'prajwal@example.com',
    IsAdmin: false,
    IsSuperAdmin: true
  },
  {
    id: 2,
    name: 'Mina Thapa',
    email: 'mina@example.com',
    IsAdmin: true,
    IsSuperAdmin: false
  },
  {
    id: 3,
    name: 'Ram Sharma',
    email: 'ram@example.com',
    IsAdmin: false,
    IsSuperAdmin: false
  }
];

const getRole = (user) => {
  if (user.IsSuperAdmin) return { label: 'Super Admin', icon: <FaShieldAlt className="text-purple-600" /> };
  if (user.IsAdmin) return { label: 'Admin', icon: <FaUserTie className="text-green-600" /> };
  return { label: 'User', icon: <FaUser className="text-gray-600" /> };
};

const SuperAdminUsersPage = () => {
  const handlePromote = (userId) => {
    console.log(`Promoting user with ID: ${userId}`);
    // Add real API call here
  };

  const handleDemote = (userId) => {
    console.log(`Demoting user with ID: ${userId}`);
    // Add real API call here
  };

  const showData = false

  if(!showData){
    return (
      <div className='text-xl h-[50dvh] flex justify-center items-center font-semibold text-gray-700'>
        !!!!!THIS IS CURRENTLY OFFLINE!!!!!
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">👑 SuperAdmin – All Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => {
          const role = getRole(user);

          return (
            <div
              key={user.id}
              className="bg-white border shadow-sm rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {role.icon}
                  <span className="ml-1 font-medium text-gray-700">{role.label}</span>
                </div>
              </div>

              {!user.IsSuperAdmin && (
                <div className="pt-2">
                  {user.IsAdmin ? (
                    <button
                      onClick={() => handleDemote(user.id)}
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      <MdArrowDownward />
                      Demote to User
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePromote(user.id)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <MdArrowUpward />
                      Promote to Admin
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuperAdminUsersPage;
