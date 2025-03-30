import { useEffect, useState } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';

const MAX_CHATS = 10;
const STORAGE_KEY = 'rewryte_chats';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loadingExtension, setLoadingExtension] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  const saveChatsToStorage = (updatedChats) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChats));
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      messages: [
        {
          role: 'assistant',
          content:
            "Hello! I'm your AI writing assistant. How can I help you with your document today?",
        },
      ],
    };

    const updatedChats = [...chats, newChat];
    if (updatedChats.length > MAX_CHATS) {
      updatedChats.shift(); // Remove the oldest chat
    }

    setChats(updatedChats);
    setActiveChat(newChat.id);
    setMessages(newChat.messages);
    saveChatsToStorage(updatedChats);
  };

  const switchChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setActiveChat(chatId);
      setMessages(chat.messages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isResponding) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsResponding(true);

    try {
      const response = await serverFunctions.queryGemini(input);
      const assistantMessage = { role: 'assistant', content: response };
      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Update the chat in storage
      const updatedChats = chats.map((chat) =>
        chat.id === activeChat ? { ...chat, messages: finalMessages } : chat
      );
      setChats(updatedChats);
      saveChatsToStorage(updatedChats);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsResponding(false);
    }
  };

  useEffect(() => {
    setLoadingExtension(true);
    // Load chats from localStorage
    const storedChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setChats(storedChats);

    // If there are stored chats, set the active chat to the most recent one
    if (storedChats.length > 0) {
      setActiveChat(storedChats[storedChats.length - 1].id);
      setMessages(storedChats[storedChats.length - 1].messages);
    } else {
      // Create a new chat if none exist
      handleNewChat();
    }
    setLoadingExtension(false);
  }, []);

  return (
    <div className="h-screen flex flex-col relative bg-white">
      <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-[#3c4043] text-xl font-normal">
          Document Assistant
        </h1>
        <div className="flex items-center gap-4">
          <select
            className="px-3 py-1 border border-[#dadce0] text-[#3c4043]"
            value={activeChat || ''}
            onChange={(e) => switchChat(Number(e.target.value))}
          >
            {chats.map((chat, index) => (
              <option key={chat.id} value={chat.id}>
                Chat {chats.length - index}
              </option>
            ))}
          </select>
          <button
            onClick={handleNewChat}
            className="px-4 py-1 bg-[#1a73e8] text-white hover:bg-[#1557b0] rounded"
          >
            New Chat
          </button>
        </div>
      </div>

      {loadingExtension && (
        <div className="z-50 font-normal text-[#3c4043] flex items-center justify-center absolute top-0 right-0 w-full h-full bg-white/80">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        </div>
      )}

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
              disabled={!input.trim() || isResponding}
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
