import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import type { Passport } from "@/data/passports";

type Props = { passport: Passport; flipped?: boolean; floating?: boolean };

export const PassportCard = ({ passport, flipped = false, floating = false }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${floating ? "animate-float" : ""}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[1.6/1] rounded-3xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="passport-card absolute inset-0 rounded-3xl p-6 md:p-8 flex flex-col justify-between text-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-glow/30 to-transparent blur-3xl pointer-events-none" />

          <div className="relative flex justify-between items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-mono">Economic Passport</div>
              <div className="text-2xl md:text-3xl font-display font-bold mt-1">{passport.fullName}</div>
              <div className="text-sm text-white/70 mt-0.5">{passport.flag} {passport.location} · {passport.occupation}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {passport.verified && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald/20 border border-emerald/40 backdrop-blur">
                  <ShieldCheck className="h-3 w-3 text-emerald-glow" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-glow">Verified</span>
                </div>
              )}
              <div className="text-[9px] text-white/50 font-mono">EP · {passport.issuedAt}</div>
            </div>
          </div>

          <div className="relative flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-mono">DID</div>
              <div className="text-xs font-mono text-white/80 mt-0.5 truncate max-w-[200px] md:max-w-[260px]">
                {passport.did.slice(0, 14)}…{passport.did.slice(-6)}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {passport.skills.slice(0, 3).map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative shrink-0">
              <ScoreRing score={passport.score} />
            </div>
          </div>

          <div className="absolute bottom-3 right-6 flex items-center gap-1 text-[9px] text-white/40 font-mono">
            <Sparkles className="h-2.5 w-2.5" /> W3C VC
          </div>
        </div>

        {/* Back */}
        <div
          className="passport-card absolute inset-0 rounded-3xl p-8 flex flex-col items-center justify-center text-white"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="bg-white p-4 rounded-2xl">
            <div className="w-32 h-32 bg-[repeating-conic-gradient(#000_0_25%,#fff_0_50%)] [background-size:8px_8px] rounded-lg" />
          </div>
          <div className="text-xs text-white/70 mt-4 font-mono">Scan to verify (ZK Proof)</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ScoreRing = ({ score }: { score: number }) => {
  const max = 1000;
  const pct = score / max;
  const r = 32;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-[88px] h-[88px]">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <motion.circle
          cx="40" cy="40" r={r} fill="none"
          stroke="url(#sg)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(245, 80%, 75%)" />
            <stop offset="100%" stopColor="hsl(156, 80%, 50%)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold leading-none">{score}</div>
        <div className="text-[9px] uppercase tracking-widest text-white/50 font-mono mt-0.5">/ 1000</div>
      </div>
    </div>
  );
};
