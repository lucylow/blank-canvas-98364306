import {
  mockPrimaryRoute,
  mockRiskyRoute,
  mockPerfectRoute,
  mockErrorRoute,
  mockUserJourneys,
  mockUser,
  mockNFTs,
  mockReports,
  mockProposals,
} from "@/mocks";
import type { SafeRouteResponse, UserJourney, SafePassageNFT, CommunityReport, DAOProposal } from "@/mocks";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const routes = [mockPrimaryRoute, mockRiskyRoute, mockPerfectRoute];

export class MockApiClient {
  async fetchSafeRoute(): Promise<SafeRouteResponse> {
    await delay(1500);
    // 90% primary, 5% risky, 5% perfect
    const rand = Math.random();
    if (rand < 0.9) return mockPrimaryRoute;
    if (rand < 0.95) return mockRiskyRoute;
    return mockPerfectRoute;
  }

  async getUserJourneys(): Promise<UserJourney[]> {
    await delay(500);
    return mockUserJourneys;
  }

  async getUserStats() {
    await delay(300);
    return mockUser;
  }

  async getNFTs(): Promise<SafePassageNFT[]> {
    await delay(500);
    return mockNFTs;
  }

  async getReports(): Promise<CommunityReport[]> {
    await delay(400);
    return mockReports;
  }

  async getProposals(): Promise<DAOProposal[]> {
    await delay(400);
    return mockProposals;
  }

  async submitReport(report: Partial<CommunityReport>): Promise<CommunityReport> {
    await delay(800);
    return {
      id: mockReports.length + 1,
      reporter: mockUser.address,
      latitude: report.latitude || 40.7128,
      longitude: report.longitude || -74.006,
      reportType: report.reportType || 0,
      description: report.description || "",
      stakeAmount: report.stakeAmount || 0.1,
      status: 0,
      yesVotes: 0,
      noVotes: 0,
      timestamp: Date.now(),
    };
  }

  async mintNFT(journeyId: string): Promise<{ tokenId: number; txHash: string }> {
    await delay(2000);
    return {
      tokenId: mockNFTs.length + 1,
      txHash: `0x${Math.random().toString(16).slice(2, 18)}...polygon`,
    };
  }

  async voteOnProposal(proposalId: number, direction: "for" | "against"): Promise<boolean> {
    await delay(600);
    return true;
  }
}

export const mockApi = new MockApiClient();
