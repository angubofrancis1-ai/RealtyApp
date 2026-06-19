'use client';

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-white">
      <div className="flex flex-col items-center pt-8">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-6xl border-4 border-zinc-800">
          👤
        </div>
        <h1 className="text-3xl font-bold mt-6">Francis Angubo</h1>
        <p className="text-teal-400">@angubofrancis</p>
        <p className="text-blue-500 mt-1">✓ Verified Real Estate Agent</p>
      </div>

      <p className="text-center mt-8 text-lg leading-relaxed">
        Helping families find their dream homes across Uganda. 
        Market updates, listings &amp; expert advice.
      </p>

      <div className="flex justify-center gap-12 mt-10">
        <div className="text-center">
          <div className="text-4xl font-bold">1.2K</div>
          <div className="text-zinc-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">428</div>
          <div className="text-zinc-500">Following</div>
        </div>
      </div>

      <button className="w-full mt-12 bg-white text-black py-4 rounded-full font-semibold text-lg">
        Edit Profile
      </button>
    </div>
  );
}
