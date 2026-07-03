import { type CSSProperties, type ElementType, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "zoom";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  as?: ElementType;
  disableOnMobile?: boolean;
}

const Reveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 650,
  distance = 26,
  threshold = 0.2,
  once = true,
  as: Component = "div",
  disableOnMobile = true,
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (disableOnMobile && window.matchMedia("(max-width: 767px)").matches) {
      setIsVisible(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const style = {
    ["--reveal-delay" as string]: `${delay}ms`,
    ["--reveal-duration" as string]: `${duration}ms`,
    ["--reveal-distance" as string]: `${distance}px`,
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      style={style}
      className={cn("reveal", `reveal--${direction}`, isVisible && "reveal--visible", className)}
    >
      {children}
    </Component>
  );
};

export default Reveal;
