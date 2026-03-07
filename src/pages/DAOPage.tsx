import ProposalsList from "@/components/ProposalsList";
import { Vote, Info } from "lucide-react";

export default function DAOPage() {
  return (
    <div className="container py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Vote className="w-8 h-8 text-accent" /> Governance Proposals
        </h1>
        <p className="text-muted-foreground mt-1">NFT holders vote on key parameters that shape the SafeStep network.</p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Voting power is proportional to your Safe Passage NFT count. Connect your wallet and hold at least one NFT to cast votes.
        </p>
      </div>

      <ProposalsList />
    </div>
  );
}
