import { MockApiClient } from "./mockApi";

// Toggle between mock/real with env var
// When VITE_USE_MOCK is not set, defaults to true for demo
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

// Real client placeholder for future backend integration
class RealApiClient extends MockApiClient {
  // Override methods with real API calls when backend is ready
  // For now, falls back to mock data
}

export const apiClient = USE_MOCK ? new MockApiClient() : new RealApiClient();
