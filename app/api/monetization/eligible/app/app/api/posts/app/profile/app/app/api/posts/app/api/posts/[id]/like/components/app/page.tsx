'use client';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Home, Search, PlusSquare, BarChart3, User } from 'lucide-react';

export default function RealtyApp() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'post' | 'impressions' | 'profile'>('home');

  useEffect(() => {
    if (activeTab === 'home') {
      fetch('/api/posts')
        .then(res => res.json())
        .then(data => {
          setPosts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [activeTab]);

  const handlePost = () => {
    if (!newPost.trim()) return;
    alert("✅ Post published successfully!");
    setNewPost('');
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-zinc-800 py-4">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏡</span>
            <h1 className="text-3xl font-bold">RealtyApp</h1>
          </div>
          <div className="text-teal-400 font-medium">Lenient Feed</div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-3xl mx-auto px-6">
        {activeTab === 'home' && (
          <>
            {/* Quick Post Composer */}
            <div className="py-6 border-b border-zinc-800">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share a listing, market update, or property tip..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl p-5 min-h-[110px] text-lg"
              />
              <button onClick={handlePost} className="mt-4 w-full bg-teal-600 hover:bg-teal-500 py-3 rounded-full font-semibold">
                Post Now
              </button>
            </div>

            {loading ? <div className="py-20 text-center">Loading feed...</div> : (
              <div className="space-y-6 pt-6">
                {posts.map(p => <PostCard key={p.id} post={p} />)}
              </div>
            )}
          </>
        )}

        {activeTab === 'impressions' && (
          <div className="py-12">
            <h2 className="text-3xl font-bold mb-8">📊 Impressions</h2>
            <div className="bg-zinc-900 rounded-3xl p-8 text-center">
              <div className="text-6xl font-bold text-teal-400 mb-2">2.4M</div>
              <p className="text-zinc-400">Total Impressions (Last 90 days)</p>
              <div className="mt-8 text-lg">You are <span className="text-yellow-400 font-bold">1.1M away</span> from monetization eligibility</div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="py-12 text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-6xl">
              👤
            </div>
            <h2 className="text-3xl font-bold mt-6">Francis Angubo</h2>
            <p className="text-teal-400">@angubofrancis • Verified Agent</p>
            <button className="mt-8 bg-white text-black px-10 py-3 rounded-full font-semibold">Edit Profile</button>
          </div>
        )}
      </main>

      {/* Bottom Navigation - Like X */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 z-50">
        <div className="max-w-3xl mx-auto flex justify-around items-center py-3">
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-teal-400' : 'text-zinc-400'}>
            <Home size={28} />
          </button>
          <button onClick={() => setActiveTab('search')} className={activeTab === 'search' ? 'text-teal-400' : 'text-zinc-400'}>
            <Search size={28} />
          </button>
          <button onClick={() => setActiveTab('post')} className="-mt-10">
            <div className="bg-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl">
              <PlusSquare size={32} />
            </div>
          </button>
          <button onClick={() => setActiveTab('impressions')} className={activeTab === 'impressions' ? 'text-teal-400' : 'text-zinc-400'}>
            <BarChart3 size={28} />
          </button>
          <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'text-teal-400' : 'text-zinc-400'}>
            <User size={28} />
          </button>
        </div>
      </nav>
    </div>
  );
}
