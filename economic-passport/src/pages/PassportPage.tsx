import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, Share2, Check, ChevronDown, TrendingUp, Activity, Award, Sparkles } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { PassportCard } from "@/components/PassportCard";
import { PASSPORTS } from "@/data/passports";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PassportPage = () => {
  const [activeId, setActiveId] = useState(PASSPORTS[0].id);
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const passport = PASSPORTS.find(p => p.id === activeId)!;

  const copy = () => {
    navigator.clipboard.writeText(passport.did);
    setCopied(true);
    toast.success("DID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100svh-4rem)] py-10 relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px]" />
      <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-emerald/10 blur-[120px]" />

      <div className="container relative">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">Your Passport</div>
            <h1 className="font-display font-bold text-3xl md:text-4xl">Welcome back, {passport.fullName.split(' ')[0]}</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass rounded-full">
                Demo: {passport.fullName} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              {PASSPORTS.map(p => (
                <DropdownMenuItem key={p.id} onClick={() => setActiveId(p.id)}>
                  {p.flag} {p.fullName} · {p.location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* PASSPORT CARD + ACTIONS */}
          <div className="lg:col-span-3 space-y-6">
            <div onClick={() => setFlipped(f => !f)} className="cursor-pointer">
              <PassportCard passport={passport} flipped={flipped} />
            </div>

            <div className="flex gap-3 flex-wrap">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-gradient-to-r from-primary to-purple-glow">
                    <Share2 className="h-4 w-4 mr-2" /> Share Passport
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Share via ZK Proof</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center py-4">
                    <div className="bg-white p-4 rounded-2xl">
                      <QRCodeSVG value={`https://ep.app/v/${passport.did}`} size={180} bgColor="#fff" fgColor="#0A0A0F" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      This QR contains a zero-knowledge proof. Verifiers see only what you've authorised.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="glass rounded-full" onClick={() => toast.success("Credential downloaded as JSON-LD")}>
                <Download className="h-4 w-4 mr-2" /> Download Credential
              </Button>
              <Button variant="outline" className="glass rounded-full" onClick={copy}>
                {copied ? <Check className="h-4 w-4 mr-2 text-emerald" /> : <Copy className="h-4 w-4 mr-2" />} DID
              </Button>
            </div>

            {/* INCOME CHART */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Income Trend · 6mo</div>
                  <div className="font-display text-2xl font-bold mt-1">${passport.monthlyIncome}/mo</div>
                </div>
                <div className="flex items-center gap-1 text-emerald text-xs font-semibold">
                  <TrendingUp className="h-3 w-3" /> +24% YoY
                </div>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={passport.income}>
                    <defs>
                      <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary-glow))" strokeWidth={2} fill="url(#ig)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SKILLS */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-4 w-4 text-primary-glow" />
                <div className="font-display font-semibold">AI-Extracted Skills</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {passport.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-full glass border border-primary/20 text-sm"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* SIDE COL */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Score Breakdown</div>
              <div className="space-y-3">
                {[
                  { label: "Income Stability", value: 82 },
                  { label: "Work History", value: 78 },
                  { label: "Peer Reputation", value: 71 },
                  { label: "Skills Diversity", value: 68 },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{s.label}</span><span className="font-mono text-muted-foreground">{s.value}/100</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.value}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-primary to-emerald rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-emerald" />
                <div className="font-display font-semibold">Verified Sources</div>
              </div>
              <div className="space-y-2">
                {passport.dataSources.map(s => (
                  <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/40">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm">{s.name}</span>
                    </div>
                    {s.verified ? (
                      <Check className="h-4 w-4 text-emerald" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground">Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-4 w-4 text-primary-glow" />
                <div className="font-display font-semibold">Activity</div>
              </div>
              <div className="space-y-3">
                {passport.activity.map(a => (
                  <div key={a.id} className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm">{a.text}</div>
                      <div className="text-xs text-muted-foreground font-mono">{a.ago}</div>
                    </div>
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

export default PassportPage;
