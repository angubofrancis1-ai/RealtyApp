'use client';
import { useState } from 'react';

export default function Settings() {
  const [whoCanMessage, setWhoCanMessage] = useState('everyone');
  const [blockedUsers] = useState(['user123', 'spammer456']);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-10">Settings</h1>

      <div className="space-y-10">
        {/* Privacy */}
        <div>
          <h3 className="font-semibold mb-4">Privacy</h3>
          <div className="bg-zinc-900 rounded-3xl p-6">
            <label className="block mb-3">Who can message you?</label>
            <select 
              value={whoCanMessage} 
              onChange={(e) => setWhoCanMessage(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 w-full"
            >
              <option value="everyone">Everyone</option>
              <option value="verified">Verified users only</option>
              <option value="none">No one</option>
            </select>
          </div>
        </div>

        {/* Blocked Users */}
        <div>
          <h3 className="font-semibold mb-4">Blocked Accounts</h3>
          <div className="bg-zinc-900 rounded-3xl p-6">
            {blockedUsers.length > 0 ? (
              blockedUsers.map(user => (
                <div key={user} className="flex justify-between py-3 border-b border-zinc-800 last:border-none">
                  <span>@{user}</span>
                  <button className="text-red-400 text-sm">Unblock</button>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">No blocked accounts</p>
            )}
          </div>
        </div>

        <button className="bg-white text-black px-10 py-3 rounded-full font-semibold">Save Settings</button>
      </div>
    </div>
  );
}
