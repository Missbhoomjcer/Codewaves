import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Fingerprint, Sparkles, PartyPopper, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const sources = [
  { id: "upi", name: "UPI / Mobile Money", icon: "📱", desc: "Transaction history & income flow" },
  { id: "gig", name: "Gig Platforms", icon: "🚗", desc: "Uber, Ola, Swiggy, TaskRabbit, etc." },
  { id: "utility", name: "Utility Bills", icon: "⚡", desc: "Electricity, water, internet payments" },
  { id: "peer", name: "Peer Attestations", icon: "👥", desc: "References from your community" },
];

const aiSteps = [
  "Initialising AI scoring engine…",
  "Extracting skills from work history…",
  "Analysing 6 months of income flow…",
  "Cross-referencing peer attestations…",
  "Computing fair credit score…",
  "Issuing W3C Verifiable Credential…",
  "Anchoring DID on-chain…",
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [didProgress, setDidProgress] = useState(0);
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ upi: true, gig: true, utility: true, peer: false });
  const [aiLog, setAiLog] = useState<string[]>([]);

  useEffect(() => {
    if (step === 0) {
      const t = setInterval(() => {
        setDidProgress(p => {
          if (p >= 100) { clearInterval(t); return 100; }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(t);
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      setAiLog([]);
      let i = 0;
      const t = setInterval(() => {
        if (i < aiSteps.length) {
          setAiLog(l => [...l, aiSteps[i]]);
          i++;
        } else {
          clearInterval(t);
          setTimeout(() => setStep(3), 600);
        }
      }, 700);
      return () => clearInterval(t);
    }
  }, [step]);

  return (
    <div className="min-h-[calc(100svh-4rem)] py-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 blur-[120px]" />

      <div className="container max-w-2xl relative">
        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: i === step ? 1.1 : 1,
                  backgroundColor: i <= step ? "hsl(var(--primary))" : "hsl(var(--muted))",
                }}
                className="h-2 w-10 rounded-full"
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <Step key="0">
              <Header eyebrow="Step 1 / 4" title="Create your DID" sub="A decentralised identity, owned only by you. Generated with quantum-resistant cryptography." />
              <div className="glass-card p-8 mt-8">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-emerald p-[2px]"
                  >
                    <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                      <Fingerprint className="h-10 w-10 text-primary-glow" />
                    </div>
                  </motion.div>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <ProgressBar label="Generating keypair" value={Math.min(didProgress * 1.5, 100)} />
                  <ProgressBar label="Creating DID document" value={Math.min(Math.max(didProgress - 30, 0) * 1.5, 100)} />
                  <ProgressBar label="Anchoring on-chain" value={Math.min(Math.max(didProgress - 60, 0) * 2.5, 100)} />
                </div>
                <div className="mt-6 p-3 rounded-lg bg-secondary/50 font-mono text-[10px] text-muted-foreground break-all">
                  did:ep:0x{Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")}
                </div>
                <Button onClick={() => setStep(1)} disabled={didProgress < 100} className="w-full mt-6 rounded-full bg-gradient-to-r from-primary to-purple-glow h-11">
                  {didProgress < 100 ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating…</> : <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step key="1">
              <Header eyebrow="Step 2 / 4" title="Connect data sources" sub="Toggle the data sources you want to use. The more you connect, the stronger your passport." />
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                {sources.map(s => (
                  <motion.label
                    key={s.id}
                    whileHover={{ y: -2 }}
                    className={`glass-card p-5 cursor-pointer transition-all ${enabled[s.id] ? "border-primary/60 glow-purple" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-3xl">{s.icon}</div>
                      <Switch checked={enabled[s.id]} onCheckedChange={c => setEnabled(e => ({ ...e, [s.id]: c }))} />
                    </div>
                    <div className="font-display font-semibold mt-3">{s.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
                  </motion.label>
                ))}
              </div>
              <Button
                onClick={() => {
                  const count = Object.values(enabled).filter(Boolean).length;
                  if (count < 1) return toast.error("Connect at least one source");
                  toast.success(`${count} sources connected`);
                  setStep(2);
                }}
                className="w-full mt-6 rounded-full bg-gradient-to-r from-primary to-purple-glow h-11"
              >
                Run AI Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Step>
          )}

          {step === 2 && (
            <Step key="2">
              <Header eyebrow="Step 3 / 4" title="AI is analysing your data" sub="Our scoring engine is fairly evaluating your work history. This takes ~5 seconds." />
              <div className="glass-card p-8 mt-8">
                <div className="flex items-center justify-center mb-6">
                  <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Sparkles className="h-12 w-12 text-primary-glow" />
                  </motion.div>
                </div>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-xs space-y-1.5 min-h-[200px] max-h-[280px] overflow-y-auto border border-border/50">
                  {aiLog.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 text-emerald-glow"
                    >
                      <span className="text-muted-foreground">{`>`}</span>
                      <span>{line}</span>
                      {i === aiLog.length - 1 && i < aiSteps.length - 1 && <Loader2 className="h-3 w-3 animate-spin ml-auto" />}
                      {i < aiLog.length - 1 && <Check className="h-3 w-3 ml-auto" />}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step key="3">
              <Confetti />
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex h-20 w-20 rounded-full bg-gradient-to-br from-emerald to-emerald-glow items-center justify-center glow-emerald mb-6"
                >
                  <PartyPopper className="h-10 w-10 text-white" />
                </motion.div>
                <Header eyebrow="" title="Your passport is ready!" sub="Score: 742/1000. You can now share verifiable proofs with lenders, employers, and platforms — anywhere in the world." />
                <Button onClick={() => navigate("/passport")} size="lg" className="mt-8 rounded-full bg-gradient-to-r from-primary to-purple-glow h-12 px-8">
                  View My Passport <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Step>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Step = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

const Header = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) => (
  <div className="text-center">
    {eyebrow && <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">{eyebrow}</div>}
    <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight">{title}</h1>
    <p className="text-muted-foreground mt-3 max-w-md mx-auto">{sub}</p>
  </div>
);

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between mb-1 text-muted-foreground">
      <span>{label}</span><span>{Math.round(value)}%</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <motion.div
        animate={{ width: `${value}%` }}
        className="h-full bg-gradient-to-r from-primary to-emerald rounded-full"
      />
    </div>
  </div>
);

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -20, x: `${Math.random() * 100}%`, opacity: 1, rotate: 0 }}
        animate={{ y: "110vh", rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
        transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 0.5, ease: "linear" }}
        className="absolute h-2 w-2 rounded-sm"
        style={{ backgroundColor: ["#7F77DD", "#1D9E75", "#F5C242", "#fff"][Math.floor(Math.random() * 4)] }}
      />
    ))}
  </div>
);

export default Onboarding;
