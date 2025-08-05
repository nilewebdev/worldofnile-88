import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DiscordNotificationRequest {
  bookingDetails: {
    name: string;
    email: string;
    service: string;
    budget_range?: string;
    timeline?: string;
    project_details?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const discordWebhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");

    if (!discordWebhookUrl) {
      throw new Error("Discord webhook URL not configured");
    }

    const { bookingDetails }: DiscordNotificationRequest = await req.json();

    const embed = {
      title: "🎬 New WON Productions Booking!",
      color: 0x3B82F6, // Blue color
      fields: [
        {
          name: "👤 Client Name",
          value: bookingDetails.name,
          inline: true
        },
        {
          name: "📧 Email",
          value: bookingDetails.email,
          inline: true
        },
        {
          name: "🎯 Service",
          value: bookingDetails.service,
          inline: true
        },
        {
          name: "💰 Budget",
          value: bookingDetails.budget_range || "Not specified",
          inline: true
        },
        {
          name: "⏰ Timeline",
          value: bookingDetails.timeline || "Not specified",
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "WON Productions Booking System"
      }
    };

    if (bookingDetails.project_details) {
      embed.fields.push({
        name: "📝 Project Details",
        value: bookingDetails.project_details.substring(0, 1000), // Discord limit
        inline: false
      });
    }

    const discordPayload = {
      content: "@here New booking received!",
      embeds: [embed]
    };

    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      const error = await discordResponse.text();
      throw new Error(`Discord error: ${error}`);
    }

    console.log("Discord notification sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Discord notification sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending Discord notification:", error);
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