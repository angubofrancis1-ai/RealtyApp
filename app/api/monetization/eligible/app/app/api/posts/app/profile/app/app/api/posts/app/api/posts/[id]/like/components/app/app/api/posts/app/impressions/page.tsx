'use client';
import { useEffect, useState } from 'react';

export default function Impressions() {
  const [stats, setStats] = useState({
    totalImpressions: 1240000,
    thisMonth: 450000,
    eligible: false
  });

  useEffect(() => {
    // In real app this would fetch from DB
    const eligible = stats.totalImpressions >= 3500000 && /* other conditions */;
    setStats(prev => ({ ...prev, eligible }));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-white">
      <h1 className="text-3xl font-bold mb-8">📊 Your Impressions</h1>
      
      <div className="bg-zinc-900 rounded-3xl p-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-5xl font-bold text-teal-400">{stats.totalImpressions.toLocaleString()}</div>
            <div className="text-zinc-500">Total Impressions</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-teal-400">{stats.thisMonth.toLocaleString()}</div>
            <div className="text-zinc-500">This Month</div>
          </div>
        </div>

        <div className="mt-10 p-6 bg-zinc-800 rounded-2xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl">Monetization Status</div>
              <div className={`text-2xl font-bold ${stats.eligible ? 'text-green-500' : 'text-yellow-500'}`}>
                {stats.eligible ? '✅ Eligible' : '⏳ Not Eligible Yet'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-zinc-500">Need 3.5M impressions</div>
              <div className="text-sm text-zinc-400">+ 350 verified followers</div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-zinc-500 mt-10 text-sm">
        Impressions are counted every time someone sees your post
      </p>
    </div>
  );
}
