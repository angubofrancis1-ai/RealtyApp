'use client';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MapPin, Repeat } from 'lucide-react';
import { useState } from 'react';

export default function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleReply = () => {
    if (!newReply.trim()) return;
    alert(`Reply posted: "${newReply}"`);
    setNewReply('');
    setShowReplies(true);
  };

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500">
          <Image src={post.author.avatarUrl || "/default-avatar.png"} alt="" width={48} height={48} className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.author.fullName}</span>
            {post.author.verified && <span className="text-blue-500">✓</span>}
          </div>
          <p className="text-zinc-500">@{post.author.username}</p>
        </div>
      </div>

      <p className="text-[17px] mb-4">{post.content}</p>

      {post.images?.length > 0 && (
        <div className="rounded-2xl overflow-hidden mb-4">
          <Image src={post.images[0]} alt="" width={600} height={400} className="w-full" />
        </div>
      )}

      {post.location && (
        <div className="text-teal-400 flex items-center gap-2 mb-4">
          <MapPin size={20} /> {post.location} • ${post.price?.toLocaleString()}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between text-zinc-400 pt-4 border-t border-zinc-800">
        <button onClick={() => setShowReplies(!showReplies)} className="flex items-center gap-2 hover:text-sky-500">
          <MessageCircle size={22} /> Reply
        </button>
        <button className="flex items-center gap-2 hover:text-green-500"><Repeat size={22} /> Repost</button>
        <button onClick={toggleLike} className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'hover:text-red-500'}`}>
          <Heart size={22} fill={liked ? "currentColor" : "none"} /> {likes}
        </button>
        <button className="flex items-center gap-2 hover:text-teal-500"><Share2 size={22} /></button>
      </div>

      {/* Reply Section */}
      {showReplies && (
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3 text-sm"
            />
            <button onClick={handleReply} className="bg-teal-600 px-6 rounded-full">Send</button>
          </div>
          <p className="text-xs text-zinc-500 mt-3">Replies will appear here in full version</p>
        </div>
      )}
    </div>
  );
}
