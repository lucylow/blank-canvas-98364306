export interface UserJourney {
  id: string;
  routeId: string;
  startTime: string;
  endTime: string;
  waypointsReached: number;
  totalWaypoints: number;
  offRouteCount: number;
  journeyTime: number; // minutes
  safetyScore: number;
  nftMinted: boolean;
  nftTransactionHash?: string;
  passed: boolean;
}

export const mockUserJourneys: UserJourney[] = [
  {
    id: "journey-001",
    routeId: "route-001",
    startTime: "2026-03-05T22:15:00Z",
    endTime: "2026-03-05T22:21:00Z",
    waypointsReached: 5,
    totalWaypoints: 5,
    offRouteCount: 1,
    journeyTime: 6,
    safetyScore: 8.2,
    nftMinted: true,
    nftTransactionHash: "0xabc123def456789...polygon",
    passed: true,
  },
  {
    id: "journey-002",
    routeId: "route-002",
    startTime: "2026-03-04T21:30:00Z",
    endTime: "2026-03-04T21:48:00Z",
    waypointsReached: 4,
    totalWaypoints: 5,
    offRouteCount: 4,
    journeyTime: 18,
    safetyScore: 5.1,
    nftMinted: false,
    passed: false,
  },
  {
    id: "journey-003",
    routeId: "route-003",
    startTime: "2026-03-03T20:00:00Z",
    endTime: "2026-03-03T20:08:00Z",
    waypointsReached: 5,
    totalWaypoints: 5,
    offRouteCount: 0,
    journeyTime: 8,
    safetyScore: 9.5,
    nftMinted: true,
    nftTransactionHash: "0xfed987cba654321...polygon",
    passed: true,
  },
];

export const mockUser = {
  address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  totalJourneys: 3,
  passedJourneys: 2,
  totalNFTs: 2,
  avgSafetyScore: 7.6,
  reportsSubmitted: 2,
};
