'use client';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Home, Search, Plus, Bell, Mail } from 'lucide-react';

export default function RealtyApp() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    alert("Post published successfully!");
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-zinc-800 py-4">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏡</span>
            <h1 className="text-3xl font-bold">RealtyApp</h1>
          </div>
        </div>
      </header>

      {/* Floating Post Button */}
      <button 
        onClick={() => setNewPost('')}
        className="fixed bottom-20 right-6 bg-teal-500 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50"
      >
        <Plus size={32} />
      </button>

      {/* Composer */}
      {newPost !== undefined && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-end">
          <div className="bg-zinc-900 w-full rounded-t-3xl p-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What’s happening in real estate?"
              className="w-full bg-transparent text-xl min-h-[140px] outline-none resize-none"
            />
            <div className="flex justify-end mt-6">
              <button onClick={handlePost} className="bg-teal-600 px-10 py-3 rounded-full font-semibold">Post</button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-6 pt-4">
        {loading ? (
          <div className="py-20 text-center">Loading feed...</div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 z-50">
        <div className="max-w-3xl mx-auto flex justify-around py-3">
          <button onClick={() => setActiveTab('home')} className="text-teal-400">
            <Home size={28} />
          </button>
          <button><Search size={28} /></button>
          <button className="-mt-8">
            <div className="bg-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Plus size={32} />
            </div>
          </button>
          <button><Bell size={28} /></button>
          <button><Mail size={28} /></button>
        </div>
      </nav>
    </div>
  );
}
