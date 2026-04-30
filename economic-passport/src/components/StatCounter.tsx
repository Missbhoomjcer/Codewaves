import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export const StatCounter = ({ value, suffix = "", label, prefix = "" }: { value: number; suffix?: string; label: string; prefix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, latest => {
    if (value >= 1_000_000_000) return (latest / 1e9).toFixed(1);
    if (value >= 1_000_000) return Math.round(latest / 1e6).toString();
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (inView) {
      const c = animate(mv, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
      return c.stop;
    }
  }, [inView, mv, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-display font-bold text-4xl md:text-5xl tracking-tight">
        {prefix}<motion.span>{rounded}</motion.span>{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2 font-mono">{label}</div>
    </motion.div>
  );
};
