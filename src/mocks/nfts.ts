export interface SafePassageNFT {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  journeyId: string;
  attributes: { trait_type: string; value: string }[];
}

export const mockNFTs: SafePassageNFT[] = [
  {
    tokenId: 1,
    name: "Safe Passage #001",
    description: "Verified safe journey: Bus stop → Home (8.2 safety score)",
    image: "",
    journeyId: "journey-001",
    attributes: [
      { trait_type: "Safety Score", value: "8.2" },
      { trait_type: "Distance", value: "450m" },
      { trait_type: "Time", value: "6min" },
      { trait_type: "Date", value: "2026-03-05" },
      { trait_type: "Waypoints", value: "5/5" },
      { trait_type: "Off-Route Warnings", value: "1" },
    ],
  },
  {
    tokenId: 2,
    name: "Safe Passage #002",
    description: "Perfect journey with maximum safety score (9.5)",
    image: "",
    journeyId: "journey-003",
    attributes: [
      { trait_type: "Safety Score", value: "9.5" },
      { trait_type: "Distance", value: "450m" },
      { trait_type: "Time", value: "8min" },
      { trait_type: "Date", value: "2026-03-03" },
      { trait_type: "Waypoints", value: "5/5" },
      { trait_type: "Off-Route Warnings", value: "0" },
    ],
  },
];
