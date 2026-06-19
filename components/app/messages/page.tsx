'use client';
import { useState } from 'react';

export default function Messages() {
  const [conversations] = useState([
    { id: 1, name: "Sarah RealEstate", lastMessage: "Hi, is the house still available?", time: "2m" },
    { id: 2, name: "Kampala Properties", lastMessage: "Thanks for the document", time: "1h" },
  ]);

  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    
    setMessages([...messages, { id: Date.now(), text: message, fromMe: true }]);
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto flex h-[calc(100vh-80px)] text-white">
      {/* Conversations List */}
      <div className="w-80 border-r border-zinc-800 p-4">
        <h2 className="text-2xl font-bold mb-6 px-2">Messages</h2>
        {conversations.map(chat => (
          <div 
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-4 rounded-2xl mb-2 cursor-pointer ${selectedChat?.id === chat.id ? 'bg-zinc-800' : 'hover:bg-zinc-900'}`}
          >
            <div className="font-semibold">{chat.name}</div>
            <div className="text-sm text-zinc-400 truncate">{chat.lastMessage}</div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-zinc-800 font-semibold flex items-center gap-3">
              {selectedChat.name}
              <span className="text-xs px-3 py-1 bg-zinc-800 rounded-full">Online</span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-5 py-3 rounded-3xl ${msg.fromMe ? 'bg-teal-600' : 'bg-zinc-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-zinc-800 flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-6 py-4"
              />
              <button onClick={sendMessage} className="bg-teal-600 px-8 rounded-full">Send</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
