import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace with your actual API key
const API_KEY = process.env.GOOGLE_API_KEY;
console.log('[API_KEY] google: ', API_KEY);

async function generateText(prompt: string): Promise<string | null> {
  if (!API_KEY) {
    console.error(
      'API_KEY is not set. Please set the GOOGLE_API_KEY environment variable.'
    );
    return null;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Specify the flash model

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
}

async function main() {
  const userPrompt = 'Write a short poem about a cat.';
  const generatedText = await generateText(userPrompt);

  if (generatedText) {
    console.log('Generated Text:');
    console.log(generatedText);
  }
}

main();
