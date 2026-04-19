import React, { useState, useEffect } from "react";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";

const ChangeMember = () => {
  const [members, setMembers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda.onrender.com';

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${API}/api/members`, { credentials: 'include' });
      const data = await response.json();
      setMembers(data || []);
    } catch (err) {
      console.error("Server Error:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this member?')) return;

    try {
      const response = await fetch(`${API}/api/members/${id}`, { method: 'DELETE', credentials: 'include' });
      if (response.ok) {
        alert('Member deleted!');
        fetchMembers();
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  const handleAddRefresh = () => {
    fetchMembers();
  };

  const handleEditRefresh = () => {
    fetchMembers();
  };

  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            KCDA <span className="text-blue-600">Members</span> ({members.length})
          </h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-200 uppercase tracking-wider text-sm"
          >
            + Add New Member
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Name</th>
<th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Store</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Ward</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Phone</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Email</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Expiry</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {members.length > 0 ? (
                  members.map((m) => (
                    <tr key={m._id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-6">
                        <div className="font-black text-slate-900 text-sm group-hover:text-blue-600">
                          {m.name}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-1">
                          Zone A/B/C...
                        </div>
                      </td>
<td className="p-6 font-bold text-slate-700 text-sm">{m.storeName}</td>
                      <td className="p-6 font-bold text-slate-700 text-sm uppercase tracking-wider">{m.ward || 'N/A'}</td>
                      <td className="p-6 font-mono text-slate-600 text-sm">{m.phone}</td>
                      <td className="p-6 text-slate-600 text-xs">{m.email}</td>
                      <td className="p-6 text-slate-600 text-xs">
                        {m.expiryDate ? new Date(m.expiryDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          m.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(m)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(m._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center">
                      <div className="font-black text-slate-400 text-4xl uppercase tracking-tighter mb-2">
                        No Members Yet
                      </div>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Add your first member using the + button
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRefresh}
      />
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onSave={handleEditRefresh}
        onUpdate={handleEditRefresh}
      />
    </div>
  );
};

export default ChangeMember;
