'use client';
import { useState } from 'react';

export default function Profile() {
  const [user] = useState({
    name: "Francis Angubo",
    username: "angubofrancis",
    bio: "Real Estate Agent | Helping people find dream homes 🏡",
    verified: true,
    followers: 1240,
    following: 456,
    avatar: "https://via.placeholder.com/150"
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-white">
      <div className="flex flex-col items-center">
        <img src={user.avatar} alt="" className="w-32 h-32 rounded-full border-4 border-teal-500" />
        <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
        <p className="text-zinc-500">@{user.username}</p>
        {user.verified && <span className="text-blue-500 text-xl mt-1">✓ Verified Agent</span>}
      </div>

      <p className="text-center mt-6 text-lg">{user.bio}</p>

      <div className="flex justify-center gap-8 mt-8">
        <div className="text-center">
          <div className="text-2xl font-bold">{user.followers}</div>
          <div className="text-zinc-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{user.following}</div>
          <div className="text-zinc-500">Following</div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button className="bg-teal-600 hover:bg-teal-500 px-10 py-3 rounded-full font-semibold">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
