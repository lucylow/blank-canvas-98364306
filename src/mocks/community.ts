export interface CommunityReport {
  id: number;
  reporter: string;
  latitude: number;
  longitude: number;
  reportType: number; // 0=BrokenLight, 1=Suspicious, 2=UnsafeArea, 3=Other
  description: string;
  stakeAmount: number;
  status: number; // 0=Pending, 1=Valid, 2=Invalid, 3=Cancelled
  yesVotes: number;
  noVotes: number;
  timestamp: number;
}

export const mockReports: CommunityReport[] = [
  {
    id: 1,
    reporter: "0x742d...f44e",
    latitude: 40.7129,
    longitude: -74.0061,
    reportType: 0,
    description: "Street light broken near the sidewalk shops, very dark after 9 PM.",
    stakeAmount: 0.1,
    status: 0,
    yesVotes: 12,
    noVotes: 2,
    timestamp: Date.now() - 86400000,
  },
  {
    id: 2,
    reporter: "0x8a3d...b22c",
    latitude: 40.7130,
    longitude: -74.0062,
    reportType: 2,
    description: "Underpass has no CCTV coverage. Multiple incidents reported by locals.",
    stakeAmount: 0.2,
    status: 1,
    yesVotes: 45,
    noVotes: 3,
    timestamp: Date.now() - 172800000,
  },
  {
    id: 3,
    reporter: "0x1f4a...c9d1",
    latitude: 40.7100,
    longitude: -74.0100,
    reportType: 1,
    description: "Suspicious activity observed near the dimly lit alley after 10 PM.",
    stakeAmount: 0.15,
    status: 0,
    yesVotes: 8,
    noVotes: 5,
    timestamp: Date.now() - 43200000,
  },
];

export interface DAOProposal {
  id: number;
  description: string;
  proposer: string;
  state: number; // 0=Pending, 1=Active, 2=Defeated, 3=Succeeded, 4=Executed
  forVotes: number;
  againstVotes: number;
  votingEnds: number;
}

export const mockProposals: DAOProposal[] = [
  {
    id: 1,
    description: "Increase minimum stake for safety reports to 0.5 MATIC",
    proposer: "0x742d...f44e",
    state: 1,
    forVotes: 342,
    againstVotes: 128,
    votingEnds: Math.floor(Date.now() / 1000) + 86400 * 3,
  },
  {
    id: 2,
    description: "Add street lighting weight factor to safety algorithm",
    proposer: "0x8a3d...b22c",
    state: 3,
    forVotes: 891,
    againstVotes: 45,
    votingEnds: Math.floor(Date.now() / 1000) - 86400,
  },
  {
    id: 3,
    description: "Enable community moderator elections via NFT governance",
    proposer: "0x1f4a...c9d1",
    state: 0,
    forVotes: 0,
    againstVotes: 0,
    votingEnds: Math.floor(Date.now() / 1000) + 86400 * 7,
  },
];
