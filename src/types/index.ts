export interface WaypointData {
  lat: number;
  lng: number;
  safety: number;
  description: string;
}

export interface MockRoute {
  id: string;
  name: string;
  waypoints: WaypointData[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface MockNFT {
  tokenId: number;
  owner: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: NFTAttribute[];
  };
}

export enum ProposalState {
  Pending,
  Active,
  Defeated,
  Succeeded,
  Executed,
}

export interface MockProposal {
  id: number;
  description: string;
  proposer: string;
  state: ProposalState;
  forVotes: number;
  againstVotes: number;
  votingEnds: number;
}

export enum ReportStatus {
  Pending,
  Valid,
  Invalid,
  Cancelled,
}

export enum ReportType {
  BrokenLight,
  Suspicious,
  UnsafeArea,
  Other,
}

export interface MockReport {
  id: number;
  reporter: string;
  lat: number;
  lng: number;
  reportType: ReportType;
  description: string;
  stakeAmount: number;
  status: ReportStatus;
  yesVotes: number;
  noVotes: number;
  timestamp: number;
}
