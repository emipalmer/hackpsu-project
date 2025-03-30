import { GoogleGenerativeAI } from '@google/generative-ai';
import { getDocumentContent } from './document-context';

// Replace with your actual API key
const API_KEY = process.env.GOOGLE_API_KEY;

export async function queryGemini(prompt: string): Promise<string | null> {
  const paper = getDocumentContent();
  if (!API_KEY) {
    console.error(
      'API_KEY is not set. Please set the GOOGLE_API_KEY environment variable.'
    );
    return null;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Specify the flash model

  try {
    const result = await model.generateContent(
      `This is what the user is writing about: ${paper} | This is the prompt from the user answer with a helpful tone: ${prompt}`
    );
    const { response } = result;

    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
}

export async function getGeminiRating(): Promise<number | null> {
  if (!API_KEY) {
    console.error(
      'API_KEY is not set. Please set the GOOGLE_API_KEY environment variable.'
    );
    return null;
  }

  const paper = getDocumentContent();

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Specify the flash model

  try {
    const result = await model.generateContent(
      `Rate this essay out of 10 at the level of an undergraduate and strictly answer with a number and nothing else:  ${paper}`
    );
    const { response } = result;
    const text = response.text();

    // Base rating of 6 because why not
    let rating = 6;
    try {
      rating = parseInt(text, 10);
    } catch (error) {
      console.log(
        '[Gemini Rating] Bad response from gemini did not return an integer rating'
      );
    }
    return rating;
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
}
