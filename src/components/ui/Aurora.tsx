import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

const VERTEX = `attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}`;

const FRAGMENT = `precision highp float;
uniform float uTime;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uAmplitude;
uniform float uBlend;
varying vec2 vUv;

vec3 permute(vec3 x) { return mod((x * 34.0 + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                           dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.15;
  float n1 = snoise(uv * 2.0 + vec2(t, t * 0.5)) * uAmplitude;
  float n2 = snoise(uv * 3.0 + vec2(-t * 0.7, t * 0.3)) * uAmplitude;
  float n3 = snoise(uv * 1.5 + vec2(t * 0.4, -t * 0.6)) * uAmplitude * 0.6;
  float mix1 = smoothstep(-0.3, 0.8, n1 + uv.y * 0.5);
  float mix2 = smoothstep(-0.2, 0.9, n2 + (1.0 - uv.y) * 0.3);
  vec3 c1 = mix(uColor0, uColor1, mix1);
  vec3 c2 = mix(c1, uColor2, mix2 * 0.6);
  vec3 finalColor = c2 + n3 * 0.08;
  gl_FragColor = vec4(finalColor, uBlend);
}`;

interface AuroraProps {
  colorStops?: [string, string, string];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
}

export default function Aurora({
  colorStops = ['#0B1628', '#00C8B4', '#0B1628'],
  amplitude = 1.0,
  blend = 0.4,
  speed = 1.0,
  className = '',
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const resize = () => {
      if (!container) return;
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    const geometry = new Triangle(gl);
    const c0 = new Color(colorStops[0]);
    const c1 = new Color(colorStops[1]);
    const c2 = new Color(colorStops[2]);

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uColor0: { value: [c0.r, c0.g, c0.b] },
        uColor1: { value: [c1.r, c1.g, c1.b] },
        uColor2: { value: [c2.r, c2.g, c2.b] },
        uAmplitude: { value: amplitude },
        uBlend: { value: blend },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animId: number;
    const startTime = performance.now();

    const update = () => {
      animId = requestAnimationFrame(update);
      program.uniforms.uTime.value =
        ((performance.now() - startTime) * 0.001) * speed;
      renderer.render({ scene: mesh });
    };
    update();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  );
}
