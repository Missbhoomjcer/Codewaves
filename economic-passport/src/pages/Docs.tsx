import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const endpoints = [
  {
    method: "GET",
    path: "/v1/passport/{did}",
    desc: "Retrieve a passport's public profile and verifiable credential.",
    code: `curl https://api.economicpassport.io/v1/passport/did:ep:0x7f3a... \\
  -H "Authorization: Bearer ep_live_••••"`,
    response: `{
  "did": "did:ep:0x7f3a...",
  "score": 785,
  "verified": true,
  "skills": ["Domestic Services", "Scheduling"],
  "issuer": "did:web:economicpassport.io",
  "credential_type": "EconomicPassportCredential"
}`,
  },
  {
    method: "POST",
    path: "/v1/verify",
    desc: "Verify a ZK proof against a public credential without disclosing private data.",
    code: `curl -X POST https://api.economicpassport.io/v1/verify \\
  -H "Authorization: Bearer ep_live_••••" \\
  -d '{ "proof": "0x...", "challenge": "loan_app_42" }'`,
    response: `{
  "verified": true,
  "claims": {
    "score_gte_650": true,
    "income_gte_200": true,
    "identity_authentic": true
  },
  "verified_at": "2026-04-29T11:23:14Z"
}`,
  },
  {
    method: "GET",
    path: "/v1/score/{did}",
    desc: "Get the current credit score for any passport DID (consent required).",
    code: `curl https://api.economicpassport.io/v1/score/did:ep:0x7f3a... \\
  -H "Authorization: Bearer ep_live_••••"`,
    response: `{
  "did": "did:ep:0x7f3a...",
  "score": 785,
  "tier": "excellent",
  "factors": {
    "income_stability": 82,
    "work_history": 78,
    "peer_reputation": 71
  }
}`,
  },
];

const Docs = () => {
  const [active, setActive] = useState(0);
  const ep = endpoints[active];

  return (
    <div className="min-h-[calc(100svh-4rem)] py-10">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">Developer Docs</div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">Build with Economic Passport</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">Integrate verifiable financial identity into your product in under 10 minutes.</p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="glass-card p-3 h-fit lg:sticky lg:top-24">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground px-3 pt-2 pb-3">Endpoints</div>
            {endpoints.map((e, i) => (
              <button
                key={e.path}
                onClick={() => setActive(i)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                  i === active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${e.method === "GET" ? "bg-emerald/20 text-emerald" : "bg-primary/20 text-primary-glow"}`}>
                  {e.method}
                </span>
                <span className="font-mono text-xs truncate">{e.path}</span>
              </button>
            ))}
            <div className="mt-3 pt-3 border-t border-border/40 px-3 pb-2">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">SDKs</div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>• Node.js / TypeScript</div>
                <div>• Python</div>
                <div>• Go</div>
                <div>• Rust</div>
              </div>
            </div>
          </aside>

          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${ep.method === "GET" ? "bg-emerald/20 text-emerald" : "bg-primary/20 text-primary-glow"}`}>
                  {ep.method}
                </span>
                <code className="font-mono text-base">{ep.path}</code>
              </div>
              <p className="text-muted-foreground text-sm">{ep.desc}</p>
            </div>

            <CodeBlock title="Request" code={ep.code} />
            <CodeBlock title="Response · 200 OK" code={ep.response} />

            <div className="glass-card p-6 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-4 w-4 text-primary-glow" />
                <div className="font-display font-semibold">Authentication</div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">All requests require a Bearer token. Generate keys from your Lender Console.</p>
              <code className="block font-mono text-xs bg-black/40 p-3 rounded-lg text-emerald-glow">
                Authorization: Bearer ep_live_••••••••
              </code>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CodeBlock = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="glass-card overflow-hidden mt-4">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{title}</div>
        <Button variant="ghost" size="sm" onClick={copy} className="h-7">
          {copied ? <Check className="h-3 w-3 text-emerald" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      <pre className="p-4 text-xs font-mono overflow-x-auto bg-black/40 text-foreground/90 leading-relaxed">{code}</pre>
    </div>
  );
};

export default Docs;
