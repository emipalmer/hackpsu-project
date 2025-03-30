import { onOpen, openChatSidebar } from './ui';
import { getDocumentContent } from './document-context';
import { queryGemini, getGeminiRating } from './llm';

// Public functions must be exported as named exports
export {
  onOpen,
  openChatSidebar,
  getDocumentContent,
  queryGemini,
  getGeminiRating,
};
