import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  service: string;
  project_details: string;
  budget_range: string;
  timeline: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { name, email, service, project_details, budget_range, timeline }: BookingRequest = await req.json();

    console.log("Received booking request:", { name, email, service, budget_range });

    // Insert booking into database
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ name, email, service, project_details, budget_range, timeline }])
      .select();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    console.log("Booking saved successfully:", data);

    // Send SMS notification
    try {
      const adminPhoneNumber = Deno.env.get("ADMIN_PHONE_NUMBER");
      if (adminPhoneNumber) {
        await supabase.functions.invoke('send-sms-notification', {
          body: {
            to: adminPhoneNumber,
            bookingDetails: { name, email, service, budget_range }
          }
        });
        console.log("SMS notification sent successfully");
      }
    } catch (smsError) {
      console.error("Failed to send SMS notification:", smsError);
      // Don't fail the booking if SMS fails
    }

    return new Response(
      JSON.stringify({ success: true, message: "Booking request submitted successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in create-booking function:", error);
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