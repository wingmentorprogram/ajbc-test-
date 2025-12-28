import { GoogleGenAI } from "@google/genai";
import { MOCK_SPREADSHEET_DATA } from "../constants";
import { LogicLogEntry } from "../types";

// Initialize Gemini
// NOTE: Process.env.API_KEY is handled by the environment as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a natural language query about the spreadsheet and returns the most relevant Row ID.
 */
export const findFormulaLogic = async (query: string): Promise<{ rowId: string | null; explanation: string }> => {
  try {
    const dataContext = JSON.stringify(MOCK_SPREADSHEET_DATA.map(row => ({
      id: row.id,
      item: row.item,
      description: row.formulaDescription
    })));

    const prompt = `
      You are an expert construction arbitration analyst (Quantity Surveyor). 
      You have access to a spreadsheet summary of a final account dispute.
      User Query: "${query}"
      
      Spreadsheet Data Context:
      ${dataContext}
      
      Task: Identify which row best matches the user's query regarding calculation logic or specific items.
      Return a JSON object with two keys: "rowId" (the ID of the matching row, or null if none found) and "explanation" (a brief 1-sentence explanation of why, using QS terminology).
      Only return valid JSON. Do not include markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text);
    return result;

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { rowId: null, explanation: "Could not interpret query." };
  }
};

/**
 * Generates a formal claim narrative based on the user's investigation logs.
 */
export const generateClaimNarrative = async (logs: LogicLogEntry[]): Promise<string> => {
    try {
        const logSummary = logs.map(l => `- [${l.timestamp.toLocaleTimeString()}] ${l.type}: ${l.description} (${l.details || ''})`).join('\n');
        
        const prompt = `
            You are a Senior Quantity Surveyor preparing an Expert Witness report for arbitration.
            Based on the following "Logic Log" of the user's investigation into the accounts, write a concise, formal paragraph substantiating the claim.
            
            Investigation Log:
            ${logSummary}
            
            Requirements:
            - Use formal contractual language (FIDIC style).
            - Reference specific documents or values mentioned in the logs.
            - The tone should be objective and persuasive.
            - Start with "Based on the forensic analysis of the accounts..."
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        
        return response.text || "Unable to generate narrative.";
    } catch (e) {
        console.error(e);
        return "Error generating claim narrative. Please try again.";
    }
}