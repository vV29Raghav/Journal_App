"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, setAuthToken } from "@/lib/api";
import { BookOpen, KeyRound, UserRound, ArrowRight, Loader2, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Endpoint is /public/create-user
      await apiFetch("/public/create-user", {
        method: "POST",
        body: JSON.stringify({ userName: username, password: password }),
      });
      
      // Auto login after registration
      setAuthToken(username, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Username might be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <button 
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to login
        </button>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-tr from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
              <UserRound className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            Start your journaling journey today
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-400 transition-colors">
                  <UserRound className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-zinc-500"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-400 transition-colors">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-zinc-500"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold rounded-xl py-3 mt-6 flex items-center justify-center gap-2 hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
