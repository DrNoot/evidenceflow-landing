import { useState, useEffect, useRef, type ReactNode } from 'react';
import Aurora from './components/ui/Aurora';
import BlurText from './components/ui/BlurText';
import SpotlightCard from './components/ui/SpotlightCard';
import StarBorder from './components/ui/StarBorder';
import FadeIn from './components/ui/FadeIn';

/* ====== LINKS ====== */
const LINKS = {
  freeTrial: 'https://dastray.gumroad.com/l/zltdxi',
  membership: 'https://dastray.gumroad.com/l/gajuaj',
  reloadPacks: 'https://dastray.gumroad.com/l/ytrgjp',
  guo2024: 'https://doi.org/10.1186/s13643-024-02575-4',
  kellermeyer2024: 'https://doi.org/10.1002/jrsm.1691',
  contact: 'mailto:ogrivenmain@gmail.com',
};

/* ====== NAV ====== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    ['How It Works', '#how-it-works'],
    ['Features', '#features'],
    ['Evidence', '#benchmarks'],
    ['Pricing', '#pricing'],
    ['FAQ', '#faq'],
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-navy)]/90 backdrop-blur-xl border-b border-[rgba(240,237,230,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <span className="w-8 h-8 rounded-lg bg-[var(--color-teal)] flex items-center justify-center text-[var(--color-navy)] font-bold text-sm font-[var(--font-body)]">
            EF
          </span>
          <span className="text-[var(--color-cream)] font-semibold text-lg tracking-tight font-[var(--font-body)]">
            EvidenceFlow
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[var(--color-cream-muted)] text-sm no-underline hover:text-[var(--color-cream)] transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={LINKS.freeTrial}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[var(--color-teal)] text-[var(--color-navy)] text-sm font-semibold no-underline hover:bg-[var(--color-teal-light)] transition-colors"
          >
            Start Free
          </a>
        </div>

        <button
          className="md:hidden bg-transparent border-none text-[var(--color-cream)] p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[var(--color-navy)]/95 backdrop-blur-xl border-t border-[rgba(240,237,230,0.06)] px-6 py-4 flex flex-col gap-3">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[var(--color-cream-muted)] text-base no-underline py-2"
            >
              {label}
            </a>
          ))}
          <a
            href={LINKS.freeTrial}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2.5 rounded-lg bg-[var(--color-teal)] text-[var(--color-navy)] text-sm font-semibold no-underline text-center"
          >
            Start Free
          </a>
        </div>
      )}
    </nav>
  );
}

/* ====== HERO ====== */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <Aurora
        colorStops={['#060D18', '#00C8B4', '#0B1628']}
        amplitude={0.8}
        blend={0.25}
        speed={0.6}
        className="opacity-60"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-12">
          <div className="section-label mb-6">AI-Powered Systematic Review Screening</div>

          <BlurText
            text="10,000 papers."
            delay={80}
            stepDuration={0.5}
            className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-[var(--color-cream)] mb-2 justify-center"
            tag="h1"
          />
          <BlurText
            text="One afternoon."
            delay={80}
            stepDuration={0.5}
            className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-[var(--color-teal)] italic justify-center"
            tag="h1"
          />

          <FadeIn delay={0.8} duration={0.9}>
            <p className="mt-8 max-w-2xl mx-auto text-[var(--color-cream-muted)] text-lg leading-relaxed">
              AI screens your title-abstract queue against your inclusion criteria in minutes, not months.
              Published research demonstrates{' '}
              <a href={LINKS.guo2024} target="_blank" rel="noopener noreferrer" className="text-[var(--color-teal)] no-underline border-b border-[var(--color-teal)]/30 hover:border-[var(--color-teal)]">
                99.5% sensitivity
              </a>.
              Full PRISMA-compliant audit trails. Get to publication faster.
            </p>
          </FadeIn>

          <FadeIn delay={1.1} duration={0.7}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <StarBorder
                as="a"
                href={LINKS.freeTrial}
                target="_blank"
                rel="noopener noreferrer"
                color="rgba(0, 200, 180, 0.5)"
                speed="4s"
              >
                Screen 100 Papers Free
              </StarBorder>
              <a
                href="#how-it-works"
                className="px-6 py-3.5 rounded-xl border border-[rgba(240,237,230,0.12)] text-[var(--color-cream)] text-base no-underline hover:border-[rgba(240,237,230,0.25)] transition-colors"
              >
                See How It Works
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Terminal Demo */}
        <FadeIn delay={1.4} duration={0.8} blur>
          <div className="terminal max-w-2xl mx-auto">
            <div className="terminal-bar">
              <span className="terminal-dot" style={{ background: '#ff5f57' }} />
              <span className="terminal-dot" style={{ background: '#febc2e' }} />
              <span className="terminal-dot" style={{ background: '#28c840' }} />
            </div>
            <div className="terminal-body">
              <div><span className="prompt">$</span> <span className="cmd">evidenceflow --protocol review.json</span></div>
              <div>Loading protocol... 14 inclusion criteria found</div>
              <div>Connected to Covidence review</div>
              <div>Screening batch 1/60... <span className="highlight">100 papers analyzed</span></div>
              <div>Screening batch 2/60... <span className="highlight">100 papers analyzed</span></div>
              <div style={{ opacity: 0.4 }}>...</div>
              <div><span className="highlight">Done. 6,000 papers screened in 58m 14s</span></div>
              <div>Yes: <span className="highlight">412</span> | No: 5,396 | Maybe: 192</div>
              <div>Audit log saved to screening_results.json</div>
            </div>
          </div>
        </FadeIn>

        {/* Floating stats */}
        <FadeIn delay={1.7} duration={0.6}>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              ['240x', 'Faster than manual'],
              ['99.5%', 'Sensitivity (recall)'],
              ['$49', 'Per month, 5,000 papers'],
            ].map(([num, label]) => (
              <div
                key={num}
                className="px-6 py-4 rounded-xl bg-[rgba(240,237,230,0.04)] border border-[rgba(240,237,230,0.06)] text-center"
              >
                <div className="text-2xl font-semibold text-[var(--color-teal)] font-[var(--font-mono)]">{num}</div>
                <div className="text-sm text-[var(--color-cream-muted)] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ====== PROBLEM / SOLUTION ====== */
function Problem() {
  const painPoints = [
    '25 papers per hour. A 5,000-paper search takes weeks of full-time screening work.',
    'Your publication timeline stalls while you wait on teammates or wade through abstracts.',
    'Fatigue-induced errors compound after hour three. Relevant studies silently get excluded.',
    'No systematic audit trail. Reviewers cannot recall their reasoning months later at peer review.',
  ];
  const solutions = [
    '6,000+ papers per hour. Your entire search screened before lunch.',
    'Affordable for students and early-career researchers. One subscription covers your entire review.',
    'Published research shows 99.5% sensitivity, higher than fatigued human reviewers at 3 AM.',
    'Every decision logged with full AI reasoning and confidence scores. PRISMA-ready from day one.',
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-label">The Problem</div>
            <h2 className="section-heading">
              Title-abstract screening is the bottleneck of every <em>systematic review.</em>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-[rgba(255,90,90,0.04)] border border-[rgba(255,90,90,0.1)] p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-red-400 font-[var(--font-mono)] text-xs uppercase tracking-widest">Without EvidenceFlow</span>
              </div>
              <ul className="space-y-4 list-none p-0 m-0">
                {painPoints.map((p, i) => (
                  <li key={i} className="text-[var(--color-cream-muted)] text-[0.9375rem] leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-400/40">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="rounded-2xl bg-[var(--color-teal-glow)] border border-[rgba(0,200,180,0.15)] p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--color-teal)]" />
                <span className="text-[var(--color-teal)] font-[var(--font-mono)] text-xs uppercase tracking-widest">With EvidenceFlow</span>
              </div>
              <ul className="space-y-4 list-none p-0 m-0">
                {solutions.map((s, i) => (
                  <li key={i} className="text-[var(--color-cream-muted)] text-[0.9375rem] leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--color-teal)]/60">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ====== HOW IT WORKS ====== */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Define Your Protocol',
      desc: 'Specify your PICOS framework, inclusion/exclusion criteria, and screening rules in a structured JSON template. The AI learns exactly what your review requires.',
    },
    {
      num: '02',
      title: 'Connect to Covidence',
      desc: 'EvidenceFlow integrates directly with your Covidence review. It reads titles, abstracts, and metadata from your existing workflow. No CSV exports needed.',
    },
    {
      num: '03',
      title: 'AI Screens & Votes',
      desc: 'Advanced AI evaluates each paper against your criteria with a tiered approach: rapid first-pass screening, then deeper analysis for uncertain cases. Every decision is logged with full reasoning.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-label">How It Works</div>
            <h2 className="section-heading">Three steps. <em>Minutes,</em> not months.</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.15}>
              <SpotlightCard className="p-8 h-full">
                <div className="text-5xl font-[var(--font-display)] text-[var(--color-teal)]/20 mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold text-[var(--color-cream)] mb-3 font-[var(--font-body)]">{step.title}</h3>
                <p className="text-[var(--color-cream-muted)] text-[0.9375rem] leading-relaxed m-0">{step.desc}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== FEATURES ====== */
function Features() {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="m9 15 2 2 4-4" />
        </svg>
      ),
      title: 'Native Covidence Integration',
      desc: 'Connects directly to your Covidence review via browser automation. No CSV exports, no copy-pasting. Votes appear in Covidence exactly as if a human reviewer submitted them.',
      tag: 'Zero-friction workflow',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      title: 'Tiered AI Engine',
      desc: 'A fast first-pass model handles high-volume screening at scale. Edge cases and uncertain papers get escalated to a deeper analytical model for a second evaluation.',
      tag: 'Tiered intelligence',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
      title: 'PRISMA-Compliant Audit Trails',
      desc: "Every screening decision is logged with the AI's full reasoning, confidence score, and criteria evaluation. Export-ready for your PRISMA flow diagram and methods section.",
      tag: 'Publication-ready',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      ),
      title: 'Your Protocol, Your Rules',
      desc: 'Define screening criteria using a structured JSON protocol template. PICOS framework, study type filters, date ranges, language requirements. The AI follows your methodological decisions exactly.',
      tag: 'Fully configurable',
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-label">Features</div>
            <h2 className="section-heading">Built for the rigor your review <em>demands.</em></h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <SpotlightCard className="p-8 h-full">
                <div className="mb-4">{f.icon}</div>
                <div className="font-[var(--font-mono)] text-xs text-[var(--color-teal)]/70 uppercase tracking-widest mb-3">{f.tag}</div>
                <h3 className="text-lg font-semibold text-[var(--color-cream)] mb-3 font-[var(--font-body)]">{f.title}</h3>
                <p className="text-[var(--color-cream-muted)] text-[0.9375rem] leading-relaxed m-0">{f.desc}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== BENCHMARKS ====== */
function Benchmarks() {
  const rows = [
    { metric: 'Screening Speed', ai: '6,000+ papers/hr', manual: '~25 papers/hr', winner: '240x faster' },
    { metric: 'Sensitivity (Recall)', ai: '99.5%', manual: '~92-95%', winner: 'Fewer missed' },
    { metric: 'Cost per Review', ai: 'From $49/mo', manual: '$2,000-4,000+', winner: 'Save thousands' },
    { metric: 'Fatigue Degradation', ai: 'None', manual: 'Significant after 2-3hrs', winner: 'Consistent' },
    { metric: 'Audit Trail', ai: 'Full reasoning per paper', manual: 'Rarely documented', winner: 'Transparent' },
    { metric: 'Availability', ai: '24/7, instant', manual: 'Working hours only', winner: 'Always on' },
  ];

  return (
    <section id="benchmarks" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="section-label">Evidence</div>
            <h2 className="section-heading">How AI screening compares to <em>manual review.</em></h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(240,237,230,0.06)]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--color-navy-light)]">
                  <th className="text-left p-4 font-semibold text-[var(--color-cream-muted)] font-[var(--font-body)]">Metric</th>
                  <th className="text-left p-4 font-semibold text-[var(--color-teal)] font-[var(--font-body)]">AI-Assisted</th>
                  <th className="text-left p-4 font-semibold text-[var(--color-cream-muted)] font-[var(--font-body)]">Manual Review</th>
                  <th className="text-left p-4 font-semibold text-[var(--color-cream-muted)] font-[var(--font-body)]">Advantage</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.metric} className={i % 2 === 0 ? 'bg-[rgba(240,237,230,0.02)]' : ''}>
                    <td className="p-4 text-[var(--color-cream)] font-medium">{r.metric}</td>
                    <td className="p-4 text-[var(--color-teal)] font-[var(--font-mono)] text-xs">{r.ai}</td>
                    <td className="p-4 text-[var(--color-cream-muted)]">{r.manual}</td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-[var(--color-teal)]/10 text-[var(--color-teal)] text-xs font-medium">
                        {r.winner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-[var(--color-cream-muted)]/60 mt-6 max-w-2xl mx-auto leading-relaxed">
            Sensitivity and human reviewer performance figures are based on published systematic review methodology research, including{' '}
            <a href={LINKS.guo2024} target="_blank" rel="noopener noreferrer" className="text-[var(--color-cream-muted)] underline">Guo et al. (2024)</a> and{' '}
            <a href={LINKS.kellermeyer2024} target="_blank" rel="noopener noreferrer" className="text-[var(--color-cream-muted)] underline">Kellermeyer et al. (2024)</a>.
            Individual results may vary by review topic and protocol specificity.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ====== PRICING ====== */
function Pricing() {
  const tiers = [
    {
      name: 'Free Trial',
      price: '$0',
      period: 'no credit card',
      desc: 'Test on 100 papers from your review. See the quality of AI screening decisions before you commit.',
      features: ['100 papers included', 'Full Covidence integration', 'Tiered AI screening', 'Complete audit trail'],
      cta: 'Start Free Trial',
      href: LINKS.freeTrial,
      highlighted: false,
    },
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      desc: 'Covers most systematic reviews. 3,000 to 5,000 papers is typical. One subscription, one complete review.',
      features: ['5,000 papers/month', 'Full Covidence integration', 'Tiered AI screening', 'PRISMA-compliant exports', 'Email support'],
      cta: 'Start Screening',
      href: LINKS.membership,
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$149',
      period: '/month',
      desc: 'Multiple concurrent reviews or umbrella reviews with 10,000+ papers. Built for high-volume research labs.',
      features: ['50,000 papers/month', 'Everything in Starter', 'Priority AI escalation', 'Priority support', 'Reload packs available'],
      cta: 'Go Pro',
      href: LINKS.membership,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-4">
            <div className="section-label">Pricing</div>
            <h2 className="section-heading">Get to publication <em>faster.</em></h2>
            <p className="text-[var(--color-cream-muted)] max-w-xl mx-auto">
              Finish your screening in an afternoon instead of weeks. Affordable plans for students and research teams. Free trial, no credit card required.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  tier.highlighted
                    ? 'bg-[var(--color-navy-light)] border-2 border-[var(--color-teal)]/30 relative'
                    : 'bg-[var(--color-navy-light)] border border-[rgba(240,237,230,0.06)]'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-teal)] text-[var(--color-navy)] text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[var(--color-cream)] font-[var(--font-body)]">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-[var(--color-cream)] font-[var(--font-display)]">{tier.price}</span>
                    <span className="text-sm text-[var(--color-cream-muted)]">{tier.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-[var(--color-cream-muted)] leading-relaxed">{tier.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1 list-none p-0 m-0">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-cream-muted)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.highlighted ? (
                  <StarBorder
                    as="a"
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="rgba(0, 200, 180, 0.5)"
                    speed="4s"
                    className="w-full"
                    style={{ display: 'flex' }}
                  >
                    {tier.cta}
                  </StarBorder>
                ) : (
                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3.5 rounded-xl border border-[rgba(240,237,230,0.12)] text-[var(--color-cream)] text-sm font-medium no-underline hover:border-[var(--color-teal)]/30 transition-colors"
                  >
                    {tier.cta}
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-sm text-[var(--color-cream-muted)] mt-8">
            Need more papers mid-cycle?{' '}
            <a href={LINKS.reloadPacks} target="_blank" rel="noopener noreferrer" className="text-[var(--color-teal)] no-underline border-b border-[var(--color-teal)]/30 hover:border-[var(--color-teal)]">
              Reload Packs
            </a>{' '}
            are available for active subscribers.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ====== FAQ ====== */
function FAQItem({ question, children }: { question: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{question}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <div>
          <div className="faq-answer-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="section-label">FAQ</div>
            <h2 className="section-heading">Common questions from <em>researchers.</em></h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div>
            <FAQItem question="Can I really trust AI for something this important?">
              <p>This is the right question to ask. EvidenceFlow is built as a <strong>second reviewer</strong>, not a replacement for your own judgment. You remain the primary screener. The AI acts as Reviewer #2.</p>
              <p>The system is calibrated to <strong>err on the side of inclusion</strong>. When the AI is uncertain, it includes rather than excludes. Published research reports sensitivity of 99.5%, exceeding the 92-95% typically observed in manual screening after reviewer fatigue sets in.</p>
              <p>We recommend validating on a batch of papers you have already screened manually. Compare the AI's decisions with yours. If agreement is high (most teams see 95%+ concordance), proceed with confidence.</p>
            </FAQItem>

            <FAQItem question="Where does the 99.5% sensitivity figure come from?">
              <p>This figure comes from published academic research on LLM-assisted systematic review screening, not from marketing claims. Multiple studies have evaluated large language models for title-abstract screening and reported sensitivity at or above 99% when configured to prioritize recall over precision.</p>
              <p>Your actual results will depend on the clarity of your inclusion criteria and the domain of your review. We strongly recommend running a validation batch before relying on AI screening for your full review.</p>
            </FAQItem>

            <FAQItem question="How do I report this in my methods section?">
              <p>EvidenceFlow generates a complete audit trail for every screening decision. A suggested approach for your methods section:</p>
              <p style={{ fontStyle: 'italic', opacity: 0.8 }}>"Title and abstract screening was performed independently by [Reviewer 1] and an AI-assisted screening tool (EvidenceFlow) using [model name]. The AI reviewer was configured with pre-specified inclusion and exclusion criteria based on PICOS framework. Conflicts were resolved by [process]."</p>
              <p>The PRISMA-compliant export provides all the data you need for your flow diagram and supplementary materials.</p>
            </FAQItem>

            <FAQItem question="Does it work with Covidence?">
              <p>Yes. EvidenceFlow integrates natively with Covidence through browser automation. It reads your imported references directly from Covidence and submits screening votes exactly as a human reviewer would. Your existing Covidence workflow remains completely intact.</p>
            </FAQItem>

            <FAQItem question="What happens with papers the AI is unsure about?">
              <p>Papers that do not clearly meet or fail your criteria are marked as "Maybe" and are never automatically excluded. With the optional escalation feature, Maybe papers are forwarded to a deeper analytical AI model for a second evaluation. Papers remaining uncertain after both passes are flagged for your manual review.</p>
              <p>The core principle: <strong>when in doubt, include.</strong> This is the same conservative approach recommended by Cochrane methodology guidelines.</p>
            </FAQItem>

            <FAQItem question="How does the subscription pricing work?">
              <p>The <strong>Free Trial</strong> includes 100 papers at no cost with no credit card required. The <strong>Starter plan</strong> ($49/month) includes 5,000 papers per month, sufficient for most individual reviews. The <strong>Pro plan</strong> ($149/month) includes 50,000 papers per month for labs running multiple concurrent reviews.</p>
              <p>If you run out of papers mid-month, <a href={LINKS.reloadPacks} target="_blank" rel="noopener noreferrer" className="text-[var(--color-teal)] no-underline border-b border-[var(--color-teal)]/30">Reload Packs</a> are available. You can cancel at any time.</p>
            </FAQItem>

            <FAQItem question="Is my review data secure?">
              <p>EvidenceFlow runs locally on your machine. Paper titles and abstracts are sent to AI APIs for screening decisions, but no data is stored on external servers beyond standard API processing. Your API keys are stored locally in a private environment file (.env) and are never transmitted to any third party.</p>
            </FAQItem>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ====== BOTTOM CTA ====== */
function BottomCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Aurora
        colorStops={['#060D18', '#009E8E', '#060D18']}
        amplitude={0.6}
        blend={0.15}
        speed={0.4}
        className="opacity-50"
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-tight text-[var(--color-cream)] mb-4">
            Your papers are waiting.<br />
            <span className="text-[var(--color-teal)] italic">Screen them today.</span>
          </h2>
          <p className="text-[var(--color-cream-muted)] mb-8">
            100 papers free. No credit card. Full audit trail included.
          </p>
          <StarBorder
            as="a"
            href={LINKS.freeTrial}
            target="_blank"
            rel="noopener noreferrer"
            color="rgba(0, 200, 180, 0.5)"
            speed="4s"
          >
            Screen 100 Papers Free
          </StarBorder>
        </FadeIn>
      </div>
    </section>
  );
}

/* ====== FOOTER ====== */
function Footer() {
  return (
    <footer className="border-t border-[rgba(240,237,230,0.06)] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-[var(--color-teal)] flex items-center justify-center text-[var(--color-navy)] font-bold text-[10px]">EF</span>
          <span className="text-sm text-[var(--color-cream-muted)]">EvidenceFlow</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[var(--color-cream-muted)]">
          <a href={LINKS.contact} className="no-underline text-[var(--color-cream-muted)] hover:text-[var(--color-cream)] transition-colors">Contact</a>
          <a href={LINKS.freeTrial} target="_blank" rel="noopener noreferrer" className="no-underline text-[var(--color-cream-muted)] hover:text-[var(--color-cream)] transition-colors">Gumroad</a>
          <a href="#pricing" className="no-underline text-[var(--color-cream-muted)] hover:text-[var(--color-cream)] transition-colors">Pricing</a>
        </div>
        <span className="text-xs text-[var(--color-cream-muted)]/50">&copy; 2026 EvidenceFlow. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ====== APP ====== */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="glass-divider" />
      <Problem />
      <div className="glass-divider" />
      <HowItWorks />
      <div className="glass-divider" />
      <Features />
      <div className="glass-divider" />
      <Benchmarks />
      <div className="glass-divider" />
      <Pricing />
      <div className="glass-divider" />
      <FAQ />
      <div className="glass-divider" />
      <BottomCTA />
      <Footer />
    </>
  );
}
