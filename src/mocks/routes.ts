export interface Waypoint {
  latitude: number;
  longitude: number;
  safety: number;
  order: number;
  description?: string;
}

export interface SafeRouteResponse {
  success: boolean;
  path: Waypoint[];
  safetyscore: number;
  error?: string;
}

export const mockPrimaryRoute: SafeRouteResponse = {
  success: true,
  path: [
    { latitude: 40.7128, longitude: -74.0060, safety: 9, order: 0, description: "Well-lit bus stop" },
    { latitude: 40.7129, longitude: -74.0061, safety: 8, order: 1, description: "Sidewalk w/ shops" },
    { latitude: 40.7130, longitude: -74.0062, safety: 7, order: 2, description: "Underpass - caution" },
    { latitude: 40.7131, longitude: -74.0063, safety: 9, order: 3, description: "Residential street" },
    { latitude: 40.7132, longitude: -74.0064, safety: 8, order: 4, description: "Home - safe arrival" },
  ],
  safetyscore: 8.2,
};

export const mockRiskyRoute: SafeRouteResponse = {
  success: true,
  path: [
    { latitude: 40.7100, longitude: -74.0100, safety: 5, order: 0, description: "Dimly lit alley" },
    { latitude: 40.7103, longitude: -74.0095, safety: 4, order: 1, description: "Isolated parking lot" },
    { latitude: 40.7106, longitude: -74.0090, safety: 3, order: 2, description: "Abandoned warehouse" },
    { latitude: 40.7109, longitude: -74.0085, safety: 6, order: 3, description: "Near convenience store" },
    { latitude: 40.7112, longitude: -74.0080, safety: 5, order: 4, description: "Residential backstreet" },
  ],
  safetyscore: 4.6,
};

export const mockPerfectRoute: SafeRouteResponse = {
  success: true,
  path: Array(5)
    .fill(0)
    .map((_, i) => ({
      latitude: 40.7128 + i * 0.0001,
      longitude: -74.0060 + i * 0.0001,
      safety: 9.5,
      order: i,
      description: `Perfect waypoint ${i + 1}`,
    })),
  safetyscore: 9.5,
};

export const mockErrorRoute: SafeRouteResponse = {
  success: false,
  path: [],
  safetyscore: 0,
  error: "Unable to calculate safe route. Please try again.",
};
