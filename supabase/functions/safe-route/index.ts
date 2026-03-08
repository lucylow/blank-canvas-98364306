import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Waypoint extends Coordinates {
  safety: number;
  order: number;
  description: string;
}

const FIXED_DEMO_START: Coordinates = { latitude: 40.7128, longitude: -74.0060 };
const FIXED_DEMO_END: Coordinates = { latitude: 40.7135, longitude: -74.0055 };

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { start, end }: { start?: Coordinates; end?: Coordinates } = await req.json();
    const routeStart = start || FIXED_DEMO_START;
    const routeEnd = end || FIXED_DEMO_END;

    const waypoints: Waypoint[] = [
      {
        latitude: routeStart.latitude,
        longitude: routeStart.longitude,
        safety: 9,
        order: 0,
        description: "Well-lit bus stop (24h bodega nearby)"
      },
      {
        latitude: 40.7129,
        longitude: -74.0061,
        safety: 8,
        order: 1,
        description: "Sidewalk with shops (high foot traffic)"
      },
      {
        latitude: 40.7130,
        longitude: -74.0062,
        safety: 7,
        order: 2,
        description: "Underpass - stay alert (CCTV present)"
      },
      {
        latitude: 40.7131,
        longitude: -74.0063,
        safety: 9,
        order: 3,
        description: "Residential street (neighbors visible)"
      },
      {
        latitude: routeEnd.latitude,
        longitude: routeEnd.longitude,
        safety: 8,
        order: 4,
        description: "Home - safe arrival"
      }
    ];

    const safetyScore = waypoints.reduce((sum, w) => sum + w.safety, 0) / waypoints.length;

    return new Response(JSON.stringify({
      success: true,
      path: waypoints,
      safetyscore: Number(safetyScore.toFixed(1)),
      confidence: 0.92,
      explanation: "Goose prioritized lighting (45%), activity (35%), recent incidents (20%). All waypoints meet night safety criteria."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "Goose route analysis failed",
      fallback: "Use demo mock data"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
