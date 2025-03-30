import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 ${
                message.role === 'user' ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-4 bg-gray-200 border hover:bg-gray-300"
        >
          →
        </button>
      </form>
    </div>
  );
};

export default Chat;
