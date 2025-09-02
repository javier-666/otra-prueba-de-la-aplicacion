
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the key is always present.
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDescription = async (productName: string): Promise<string> => {
  if (!API_KEY) {
    return "La generación de descripción no está disponible.";
  }
  
  try {
    const prompt = `Genera una descripción de producto atractiva y concisa para: "${productName}". La descripción debe tener un máximo de 25 palabras y resaltar una característica clave.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // For faster response
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "No se pudo generar una descripción en este momento.";
  }
};
