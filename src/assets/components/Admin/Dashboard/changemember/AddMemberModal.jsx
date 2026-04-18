import React, { useState } from "react";

const AddMemberModal = ({ isOpen, onClose, onAdd }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    email: "",
    expiryDate: "",
    ward: "",
  });

  if (!isOpen) return null;

  const API = import.meta.env.VITE_API_BASE_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const memberData = {
        ...formData,
        storeName: formData.location,
        email: formData.email || '',
      };
      const response = await fetch(`${API}/api/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });

      if (response.ok) {
        alert("Success! Member added to database.");
        onAdd();
        onClose();
        setFormData({ name: "", phone: "", location: "", email: "", expiryDate: "", ward: "" });
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to add member'}`);
      }
    } catch (err) {
      alert("Server Error. Check backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-white/20">
        <h2 className="text-3xl font-black mb-8 uppercase text-slate-900 tracking-tighter">
          Register <span className="text-blue-600">Member</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">
              Full Name
            </label>
            <input
              className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">
              Medical Store & Location
            </label>
            <input
              className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">
              Ward
            </label>
            <input
              className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
              placeholder="Ward number or name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">
                Phone
              </label>
              <input
                className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">
                Expiry Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-lg shadow-blue-200 mt-4 disabled:bg-slate-300"
          >
            {loading ? "Syncing..." : "Add to Records"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-slate-400 font-bold uppercase text-[10px] mt-2 hover:text-slate-600 transition-colors"
          >
            Cancel Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
