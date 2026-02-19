import type { ReactNode, CSSProperties, ElementType } from 'react';

interface StarBorderProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function StarBorder({
  as: Component = 'button',
  children,
  className = '',
  color = 'rgba(0, 200, 180, 0.6)',
  speed = '5s',
  style,
  ...props
}: StarBorderProps) {
  return (
    <Component
      className={`star-border ${className}`}
      style={style}
      {...props}
    >
      <div
        className="star-border__anim star-border__anim--top"
        style={{
          '--star-color': color,
          '--star-speed': speed,
        } as CSSProperties}
      />
      <div
        className="star-border__anim star-border__anim--bottom"
        style={{
          '--star-color': color,
          '--star-speed': speed,
        } as CSSProperties}
      />
      <span className="star-border__content">{children}</span>
    </Component>
  );
}
