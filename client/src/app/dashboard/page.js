"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, clearAuthToken, getUsername } from "@/lib/api";
import { Plus, LogOut, Loader2, Calendar, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const username = getUsername();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await apiFetch("/journal");
      // If data is null or empty, set to empty array
      setEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.message !== "API Request Failed") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    router.push("/");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    // Optimistic UI update or loading state could be added here
    try {
      await apiFetch(`/journal/id/${id}`, { method: "DELETE" });
      setEntries(prev => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete entry. It might already be gone.");
      // Refresh entries if delete fails to ensure sync
      fetchEntries();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              My Journal
            </h1>
            <p className="text-zinc-400 mt-1">Welcome back, {username}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/create"
              className="bg-white text-black px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors active:scale-95"
            >
              <Plus className="w-4 h-4" /> New Entry
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-zinc-900 border border-white/10 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-zinc-800 transition-colors active:scale-95"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {entries.length === 0 ? (
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-12 text-center backdrop-blur-sm">
            <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No entries yet</h3>
            <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
              You haven't written any journal entries yet. Start capturing your thoughts and memories today.
            </p>
            <Link 
              href="/dashboard/create"
              className="inline-flex bg-purple-600 text-white px-6 py-3 rounded-xl font-medium items-center gap-2 hover:bg-purple-700 transition-colors active:scale-95 shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-5 h-5" /> Write your first entry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all hover:-translate-y-1 group flex flex-col h-full"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-white line-clamp-2">
                    {entry.title}
                  </h3>
                  <p className="text-zinc-400 line-clamp-4 leading-relaxed text-sm">
                    {entry.content}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {entry.date ? new Date(entry.date).toLocaleDateString(undefined, { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Recent'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/dashboard/edit/${entry.id}`}
                      className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
