'use client';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';

export default function PostCard({ post }: { post: any }) {
  const isPremiumPlus = post.author.premiumTier === 2;
  const isVerified = post.author.verified;

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500">
          <Image 
            src={post.author.avatarUrl || "/default-avatar.png"} 
            alt={post.author.fullName} 
            width={48} 
            height={48} 
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{post.author.fullName}</span>
            {isVerified && <span className="text-blue-500 text-xl">✓</span>}
            {isPremiumPlus && <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded font-bold">PREMIUM+</span>}
          </div>
          <p className="text-zinc-500 text-sm">@{post.author.username}</p>
        </div>
      </div>

      <p className="text-[17px] leading-relaxed mb-4">{post.content}</p>

      {post.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 rounded-2xl overflow-hidden">
          {post.images.slice(0, 4).map((img: string, i: number) => (
            <Image key={i} src={img} alt="Property" width={600} height={400} className="object-cover w-full" />
          ))}
        </div>
      )}

      {(post.location || post.price) && (
        <div className="flex items-center gap-2 text-teal-400 mb-5 text-lg">
          <MapPin size={22} />
          <span>{post.location}</span>
          {post.price && <span className="font-mono">• ${post.price.toLocaleString()}</span>}
        </div>
      )}

      <div className="flex justify-between text-zinc-400 pt-4 border-t border-zinc-800 text-xl">
        <button className="flex items-center gap-3 hover:text-red-500 transition-colors">
          <Heart size={26} /> <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-3 hover:text-sky-500 transition-colors">
          <MessageCircle size={26} /> <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-3 hover:text-teal-500 transition-colors">
          <Share2 size={26} />
        </button>
      </div>
    </div>
  );
}
