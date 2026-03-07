import type { MockRoute, MockNFT, MockProposal, MockReport, ProposalState, ReportStatus, ReportType } from "@/types";

export const mockRoute1: MockRoute = {
  id: "route-001",
  name: "University → Home",
  waypoints: [
    { lat: 35.6812, lng: 139.7671, safety: 9, description: "Well-lit main road" },
    { lat: 35.6815, lng: 139.7685, safety: 8, description: "Commercial area, cameras present" },
    { lat: 35.682, lng: 139.77, safety: 6, description: "Side street, moderate lighting" },
    { lat: 35.6825, lng: 139.772, safety: 4, description: "Dark alley, avoid if alone" },
    { lat: 35.683, lng: 139.774, safety: 7, description: "Residential area, some lights" },
    { lat: 35.6835, lng: 139.776, safety: 9, description: "Main boulevard, well-lit" },
  ],
};

const mockNFTs: MockNFT[] = [
  {
    tokenId: 1,
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    metadata: {
      name: "Safe Passage #1",
      description: "Completed safe journey from University to Home",
      image: "",
      attributes: [
        { trait_type: "Date", value: "2026-02-15" },
        { trait_type: "Safety Score", value: "8.2/10" },
        { trait_type: "Distance", value: "2.3 km" },
        { trait_type: "Route Hash", value: "0xabc...def" },
      ],
    },
  },
  {
    tokenId: 2,
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    metadata: {
      name: "Safe Passage #2",
      description: "Night walk through downtown safely completed",
      image: "",
      attributes: [
        { trait_type: "Date", value: "2026-02-18" },
        { trait_type: "Safety Score", value: "7.5/10" },
        { trait_type: "Distance", value: "1.8 km" },
        { trait_type: "Route Hash", value: "0x123...789" },
      ],
    },
  },
  {
    tokenId: 3,
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    metadata: {
      name: "Safe Passage #3",
      description: "Early morning commute with AR guidance",
      image: "",
      attributes: [
        { trait_type: "Date", value: "2026-02-22" },
        { trait_type: "Safety Score", value: "9.1/10" },
        { trait_type: "Distance", value: "3.1 km" },
        { trait_type: "Route Hash", value: "0xfed...cba" },
      ],
    },
  },
];

const mockProposals: MockProposal[] = [
  {
    id: 1,
    description: "Increase minimum stake for safety reports to 0.5 MATIC",
    proposer: "0x742d...f44e",
    state: 1 as ProposalState,
    forVotes: 342,
    againstVotes: 128,
    votingEnds: Math.floor(Date.now() / 1000) + 86400 * 3,
  },
  {
    id: 2,
    description: "Add street lighting weight factor to safety algorithm",
    proposer: "0x8a3d...b22c",
    state: 3 as ProposalState,
    forVotes: 891,
    againstVotes: 45,
    votingEnds: Math.floor(Date.now() / 1000) - 86400,
  },
  {
    id: 3,
    description: "Enable community moderator elections via NFT governance",
    proposer: "0x1f4a...c9d1",
    state: 0 as ProposalState,
    forVotes: 0,
    againstVotes: 0,
    votingEnds: Math.floor(Date.now() / 1000) + 86400 * 7,
  },
];

const mockReports: MockReport[] = [
  {
    id: 1,
    reporter: "0x742d...f44e",
    lat: 35.682,
    lng: 139.77,
    reportType: 0 as ReportType,
    description: "Street light broken near the park entrance, very dark at night.",
    stakeAmount: 0.1,
    status: 0 as ReportStatus,
    yesVotes: 12,
    noVotes: 2,
    timestamp: Date.now() - 86400000,
  },
  {
    id: 2,
    reporter: "0x8a3d...b22c",
    lat: 35.6825,
    lng: 139.772,
    reportType: 2 as ReportType,
    description: "Poorly lit alley with no CCTV coverage. Multiple incidents reported by locals.",
    stakeAmount: 0.2,
    status: 1 as ReportStatus,
    yesVotes: 45,
    noVotes: 3,
    timestamp: Date.now() - 172800000,
  },
  {
    id: 3,
    reporter: "0x1f4a...c9d1",
    lat: 35.683,
    lng: 139.774,
    reportType: 1 as ReportType,
    description: "Suspicious activity observed near the abandoned building after 10 PM.",
    stakeAmount: 0.15,
    status: 0 as ReportStatus,
    yesVotes: 8,
    noVotes: 5,
    timestamp: Date.now() - 43200000,
  },
];

// Simulated async client
export const blockchainClient = {
  getNFTs: async (owner: string): Promise<MockNFT[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockNFTs.filter((n) => n.owner === owner);
  },
  getProposals: async (): Promise<MockProposal[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockProposals;
  },
  getReports: async (): Promise<MockReport[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockReports;
  },
};
