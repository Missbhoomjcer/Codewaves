import { useState } from "react";
import { motion } from "framer-motion";
import { Search, KeyRound, Check, ShieldCheck, Plus, Activity } from "lucide-react";
import { PASSPORTS } from "@/data/passports";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Lender = () => {
  const [query, setQuery] = useState("");
  const [autoApprove, setAutoApprove] = useState(true);
  const [keys, setKeys] = useState([{ id: "1", name: "Production", prefix: "ep_live_a8f2" }]);

  const filtered = PASSPORTS.filter(p =>
    p.fullName.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase()) ||
    p.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  const addKey = () => {
    const prefix = "ep_live_" + Math.random().toString(36).slice(2, 6);
    setKeys(k => [...k, { id: crypto.randomUUID(), name: "New Key", prefix }]);
    toast.success("API key created. Copy it now — it won't be shown again.");
  };

  return (
    <div className="min-h-[calc(100svh-4rem)] py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald mb-2">Lender Console</div>
            <h1 className="font-display font-bold text-3xl md:text-4xl">Verified Passport Holders</h1>
          </div>
          <div className="flex items-center gap-3 glass-card px-4 py-2">
            <span className="text-xs text-muted-foreground">Auto pre-approve</span>
            <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Queries", value: "12,847", trend: "+18%" },
            { label: "Approvals", value: "9,234", trend: "+22%" },
            { label: "Avg Score", value: "734", trend: "+4%" },
            { label: "Default Rate", value: "2.1%", trend: "-0.8%" },
          ].map(s => (
            <div key={s.label} className="glass-card p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{s.label}</div>
              <div className="font-display text-2xl font-bold mt-2">{s.value}</div>
              <div className="text-xs text-emerald mt-1">{s.trend}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skill, or location…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="pl-9 bg-secondary/50 border-border/50"
                />
              </div>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                    <th className="text-left pb-3 font-normal">Holder</th>
                    <th className="text-left pb-3 font-normal hidden md:table-cell">Location</th>
                    <th className="text-left pb-3 font-normal">Score</th>
                    <th className="text-right pb-3 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-border/40 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-emerald flex items-center justify-center font-display font-bold text-xs text-white">
                            {p.avatar}
                          </div>
                          <div>
                            <div className="font-semibold">{p.fullName}</div>
                            <div className="text-xs text-muted-foreground">{p.occupation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell text-muted-foreground">{p.flag} {p.location}</td>
                      <td>
                        <span className="font-display font-bold gradient-text-emerald">{p.score}</span>
                      </td>
                      <td className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="rounded-full">View Proof</Button>
                          </DialogTrigger>
                          <DialogContent className="glass max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-emerald" /> ZK Proof Verified
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 pt-2">
                              <ProofRow label="Identity authentic" />
                              <ProofRow label={`Score ≥ 650 (actual hidden)`} />
                              <ProofRow label="Income above $200/mo threshold" />
                              <ProofRow label={`Skills include: ${p.skills.slice(0, 2).join(", ")}`} />
                              <ProofRow label="Issued by trusted authority" />
                            </div>
                            <p className="text-[10px] text-muted-foreground font-mono mt-3">
                              No raw data was disclosed. Cryptographic proof verified in 84ms.
                            </p>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* API KEYS */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-primary-glow" />
                <div className="font-display font-semibold">API Keys</div>
              </div>
              <Button size="sm" variant="ghost" onClick={addKey}><Plus className="h-3 w-3 mr-1" /> New</Button>
            </div>
            <div className="space-y-2">
              {keys.map(k => (
                <div key={k.id} className="p-3 rounded-lg bg-secondary/40 border border-border/40">
                  <div className="text-xs text-muted-foreground">{k.name}</div>
                  <div className="font-mono text-sm mt-1">{k.prefix}••••••••••</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border/40">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4 text-emerald" />
                <div className="font-display font-semibold text-sm">Recent Queries</div>
              </div>
              <div className="space-y-2 text-xs">
                {["did:ep:0x7f3a…b7c6", "did:ep:0x9c4b…6a5b", "did:ep:0x1a2b…9a0b"].map(d => (
                  <div key={d} className="flex justify-between">
                    <span className="font-mono text-muted-foreground">{d}</span>
                    <Check className="h-3 w-3 text-emerald" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProofRow = ({ label }: { label: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-2 p-2 rounded-lg bg-emerald/10 border border-emerald/20"
  >
    <Check className="h-4 w-4 text-emerald shrink-0" />
    <span className="text-sm">{label}</span>
  </motion.div>
);

export default Lender;
