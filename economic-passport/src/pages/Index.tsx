import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Database, Fingerprint, ScanLine, Sparkles, Lock, Globe2 } from "lucide-react";
import { Particles } from "@/components/Particles";
import { PassportCard } from "@/components/PassportCard";
import { StatCounter } from "@/components/StatCounter";
import { Button } from "@/components/ui/button";
import { PASSPORTS } from "@/data/passports";

const Index = () => {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden flex items-center pt-20 pb-12">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0">
          <Particles />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/20 text-xs font-mono mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
              </span>
              <span className="text-muted-foreground">Live · 47,283 passports issued</span>
            </motion.div>

            <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] text-balance">
              Your Work.<br />
              Your Identity.<br />
              <span className="gradient-text">Your Passport.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-balance">
              The world's first AI-powered financial identity for informal workers. Decentralised, verifiable, yours forever.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-glow hover:opacity-90 transition group h-12 px-6">
                <Link to="/onboarding">
                  Get Your Passport
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full glass h-12 px-6">
                <Link to="/lender">For Lenders</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Lock className="h-3.5 w-3.5" /> ZK Proofs</div>
              <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> AI Scoring</div>
              <div className="flex items-center gap-2"><Globe2 className="h-3.5 w-3.5" /> W3C Standard</div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-transparent to-emerald/20 blur-3xl" />
            <div className="relative max-w-md mx-auto">
              <PassportCard passport={PASSPORTS[0]} floating />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">The Invisible Economy</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-balance">
              Built for the people the system <span className="gradient-text-emerald">forgot</span>.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-8"><StatCounter value={1.4e9} suffix="B" label="Unbanked Workers" /></div>
            <div className="glass-card p-8"><StatCounter value={5e12} prefix="$" suffix="T" label="Informal Economy" /></div>
            <div className="glass-card p-8"><StatCounter value={169e6} suffix="M" label="Global Migrants" /></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">How It Works</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">Four steps to financial citizenship.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Fingerprint, title: "Create DID", desc: "A self-sovereign identity that lives on-chain. No bank required." },
              { icon: Database, title: "Connect Sources", desc: "UPI, gig platforms, mobile money, peer attestations — your real life data." },
              { icon: Sparkles, title: "AI Scores You", desc: "Skills, income, reputation extracted and scored fairly." },
              { icon: ScanLine, title: "Share with ZK", desc: "Prove what's true without revealing what's private." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-6 group hover:border-primary/40 transition-all hover:-translate-y-1"
              >
                <div className="text-4xl font-display font-bold text-muted-foreground/30 mb-4">0{i + 1}</div>
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-emerald/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="h-5 w-5 text-primary-glow" />
                </div>
                <div className="font-display font-bold text-lg mb-2">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-emerald mb-3">Real workers · Real impact</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-balance">
              From invisible to <span className="gradient-text">verifiable</span>.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {PASSPORTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card p-6 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-emerald flex items-center justify-center font-display font-bold text-white">
                    {p.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{p.fullName}</div>
                    <div className="text-xs text-muted-foreground">{p.flag} {p.occupation} · {p.location}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {p.id === '1' && '"I cleaned homes for 12 years with no record. Now lenders see me as a real person."'}
                  {p.id === '2' && '"6,400+ rides verified. Got my first business loan without a bank account."'}
                  {p.id === '3' && '"My harvest history finally counts. The cooperative trusts the score."'}
                </p>
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-display font-bold text-lg gradient-text-emerald">{p.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="relative glass-card overflow-hidden p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-emerald/20" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald/20 blur-[100px]" />
            <div className="relative">
              <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-balance">
                The future of finance is <span className="gradient-text">borderless</span>.
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Issue your passport in 60 seconds. No bank. No gatekeeper. Just you.</p>
              <Button asChild size="lg" className="mt-8 rounded-full bg-gradient-to-r from-primary to-purple-glow h-12 px-8">
                <Link to="/onboarding">Claim Your Passport <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-12">
        <div className="container grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="font-display font-bold text-base mb-3">Economic Passport</div>
            <p className="text-muted-foreground text-xs">Decentralised financial identity for the world's 1.4B unbanked.</p>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Product</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/passport" className="hover:text-foreground transition">Passport</Link></li>
              <li><Link to="/lender" className="hover:text-foreground transition">Lenders</Link></li>
              <li><Link to="/verify" className="hover:text-foreground transition">ZK Verify</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Developers</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/docs" className="hover:text-foreground transition">API Docs</Link></li>
              <li><a className="hover:text-foreground transition" href="#">SDKs</a></li>
              <li><a className="hover:text-foreground transition" href="#">Status</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a className="hover:text-foreground transition" href="#">About</a></li>
              <li><a className="hover:text-foreground transition" href="#">Privacy</a></li>
              <li><a className="hover:text-foreground transition" href="#">Manifesto</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 pt-6 border-t border-border/30 text-xs text-muted-foreground flex justify-between flex-wrap gap-2">
          <div>© 2026 Economic Passport · W3C Verifiable Credentials</div>
          <div className="font-mono">v1.0 · built for everyone</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
