import { MockApiClient } from "./mockApi";
import { supabase } from "@/integrations/supabase/client";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

class RealApiClient extends MockApiClient {
  async fetchSafeRoute() {
    try {
      const { data, error } = await supabase.functions.invoke("safe-route", {
        body: {
          start: { latitude: 40.7128, longitude: -74.0060 },
          end: { latitude: 40.7135, longitude: -74.0055 },
        },
      });

      if (error || !data?.success) {
        console.warn("Edge function failed, falling back to mock:", error);
        return super.fetchSafeRoute();
      }

      return data;
    } catch (e) {
      console.warn("Edge function unreachable, falling back to mock:", e);
      return super.fetchSafeRoute();
    }
  }
}

export const apiClient = USE_MOCK ? new MockApiClient() : new RealApiClient();
