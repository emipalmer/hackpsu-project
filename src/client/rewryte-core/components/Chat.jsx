import { useEffect, useState } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
  };

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setTimeout(() => {}, 1000);
        const text = await serverFunctions.getDocumentContent();
        console.log(
          '[Chat] Document content passed from the server: ',
          content
        );
        setLoading(false);
        setContent(text);
      } catch (error) {
        console.error('[Chat] Error: ', error);
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  return (
    <div className="h-screen flex flex-col relative">
      {loading && (
        <div className="z-100 font-light animate-pulse flex items-center justify-center absolute top-0 right-0 size-full bg-gradient-to-t from-transparent to-white/25 backdrop-blur-md">
          Loading...
        </div>
      )}
      <div className="flex-1 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div className="h-10 overflow-scroll">{content}</div>
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
