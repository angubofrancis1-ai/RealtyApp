'use client';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Home, Search, PlusSquare, User } from 'lucide-react';

export default function Home() {
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
    alert("✅ Post published! (In full version this saves to DB)");
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-zinc-800 py-4">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏡</span>
            <h1 className="text-3xl font-bold tracking-tight">RealtyApp</h1>
          </div>
        </div>
      </header>

      {/* Post Composer (only on Home) */}
      {activeTab === 'home' && (
        <div className="max-w-3xl mx-auto px-6 py-6 border-b border-zinc-800">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share a listing, market update, or property tip..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl p-5 text-lg min-h-[110px]"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handlePost}
              className="bg-teal-600 hover:bg-teal-500 px-8 py-2.5 rounded-full font-semibold"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6">
        {activeTab === 'home' && (
          loading ? (
            <div className="py-20 text-center">Loading feed...</div>
          ) : (
            <div className="space-y-6 pt-6">
              {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          )
        )}

        {activeTab === 'profile' && <div className="py-10">Profile page coming soon...</div>}
        {activeTab === 'search' && <div className="py-10 text-center text-zinc-500">Search properties & agents coming soon</div>}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 z-50">
        <div className="max-w-3xl mx-auto flex justify-around py-3">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-teal-400' : 'text-zinc-400'}`}>
            <Home size={28} />
          </button>
          <button onClick={() => setActiveTab('search')} className={`flex flex-col items-center ${activeTab === 'search' ? 'text-teal-400' : 'text-zinc-400'}`}>
            <Search size={28} />
          </button>
          <button onClick={() => alert("New Post")} className="flex flex-col items-center -mt-8">
            <div className="bg-teal-500 rounded-full p-4">
              <PlusSquare size={32} />
            </div>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-teal-400' : 'text-zinc-400'}`}>
            <User size={28} />
          </button>
        </div>
      </nav>
    </div>
  );
}
