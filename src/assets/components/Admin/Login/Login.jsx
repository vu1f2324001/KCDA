import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // On successful Google login, send credential to backend for verification
  const handleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;
      if (!credential) return alert('No credential received from Google');

      // Decode token locally for debugging the audience (no external dep)
      const decodeJwt = (token) => {
        try {
          const part = token.split('.')[1];
          const padded = part.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(part.length/4)*4, '=');
          const json = atob(padded);
          return JSON.parse(json);
        } catch (e) {
          return null;
        }
      };

      const decoded = decodeJwt(credential);
      console.log('Frontend decoded token aud:', decoded?.aud || decoded?.audience || '(none)');
      console.log('Frontend env VITE_GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID || '(not set)');

      const base = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${base}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // accept httpOnly cookie from server
        body: JSON.stringify({ credential })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return alert(err.error || 'Authentication failed');
      }

      const data = await res.json();

      // Server sets httpOnly cookie; no client-side storage needed
      navigate('/admin/change-member');
    } catch (error) {
      console.error('Login error', error);
      alert('Authentication failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-12 shadow-2xl border-t-8 border-blue-700 w-full max-w-md text-center">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
          KCDA <span className="text-blue-700">Admin</span>
        </h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-10">
          Security Protocol Active
        </p>

        <div className="flex justify-center border-2 border-slate-50 py-6 rounded-lg bg-slate-50">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert('Login Failed')}
          />
        </div>

        <p className="mt-8 text-[10px] text-slate-400 uppercase font-bold">
          Note: Only registered administrators can sign in.
        </p>
      </div>
    </div>
  );
};

export default Login;
