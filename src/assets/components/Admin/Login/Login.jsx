import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // This reads the email from Google

const Login = () => {
  const navigate = useNavigate();

  // THE LOCK: Only these people can enter
  const authorizedEmails = [
    "vanshikaindoria2005@gmail.com",
    "vanshikaindoria@gmail.com", // PUT YOUR ACTUAL EMAIL HERE
    "vu1f2324001@pvppcoe.ac.in",
  ];

  const handleSuccess = (credentialResponse) => {
    // 1. Decode the secret token from Google to get the email
    const details = jwtDecode(credentialResponse.credential);
    const userEmail = details.email;

    // 2. Check if the person is on our list
    if (authorizedEmails.includes(userEmail)) {
      console.log("Access Granted for:", userEmail);
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/change-member");
    } else {
      // 3. If they aren't you, show an error and do NOT let them in
      alert(
        "Unauthorized! You do not have permission to access this dashboard.",
      );
      console.log("Blocked unauthorized user:", userEmail);
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
            onError={() => alert("Login Failed")}
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
