import React, { useState, useEffect } from "react";

const EditMemberModal = ({ isOpen, onClose, member, onSave, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    storeName: "",
    location: "",
    ward: "",
    phone: "",
    email: "",
    expiryDate: "",
    status: "Active"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        storeName: member.storeName || "",
        location: member.location || "",
        ward: member.ward || "",
        phone: member.phone || "",
        email: member.email || "",
        expiryDate: member.expiryDate ? member.expiryDate.split('T')[0] : "",
        status: member.status || "Active"
      });
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/members/${member._id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Member updated successfully!");
        onUpdate(); // Refresh list
        onClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Update failed'}`);
      }
    } catch (err) {
      alert("Server error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 uppercase">
            Edit Member <span className="text-blue-600">{member.name}</span>
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 font-black text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 text-slate-900 font-bold"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Phone
            </label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 text-slate-900 font-bold"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 text-slate-900 font-bold"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Expiry Date
            </label>
            <input
              type="date"
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 text-slate-900 font-bold"
              value={formData.expiryDate}
              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Store Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 text-slate-900 font-bold"
              value={formData.storeName}
              onChange={(e) => setFormData({...formData, storeName: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Location
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 text-slate-900 font-bold"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
              Ward
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 text-slate-900 font-bold"
              value={formData.ward}
              onChange={(e) => setFormData({...formData, ward: e.target.value})}
            />
          </div>

          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all uppercase tracking-[0.2em] text-xs disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;

