'use client';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
    alert("Post created! (In real app this would save to database)");
    setNewPost('');
    setImageUrl('');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏡</div>
            <h1 className="text-3xl font-bold">RealtyApp</h1>
          </div>
          <div className="text-xl font-medium">For You</div>
        </div>
      </header>

      {/* Post Composer */}
      <div className="max-w-3xl mx-auto px-6 py-6 border-b border-zinc-800">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What’s happening in real estate? Share a listing, tip, or market update..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl p-4 text-lg resize-y min-h-[120px] focus:outline-none"
        />
        <div className="flex justify-between items-center mt-4">
          <button className="text-teal-500" onClick={() => alert("Image upload coming soon")}>
            📸 Add Photo
          </button>
          <button
            onClick={handlePost}
            className="bg-teal-600 hover:bg-teal-500 px-8 py-2 rounded-full font-semibold"
          >
            Post
          </button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20">Loading feed...</div>
        ) : (
          <div className="space-y-6 pt-6">
            {posts.length === 0 ? (
              <p className="text-center text-zinc-500 py-10">No posts yet. Be the first to post!</p>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        )}
      </main>
    </div>
  );
}
