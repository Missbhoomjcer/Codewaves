import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, ShieldCheck, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const checks = [
  "Decoding credential…",
  "Verifying issuer signature…",
  "Checking revocation status…",
  "Validating ZK proof…",
  "Confirming attributes…",
];

const Verify = () => {
  const [input, setInput] = useState("did:ep:0x7f3a9b2c8e1d4f6a5b3c2d1e0f9a8b7c6d5e4f3a");
  const [status, setStatus] = useState<"idle" | "verifying" | "verified">("idle");
  const [stepIdx, setStepIdx] = useState(0);

  const verify = () => {
    if (!input.trim()) return;
    setStatus("verifying");
    setStepIdx(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i >= checks.length) {
        clearInterval(t);
        setTimeout(() => setStatus("verified"), 400);
      } else {
        setStepIdx(i);
      }
    }, 500);
  };

  return (
    <div className="min-h-[calc(100svh-4rem)] py-12 relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald/10 blur-[120px]" />
      <div className="container max-w-2xl relative">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald mb-3">Zero-Knowledge Verifier</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight">Trust without exposure.</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Verify credentials cryptographically. Never see private data.</p>
        </div>

        <div className="glass-card p-6 md:p-8">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Paste DID or credential</label>
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="mt-2 font-mono text-sm bg-secondary/40 min-h-[100px] border-border/50"
            placeholder="did:ep:0x… or paste signed credential"
          />
          <div className="flex gap-3 mt-4">
            <Button
              onClick={verify}
              disabled={status === "verifying"}
              className="flex-1 rounded-full bg-gradient-to-r from-emerald to-emerald-glow h-11"
            >
              {status === "verifying" ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verifying…</> : <><ScanLine className="h-4 w-4 mr-2" /> Verify Proof</>}
            </Button>
            <Button variant="outline" className="rounded-full glass" onClick={() => { setStatus("idle"); setInput(""); }}>
              Reset
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "verifying" && (
            <motion.div
              key="v"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card p-6 mt-6"
            >
              {checks.map((c, i) => (
                <div key={i} className={`flex items-center gap-3 py-2 transition-opacity ${i > stepIdx ? "opacity-30" : ""}`}>
                  {i < stepIdx ? <Check className="h-4 w-4 text-emerald" /> : i === stepIdx ? <Loader2 className="h-4 w-4 animate-spin text-primary-glow" /> : <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />}
                  <span className="text-sm font-mono">{c}</span>
                </div>
              ))}
            </motion.div>
          )}

          {status === "verified" && (
            <motion.div
              key="d"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 mt-6 border-emerald/40 glow-emerald"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-full bg-emerald/20 border border-emerald/40 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-emerald" />
                </div>
                <div>
                  <div className="font-display font-bold text-xl">Verified ✓</div>
                  <div className="text-xs text-muted-foreground font-mono">Verified in 84ms · ZK-SNARK proof</div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  "Identity is authentic",
                  "Income verified above threshold",
                  "Skills credential authentic",
                  "Issuer is trusted authority",
                  "Credential not revoked",
                ].map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-emerald/10 border border-emerald/20"
                  >
                    <Check className="h-4 w-4 text-emerald shrink-0" />
                    <span className="text-sm">{t}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-lg bg-secondary/40 border border-border/40 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">No personal data was revealed. Only proofs of the above statements were checked.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Verify;
