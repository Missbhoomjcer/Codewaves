import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe2, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/passport", label: "Passport" },
  { to: "/lender", label: "Lenders" },
  { to: "/verify", label: "ZK Verify" },
  { to: "/docs", label: "API Docs" },
];

export const AppNav = () => {
  const location = useLocation();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="glass border-b border-border/50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-glow flex items-center justify-center glow-purple"
            >
              <Globe2 className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base tracking-tight">Economic Passport</div>
              <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">decentralised · verified</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-secondary -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(d => !d)}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {location.pathname !== "/onboarding" && (
              <Button asChild variant="default" size="sm" className="rounded-full bg-gradient-to-r from-primary to-purple-glow hover:opacity-90 transition-opacity">
                <Link to="/onboarding">Get Passport</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
