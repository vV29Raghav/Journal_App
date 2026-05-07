"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { ArrowLeft, Loader2, Save, Type, AlignLeft } from "lucide-react";
import Link from "next/link";

export default function CreateEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setLoading(true);
    setError("");

    try {
      await apiFetch("/journal", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to save entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 selection:bg-purple-500/30">
      <div className="max-w-3xl mx-auto relative z-10">
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-8 text-white">Create New Entry</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1 flex items-center gap-2">
                <Type className="w-4 h-4 text-purple-400" /> Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white text-lg placeholder-zinc-600"
                placeholder="What's on your mind?"
              />
            </div>

            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-zinc-300 ml-1 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-purple-400" /> Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white placeholder-zinc-600 resize-none"
                placeholder="Start writing..."
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading || !title.trim() || !content.trim()}
                className="bg-white text-black px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" /> Save Entry
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
