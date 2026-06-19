'use client';

export default function Notifications() {
  const notifications = [
    { id: 1, text: "Your post got 45 new impressions", time: "2m" },
    { id: 2, text: "John liked your listing in Kampala", time: "17m" },
    { id: 3, text: "Sarah commented on your property tip", time: "1h" },
    { id: 4, text: "You reached 1.2K followers 🎉", time: "3h" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <div className="space-y-4">
        {notifications.map(notif => (
          <div key={notif.id} className="bg-zinc-900 rounded-2xl p-5 flex gap-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-full flex-shrink-0 flex items-center justify-center text-xl">🔔</div>
            <div>
              <p>{notif.text}</p>
              <p className="text-xs text-zinc-500 mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
