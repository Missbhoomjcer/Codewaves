import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/passport");
    });
  }, [navigate]);

  const handle = async (mode: "in" | "up") => {
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    setLoading(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/passport" },
        });
        if (error) throw error;
        toast.success("Account created");
      }
      navigate("/passport");
    } catch (e: any) {
      toast.error(e.message ?? "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px]" />

      <Link to="/" className="absolute top-6 left-6 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md relative"
      >
        <div className="text-center mb-6">
          <h1 className="font-display font-bold text-2xl">Access your passport</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in or create your decentralised identity.</p>
        </div>

        <Tabs defaultValue="in">
          <TabsList className="grid grid-cols-2 w-full bg-secondary/50">
            <TabsTrigger value="in">Sign In</TabsTrigger>
            <TabsTrigger value="up">Sign Up</TabsTrigger>
          </TabsList>
          {(["in", "up"] as const).map(m => (
            <TabsContent key={m} value={m} className="space-y-3 mt-4">
              <div>
                <Label htmlFor={`em-${m}`}>Email</Label>
                <Input id={`em-${m}`} type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 bg-secondary/40" />
              </div>
              <div>
                <Label htmlFor={`pw-${m}`}>Password</Label>
                <Input id={`pw-${m}`} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 bg-secondary/40" />
              </div>
              <Button onClick={() => handle(m)} disabled={loading} className="w-full rounded-full bg-gradient-to-r from-primary to-purple-glow h-11">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : m === "in" ? "Sign In" : "Create Account"}
              </Button>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Just exploring? <Link to="/passport" className="text-primary-glow hover:underline">View demo passport</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
