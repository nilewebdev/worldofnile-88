import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  message: string;
  context?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const { message, context }: ChatRequest = await req.json();

    const systemPrompt = `You are a helpful customer service representative for WON Productions, a professional video editing and graphic design service. 

About WON Productions:
- Specializes in YouTube thumbnails, social media branding, logos, and video editing
- Professional designer Rheon N with 3+ years experience
- 50+ completed projects with 100% client satisfaction
- Available on Fiverr: https://www.fiverr.com/wonproductions/
- Services include: Video editing, YouTube thumbnails, logos, social media graphics, album covers

Your role:
- Answer questions about services, pricing, and timelines
- Help users understand what WON Productions offers
- Guide them to book a consultation if they're interested
- Be friendly, professional, and knowledgeable
- If you don't know specific pricing, suggest they book a consultation for a custom quote

Keep responses concise and helpful. Always try to guide serious inquiries toward booking a consultation.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-2025-04-14",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: aiResponse,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in AI chat:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);