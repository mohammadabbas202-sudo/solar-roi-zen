import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({ value, prefix = "", suffix = "", duration = 0.9, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (!inView && display === 0) return;
    const controls = animate(fromRef.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => {
      fromRef.current = value;
      controls.stop();
    };
  }, [value, inView, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(display).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
