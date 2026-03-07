import { useState } from "react";
import ReportsList from "@/components/ReportsList";
import SafetyReportTypes from "@/components/SafetyReportTypes";
import { FileWarning, Plus, X, Send, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const reportTypes = ["Broken / missing streetlight", "Harassment or catcalling reported", "Group loitering near route", "Unsafe shortcut / alley", "Area feels safe & active"];

export default function ReportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ type: 0, description: "", stake: "0.1", lat: "", lng: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      toast({ title: "Error", description: "Please enter a description.", variant: "destructive" });
      return;
    }
    toast({
      title: "Report Submitted",
      description: `Your ${reportTypes[formData.type]} report has been staked with ${formData.stake} MATIC.`,
    });
    setFormData({ type: 0, description: "", stake: "0.1", lat: "", lng: "" });
    setShowForm(false);
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileWarning className="w-8 h-8 text-accent-yellow" /> Community Safety Reports
          </h1>
          <p className="text-muted-foreground mt-1">Submit and validate safety reports with staked MATIC.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-light transition-all self-start"
        >
          {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> New Report</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-5 animate-fade-in">
          <h2 className="font-semibold text-lg">Submit a Safety Report</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Report Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {reportTypes.map((t, i) => (
                  <option key={i} value={i}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Stake Amount (MATIC)</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={formData.stake}
                onChange={(e) => setFormData({ ...formData, stake: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 inline mr-1" /> Latitude
              </label>
              <input
                type="text"
                placeholder="e.g. 35.682"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 inline mr-1" /> Longitude
              </label>
              <input
                type="text"
                placeholder="e.g. 139.77"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Description</label>
            <textarea
              rows={3}
              placeholder="Describe the safety issue you observed..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-all"
          >
            <Send className="w-4 h-4" /> Submit Report
          </button>
        </form>
      )}

      <SafetyReportTypes />

      <ReportsList />
    </div>
  );
}
