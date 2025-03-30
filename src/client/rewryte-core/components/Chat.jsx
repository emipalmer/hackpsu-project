import { useEffect, useState } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AI writing assistant. How can I help you with your document today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loadingExtension, setLoadingExtension] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    serverFunctions.queryGemini(`${input}`);
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
  };

  // useEffect(() => {
  //   async function fetchContent() {
  //     try {
  //       setLoading(true);
  //       // setTimeout(() => {}, 1000);
  //       const text = await serverFunctions.getDocumentContent();
  //       console.log(
  //         '[Chat] Document content passed from the server: ',
  //         content
  //       );
  //       setLoading(false);
  //       setContent(text);
  //     } catch (error) {
  //       console.error('[Chat]', error);
  //       setLoading(false);
  //     }
  //   }
  //   fetchContent();
  // }, []);

  return (
    <div className="h-screen flex flex-col relative bg-white">
      <div className="border-b bg-white px-6 py-3 flex items-center">
        <h1 className="text-[#3c4043] text-xl font-normal">
          Document Assistant
        </h1>
      </div>

      {loadingExtension && (
        <div className="z-50 font-normal text-[#3c4043] flex items-center justify-center absolute top-0 right-0 w-full h-full bg-white/80">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        </div>
      )}

      <div className="flex-1 p-6 overflow-y-auto bg-[#f8f9fa]">
        <div className="max-w-3xl mx-auto">
          {content && (
            <div className="mb-6 p-4 bg-white border border-[#dadce0] text-sm text-[#3c4043]">
              <div className="font-medium mb-2">Current Document Content:</div>
              <div className="max-h-32 overflow-y-auto">{content}</div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-[#1a73e8] text-white'
                    : 'bg-white border border-[#dadce0] text-[#3c4043]'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 placeholder:text-xs px-4 py-2 border border-[#dadce0] hover:border-[#bdc1c6] focus:border-[#1a73e8] focus:outline-none text-[#3c4043]"
              placeholder="Ask a question about your document..."
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#1a73e8] text-white hover:bg-[#1557b0] disabled:bg-[#dadce0] disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <span className="text-xl">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
