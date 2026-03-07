import { useEffect, useState } from "react";
import { apiClient } from "@/services/api";
import type { DAOProposal } from "@/mocks/community";
import { ThumbsUp, ThumbsDown, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const stateLabels = ["Pending", "Active", "Defeated", "Succeeded", "Executed"];
const stateColors = [
  "bg-accent-yellow/20 text-accent-yellow",
  "bg-accent/20 text-accent",
  "bg-accent-red/20 text-accent-red",
  "bg-primary/20 text-primary-light",
  "bg-muted text-muted-foreground",
];

export default function ProposalsList() {
  const [proposals, setProposals] = useState<DAOProposal[]>([]);
  const [voted, setVoted] = useState<Record<number, "for" | "against">>({});
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    apiClient
      .getProposals()
      .then(setProposals)
      .catch(() => setError("Failed to load proposals."));
  }, []);

  const handleVote = async (proposalId: number, direction: "for" | "against") => {
    if (voted[proposalId]) {
      toast({ title: "Already Voted", description: "You have already cast your vote on this proposal." });
      return;
    }
    try {
      await apiClient.voteOnProposal(proposalId, direction);
      setVoted((prev) => ({ ...prev, [proposalId]: direction }));
      setProposals((prev) =>
        prev.map((p) =>
          p.id === proposalId
            ? { ...p, forVotes: p.forVotes + (direction === "for" ? 1 : 0), againstVotes: p.againstVotes + (direction === "against" ? 1 : 0) }
            : p
        )
      );
      toast({ title: "Vote Cast!", description: `You voted ${direction} on Proposal #${proposalId}.` });
    } catch {
      toast({ title: "Error", description: "Failed to cast vote.", variant: "destructive" });
    }
  };

  if (error) return <p className="text-accent-red py-8 text-center">{error}</p>;

  return (
    <div className="space-y-4">
      {proposals.map((prop) => {
        const isActive = prop.state === 1;
        const myVote = voted[prop.id];
        const totalVotes = prop.forVotes + prop.againstVotes;
        const forPct = totalVotes > 0 ? Math.round((prop.forVotes / totalVotes) * 100) : 0;

        return (
          <div key={prop.id} className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-colors">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-semibold">
                <span className="text-muted-foreground">#{prop.id}</span> {prop.description}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${stateColors[prop.state]}`}>
                {stateLabels[prop.state]}
              </span>
            </div>

            {totalVotes > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>For: {forPct}%</span>
                  <span>Against: {100 - forPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden flex">
                  <div className="bg-accent h-full transition-all" style={{ width: `${forPct}%` }} />
                  <div className="bg-accent-red h-full transition-all" style={{ width: `${100 - forPct}%` }} />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-accent">
                <ThumbsUp className="w-4 h-4" /> {prop.forVotes}
              </span>
              <span className="flex items-center gap-1.5 text-accent-red">
                <ThumbsDown className="w-4 h-4" /> {prop.againstVotes}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" /> {new Date(prop.votingEnds * 1000).toLocaleDateString()}
              </span>

              {isActive && !myVote && (
                <div className="ml-auto flex gap-2">
                  <button onClick={() => handleVote(prop.id, "for")} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-semibold hover:bg-accent/30 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> Vote For
                  </button>
                  <button onClick={() => handleVote(prop.id, "against")} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-red/20 text-accent-red text-xs font-semibold hover:bg-accent-red/30 transition-colors">
                    <ThumbsDown className="w-3.5 h-3.5" /> Vote Against
                  </button>
                </div>
              )}

              {myVote && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" /> Voted {myVote}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
