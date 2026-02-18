import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo, type ElementType, createElement } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  stepDuration?: number;
  tag?: ElementType;
}

export default function BlurText({
  text,
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  stepDuration = 0.4,
  tag = 'p',
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  const segments = useMemo(() => {
    if (animateBy === 'characters') return text.split('');
    return text.split(/(\s+)/);
  }, [text, animateBy]);

  const yOffset = direction === 'top' ? -20 : 20;

  const Tag = tag;
  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {segments.map((seg, i) => {
        if (/^\s+$/.test(seg)) return <span key={i}>&nbsp;</span>;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(12px)', y: yOffset }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : undefined}
            transition={{
              duration: stepDuration,
              delay: (i * delay) / 1000,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          >
            {seg}
          </motion.span>
        );
      })}
    </Tag>
  );
}
