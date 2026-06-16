'use client';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-500 rounded-2xl flex items-center justify-center text-2xl font-bold">🏡</div>
            <h1 className="text-3xl font-bold tracking-tighter">RealtyApp</h1>
          </div>
          <button 
            onClick={() => alert("Post creation coming soon!")}
            className="bg-teal-600 hover:bg-teal-500 px-8 py-2.5 rounded-2xl font-semibold transition-colors"
          >
            + New Listing
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">For You</h2>
          <p className="text-zinc-500">Lenient • Fair • Real Estate First</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading beautiful listings...</div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
