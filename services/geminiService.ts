
import { GoogleGenAI, Type } from "@google/genai";
import { Lead, Source } from "../types";

export const generateLeads = async (category: string, location: string, targetGaps?: string): Promise<Lead[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const gapInstruction = targetGaps 
    ? `Specifically focus the "Gap Analysis" on these areas: ${targetGaps}.`
    : `Perform a deep "Gap Analysis" identifying what they are currently missing in their general market strategy (e.g., SEO, Social Media, Tech Stack, Customer Experience, etc.).`;

  const prompt = `Act as a world-class B2B Lead Generation and Market Intelligence expert. 
  Find 10 high-potential business leads in the ${category} industry located in or around ${location}.
  
  ${gapInstruction}
  
  Assign a "Conversion Probability" (0-100) based on how much they likely need help based on their gaps.
  Craft a first-touchpoint highly personalized email for each lead. 
  
  Ensure you provide a valid mobile phone number for each lead.
  Rank the leads in the response from highest to lowest Conversion Probability.

  Generate ONLY a valid JSON array of objects.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              companyName: { type: Type.STRING },
              decisionMaker: { type: Type.STRING },
              role: { type: Type.STRING },
              phoneNumber: { type: Type.STRING },
              email: { type: Type.STRING },
              location: { type: Type.STRING },
              conversionProbability: { type: Type.NUMBER },
              gapAnalysis: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "score", "description"]
                }
              },
              outreachEmail: { type: Type.STRING }
            },
            required: ["id", "companyName", "decisionMaker", "role", "phoneNumber", "email", "location", "conversionProbability", "gapAnalysis", "outreachEmail"]
          }
        },
        tools: [{ googleSearch: {} }]
      },
    });

    // Extract grounding sources as required by the SDK rules
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: Source[] = [];
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri
          });
        }
      });
    }

    let text = response.text || "[]";
    // Sanitize in case model includes markdown wrappers despite mimeType config
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const leads: Lead[] = JSON.parse(text);
    
    // Sort leads by conversionProbability in descending order to ensure ranking is strictly enforced
    const rankedLeads = leads.sort((a, b) => b.conversionProbability - a.conversionProbability);

    // Attach grounding sources to all leads for display
    return rankedLeads.map(lead => ({
      ...lead,
      sources: sources.length > 0 ? sources : undefined
    }));
  } catch (error) {
    console.error("Error generating leads:", error);
    throw error;
  }
};
