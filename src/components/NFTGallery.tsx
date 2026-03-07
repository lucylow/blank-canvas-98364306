import { useEffect, useState } from "react";
import { apiClient } from "@/services/api";
import type { SafePassageNFT } from "@/mocks/nfts";
import { Award, Calendar, Route, Hash, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function NFTGallery() {
  const [nfts, setNfts] = useState<SafePassageNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getNFTs()
      .then(setNfts)
      .catch(() => setError("Failed to load NFTs."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg h-64 animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-accent-red">{error}</p>
      </div>
    );
  }

  const attrIcons: Record<string, typeof Calendar> = {
    Date: Calendar,
    "Safety Score": ShieldCheck,
    Distance: Route,
    Time: Clock,
    Waypoints: MapPin,
    "Off-Route Warnings": Hash,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <div
          key={nft.tokenId}
          className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary hover:-translate-y-1 transition-all duration-300"
        >
          <div className="h-32 gradient-hero flex items-center justify-center">
            <Award className="w-16 h-16 text-accent opacity-60" />
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-1">{nft.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{nft.description}</p>
            <div className="space-y-2">
              {nft.attributes.map((attr, i) => {
                const Icon = attrIcons[attr.trait_type] || Hash;
                return (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Icon className="w-3.5 h-3.5" /> {attr.trait_type}
                    </span>
                    <span className="font-medium">{attr.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
