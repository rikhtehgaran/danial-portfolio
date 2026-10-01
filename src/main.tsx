import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowUpRight,
  TrendingUp,
  Bot,
  Terminal,
  Brain,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  Linkedin,
  Send,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Download,
  Copy,
  Check,
  X,
  MapPin,
  Briefcase,
  Users,
} from 'lucide-react'
import './index.css'

type FadeInProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: React.ElementType
}

const ease = [0.25, 0.1, 0.25, 1] as const

function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
}: FadeInProps) {
  const MotionComponent = useMemo(() => motion.create(as), [as])

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </MotionComponent>
  )
}

function ContactButton({ text = 'Contact Me', href = '#contact' }: { text?: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex rounded-full outline outline-2 outline-white outline-offset-[-3px] transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <span
        className="flex items-center gap-2 rounded-full bg-[linear-gradient(123deg,#18011F_7%,#B600A8_37%,#7621B0_72%,#BE4C00_100%)] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-[0px_4px_4px_rgba(181,1,167,0.25),4px_4px_12px_#7721B1_inset] transition-transform duration-200 sm:px-10 sm:py-3.5 sm:text-sm md:px-11 md:py-4 md:text-sm"
      >
        <Sparkles size={16} className="text-amber-300" />
        {text}
      </span>
    </a>
  )
}

function SecondaryButton({ text, href, icon: Icon }: { text: string; href: string; icon?: React.ElementType }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-white/5 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-white/10 sm:px-7 sm:py-3 sm:text-sm"
    >
      {Icon && <Icon size={16} />}
      {text}
      <ArrowUpRight size={14} className="opacity-70" />
    </a>
  )
}

function Magnet({
  children,
  className,
  padding = 150,
  strength = 3.5,
  activeTransition = 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
  inactiveTransition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
}: {
  children: React.ReactNode
  className?: string
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [transform, setTransform] = useState('translate3d(0, 0, 0)')
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = event.clientX - centerX
      const distanceY = event.clientY - centerY
      const maxX = rect.width / 2 + padding
      const maxY = rect.height / 2 + padding

      if (Math.abs(distanceX) <= maxX && Math.abs(distanceY) <= maxY) {
        setActive(true)
        setTransform(`translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0)`)
      } else {
        setActive(false)
        setTransform('translate3d(0, 0, 0)')
      }
    }

    const handleLeave = () => {
      setActive(false)
      setTransform('translate3d(0, 0, 0)')
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('blur', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('blur', handleLeave)
    }
  }, [padding, strength])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

function HeroSection() {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Startups', href: '#startups' },
    { label: 'Honors', href: '#honors' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <section className="relative flex min-h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[130px]">
        <div className="h-[420px] w-[540px] rounded-full bg-gradient-to-tr from-[#7621B0] via-[#B600A8] to-[#BE4C00]" />
      </div>

      {/* Top Navigation */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="z-30 flex items-center justify-between px-5 pt-6 sm:px-8 md:px-12 md:pt-8"
      >
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#B600A8] to-[#7621B0] font-black text-white shadow-lg shadow-purple-900/30">
            DR
          </div>
          <div className="hidden sm:block">
            <span className="block text-sm font-bold tracking-wider text-white">DANIAL RIKHTEH GARAN</span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Available for Algo Trading & Consulting
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/80 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/danialrikhtehgaran"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#D7E2EA] transition-all duration-200 hover:border-white hover:bg-white/15"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://t.me/d_rikhtehgaran"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#D7E2EA] transition-all duration-200 hover:border-white hover:bg-white/15"
          >
            <Send size={18} />
          </a>
        </div>
      </FadeIn>

      {/* Main Hero Giant Heading */}
      <div className="overflow-hidden px-4 pt-8 sm:pt-6 md:-mt-2">
        <FadeIn delay={0.1} y={20} className="mb-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-purple-200 backdrop-blur-md shadow-lg shadow-purple-950/30">
            <Sparkles size={13} className="text-amber-400" />
            Algorithmic Trading Developer &bull; Senior Full-Stack Architect
          </span>
        </FadeIn>
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading heading-kanit w-full text-center whitespace-nowrap text-[9vw] font-black uppercase leading-none tracking-tight sm:text-[9.5vw] md:text-[10vw] lg:text-[10.5vw]"
        >
          Hi, i&apos;m danial
        </FadeIn>
      </div>

      {/* Hero Centerpiece: Danial's Portrait with Magnetic Interaction */}
      <div className="pointer-events-none absolute left-1/2 bottom-6 z-10 -translate-x-1/2 sm:bottom-0">
        <Magnet className="pointer-events-auto w-[260px] sm:w-[330px] md:w-[380px] lg:w-[430px]">
          <FadeIn delay={0.35} y={30} className="relative flex w-full flex-col items-center">
            {/* Ambient Purple/Orange Backlight Halo */}
            <div className="absolute inset-0 -top-8 rounded-full bg-gradient-to-t from-[#B600A8]/45 via-[#7621B0]/25 to-[#BE4C00]/20 blur-3xl" />

            {/* Portrait Container with Sleek Neon Border Glow */}
            <div className="relative group w-full flex justify-center">
              {/* Soft Ambient Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#18011F] via-[#B600A8] to-[#BE4C00] opacity-80 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative overflow-hidden rounded-full border-2 border-white/40 p-1.5 bg-black/60 shadow-[0_12px_45px_rgba(182,0,168,0.4)]">
                <img
                  src="/danial-photo.png"
                  alt="Danial Rikhteh Garan"
                  className="h-auto w-[240px] sm:w-[310px] md:w-[360px] lg:w-[410px] rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Floating Info Pill 1: Trading Bots */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -left-6 top-1/4 hidden rounded-2xl border border-white/15 bg-black/85 px-3.5 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl sm:flex sm:items-center sm:gap-2.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <TrendingUp size={15} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Specialty</p>
                  <p className="text-xs font-bold text-white">Algorithmic Trading</p>
                </div>
              </motion.div>

              {/* Floating Info Pill 2: Systems & Linux */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -right-6 bottom-1/4 hidden rounded-2xl border border-white/15 bg-black/85 px-3.5 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl sm:flex sm:items-center sm:gap-2.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                  <Terminal size={15} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Experience</p>
                  <p className="text-xs font-bold text-white">Linux & Web 14+ Yrs</p>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </Magnet>
      </div>

      {/* Hero Bottom Bar */}
      <div className="mt-auto flex flex-col gap-6 px-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-10 md:px-12 md:pb-12">
        <FadeIn
          delay={0.35}
          y={20}
          className="max-w-[340px] text-xs font-normal uppercase leading-relaxed tracking-wider text-[#D7E2EA]/90 sm:max-w-[320px] sm:text-xs md:max-w-[380px] md:text-sm"
        >
          Turning complex trading strategies into intelligent bots & building resilient cloud platforms driven by 14+ years of software architecture.
        </FadeIn>
        
        <FadeIn delay={0.5} y={20} className="relative z-20 flex flex-wrap items-center gap-3">
          <ContactButton text="Connect With Me" href="#contact" />
          <SecondaryButton text="Resume PDF" href="/Danial-Rikhteh-Garan-Resume.pdf" icon={Download} />
        </FadeIn>
      </div>
    </section>
  )
}

const marqueeSkills = [
  { label: 'Algorithmic Trading Bots', icon: TrendingUp, tag: 'FinTech' },
  { label: 'Quantitative Strategy Automation', icon: Bot, tag: 'Trading' },
  { label: 'Linux Administrator (11+ Yrs)', icon: Terminal, tag: 'DevOps' },
  { label: 'Bash Scripting & Automation (10+ Yrs)', icon: Code2, tag: 'Kernel' },
  { label: 'PHP & Symfony Architecture (14+ Yrs)', icon: Layers, tag: 'Backend' },
  { label: 'Python & Django Development', icon: Code2, tag: 'FullStack' },
  { label: 'Transactional Analysis (TA) & Mindset', icon: Brain, tag: 'Psychology' },
  { label: 'Founder & CEO @ Ericom Software Group', icon: Briefcase, tag: 'Leadership' },
  { label: 'Cybersecurity & Server Hardening', icon: ShieldCheck, tag: 'Security' },
  { label: 'Financial Market Risk Modeling', icon: TrendingUp, tag: 'Quant' },
]

const marqueeProjects = [
  { label: 'Arta AI Smart Educational Platform', icon: Sparkles, tag: 'AI SaaS' },
  { label: 'VakilAfzar Cloud Legal Suite', icon: ShieldCheck, tag: 'LegalTech' },
  { label: 'NobatZan Automated Telegram Bot', icon: Calendar, tag: 'Automation' },
  { label: 'Dornash Specialized Educational Network', icon: Users, tag: 'EdTech' },
  { label: 'Parsi Mint Linux National Distribution', icon: Terminal, tag: 'OS Distro' },
  { label: 'Isfahan Multimedia Interactive 3D', icon: Layers, tag: 'Cultural 3D' },
  { label: 'Iran 1st Bulk Email Marketing Engine', icon: Mail, tag: 'Pioneer' },
  { label: 'Astan Quds Virtual Pilgrimage Award', icon: Award, tag: 'Honor' },
  { label: 'National Open-Source Conference Speaker', icon: BookOpen, tag: 'Speaker' },
  { label: 'MSc Counseling & Behavioral Research', icon: Brain, tag: 'Academic' },
]

function MarqueeRow({
  items,
  direction,
}: {
  items: typeof marqueeSkills
  direction: 'right' | 'left'
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(200)

  useEffect(() => {
    const updateOffset = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const next = (window.scrollY - sectionTop + window.innerHeight) * 0.25
      setOffset(next)
    }

    updateOffset()
    window.addEventListener('scroll', updateOffset, { passive: true })
    window.addEventListener('resize', updateOffset)

    return () => {
      window.removeEventListener('scroll', updateOffset)
      window.removeEventListener('resize', updateOffset)
    }
  }, [])

  const repeated = [...items, ...items, ...items]
  const x = direction === 'right' ? offset - 150 : -(offset - 150)

  return (
    <div ref={sectionRef} className="overflow-hidden py-2">
      <div
        className="flex w-max gap-4"
        style={{
          transform: `translate3d(${x}px, 0, 0)`,
          willChange: 'transform',
        }}
      >
        {repeated.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-3.5 rounded-full border border-white/10 bg-[#141414] px-6 py-3 text-sm font-medium text-[#D7E2EA] shadow-md transition-colors hover:border-purple-500/50 hover:bg-[#1a1a1a]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 text-purple-300">
                <Icon size={14} />
              </span>
              <span className="whitespace-nowrap font-medium tracking-wide">{item.label}</span>
              <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                {item.tag}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MarqueeSection() {
  return (
    <section className="border-y border-white/5 bg-[#0C0C0C] py-16 sm:py-20 md:py-24">
      <div className="flex flex-col gap-3">
        <MarqueeRow items={marqueeSkills} direction="right" />
        <MarqueeRow items={marqueeProjects} direction="left" />
      </div>
    </section>
  )
}

function AnimatedChar({
  char,
  progress,
  index,
  total,
}: {
  char: string
  progress: MotionValue<number>
  index: number
  total: number
}) {
  const start = index / total
  const end = Math.min(1, start + 0.16)
  const opacity = useTransform(progress, [start, end], [0.18, 1])
  const visibleChar = char === ' ' ? '\u00A0' : char

  return (
    <span className="relative inline-block">
      <span className="invisible">{visibleChar}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {visibleChar}
      </motion.span>
    </span>
  )
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.25'],
  })

  const characters = Array.from(text)

  return (
    <p
      ref={ref}
      className="max-w-[760px] text-center text-[clamp(1.1rem,2.2vw,1.6rem)] font-medium leading-relaxed text-[#D7E2EA]"
    >
      {characters.map((char, index) => (
        <AnimatedChar
          key={`${char}-${index}`}
          char={char}
          progress={scrollYProgress}
          index={index}
          total={characters.length}
        />
      ))}
    </p>
  )
}

function AboutSection() {
  const stats = [
    { number: '14+', label: 'Years Experience', desc: 'Software & Web Architecture' },
    { number: '11+', label: 'Years Linux Admin', desc: 'Enterprise Systems & Bash' },
    { number: '6+', label: 'Startups Engineered', desc: 'From Concept to Product' },
    { number: 'MSc', label: 'Counseling Psychology', desc: 'TA, CBT & Market Mindset' },
  ]

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-12 md:py-32"
    >
      {/* Decorative ambient elements */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-purple-900/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-amber-900/15 blur-[100px]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading heading-kanit text-[clamp(3rem,11vw,140px)] font-black uppercase leading-none tracking-tight"
        >
          About Danial
        </FadeIn>

        <AnimatedText text="Merging 14+ years of software architecture and 11+ years of Linux server engineering with an MSc in Counseling Psychology (TA & CBT), I architect intelligent algorithmic trading bots, automated platforms, and scalable digital ventures. As founder and CEO of Ericom Software Group, I build systems engineered for mathematical edge and relentless execution." />

        {/* 4 Stat Cards */}
        <div className="grid w-full grid-cols-2 gap-4 pt-6 sm:grid-cols-4 sm:gap-6 md:pt-8">
          {stats.map((stat, index) => (
            <FadeIn
              key={stat.label}
              delay={0.15 + index * 0.1}
              y={20}
              className="glass-card flex flex-col items-center rounded-3xl p-6 text-center"
            >
              <span className="hero-heading heading-kanit text-4xl font-black sm:text-5xl md:text-6xl">
                {stat.number}
              </span>
              <span className="mt-2 text-sm font-semibold tracking-wide text-white">{stat.label}</span>
              <span className="mt-1 text-xs text-zinc-400">{stat.desc}</span>
            </FadeIn>
          ))}
        </div>

        {/* Education & Founder Badge */}
        <FadeIn
          delay={0.4}
          y={20}
          className="glass-panel flex flex-col items-center justify-between gap-4 rounded-2xl p-6 text-left sm:flex-row sm:gap-8 w-full"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
              <Brain size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Dual Foundation: Engineering + Human Cognition</h4>
              <p className="text-xs text-zinc-400">
                BSc in Computer Hardware Engineering (MAU) &bull; MSc in Counseling Psychology (Thesis on Transactional Analysis TA)
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-3">
            <SecondaryButton text="View Credentials" href="#honors" />
            <ContactButton text="Get in Touch" href="#contact" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const services = [
  {
    number: '01',
    name: 'Algorithmic Trading & Bot Development',
    description:
      'Engineering high-precision automated trading robots, custom strategy execution engines, and multi-asset API connectors across Crypto, Forex, and Tehran Stock Exchange. Features automated risk mitigation, drawdown controls, and quantitative backtesting.',
    skills: ['Python', 'C#', 'TradingView / PineScript', 'MetaTrader APIs', 'Quantitative Strategy', 'Risk Management'],
  },
  {
    number: '02',
    name: 'Full-Stack Software Architecture',
    description:
      '14+ years designing scalable web architectures using PHP (Symfony, CodeIgniter), Python (Django), Modern JavaScript/TypeScript, and high-performance databases (MySQL, SQLite). Built for high concurrent traffic and mission-critical reliability.',
    skills: ['PHP', 'Symfony', 'Python', 'Django', 'React / TypeScript', 'MySQL', 'RESTful APIs'],
  },
  {
    number: '03',
    name: 'Linux Infrastructure & DevOps Engineering',
    description:
      'Over a decade of enterprise Linux systems engineering, server security hardening, custom Bash script automation, Apache/Nginx web servers, and high-availability operations. Creator of national Linux distribution Parsi Mint.',
    skills: ['Linux Kernel & Distros', 'Bash Scripting', 'Server Hardening', 'Apache / Nginx', 'CI/CD Pipelines'],
  },
  {
    number: '04',
    name: 'Startup Strategy & Technical Leadership',
    description:
      'Empowering new tech ventures through Lean Startup methodology, Business Model Canvas formulation, Mom Test customer discovery, rapid prototyping, and agile team leadership. Founder and CEO of Ericom Software Group.',
    skills: ['Lean Startup', 'Business Model Canvas', 'Mom Test Ideation', 'Agile Team Building', 'MVP Development'],
  },
  {
    number: '05',
    name: 'Trading Psychology & Executive Coaching',
    description:
      'Applying Master’s level psychological research in Transactional Analysis (TA), CBT, and mindfulness to help traders and startup founders master emotional discipline, eliminate psychological drawdown, and optimize decision-making under uncertainty.',
    skills: ['Transactional Analysis (TA)', 'CBT Therapy', 'Trader Mindset', 'Mindfulness', 'Conflict Resolution'],
  },
]

function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-12 md:py-32"
    >
      <FadeIn
        as="h2"
        className="heading-kanit mb-16 text-center text-[clamp(3rem,11vw,140px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-24"
      >
        Expertise
      </FadeIn>

      <div className="mx-auto flex max-w-5xl flex-col">
        {services.map((service, index) => (
          <FadeIn
            key={service.name}
            delay={index * 0.08}
            y={20}
            className="border-t border-[rgba(12,12,12,0.12)] py-10 sm:py-12 md:py-14"
          >
            <div className="grid grid-cols-[minmax(80px,0.25fr)_minmax(0,1fr)] items-start gap-6 md:grid-cols-[minmax(140px,0.32fr)_minmax(0,1fr)] md:gap-12">
              <div className="heading-kanit text-[clamp(2.5rem,8vw,110px)] font-black leading-none text-zinc-900">
                {service.number}
              </div>
              <div className="flex flex-col gap-4 pt-1">
                <h3 className="heading-kanit text-[clamp(1.2rem,2.4vw,2.2rem)] font-bold uppercase leading-tight text-zinc-900">
                  {service.name}
                </h3>
                <p className="max-w-2xl text-[clamp(0.9rem,1.5vw,1.15rem)] font-normal leading-relaxed text-zinc-600">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-zinc-100 px-3.5 py-1 text-xs font-semibold text-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        <div className="border-t border-[rgba(12,12,12,0.12)]" />
      </div>
    </section>
  )
}

type Project = {
  number: string
  category: string
  name: string
  subtitle: string
  tags: string[]
  description: string
  images: [string, string, string]
  highlights: string[]
}

const projects: Project[] = [
  {
    number: '01',
    category: 'FinTech & Intelligent Automation',
    name: 'Algorithmic Trading Bot Systems',
    subtitle: 'Automating Trading Strategies into Intelligent Bots',
    tags: ['Python', 'Quantitative Models', 'Exchange APIs', 'Strategy Automation'],
    description:
      'Advanced algorithmic trading robots and quantitative backtesting frameworks engineered to execute complex financial strategies with zero emotional bias, automated stop-loss/take-profit, and millisecond execution across crypto, forex, and equity markets.',
    highlights: [
      'Automated strategy execution and signal triggers',
      'Quantitative risk management and drawdown suppression',
      'Integrated backtesting analytics and Sharpe ratio tracking',
    ],
    images: [
      '/projects/algo-1.jpg',
      '/projects/algo-2.jpg',
      '/projects/algo-3.png',
    ],
  },
  {
    number: '02',
    category: 'AI & Smart Management SaaS',
    name: 'Arta Smart Educational Suite',
    subtitle: 'AI & ML Driven Institute Automation Assistant',
    tags: ['AI/Machine Learning', '24/7 Virtual Secretary', 'Messaging Bots', 'PHP'],
    description:
      'Arta leverages artificial intelligence and machine learning to replace human administrative labor in training centers and schools. Operates 24/7 on messaging platforms to handle student enrollments, fee collections, course schedules, and analytics.',
    highlights: [
      '24/7 virtual secretary handling registrations & tuition payments',
      'Zero dependency on physical premises or localized servers',
      'Real-time automated revenue and attendance reports',
    ],
    images: [
      '/projects/arta-1.png',
      '/projects/arta-2.png',
      '/projects/arta-3.png',
    ],
  },
  {
    number: '03',
    category: 'LegalTech Cloud SaaS',
    name: 'VakilAfzar Cloud Legal Suite',
    subtitle: 'Automated Power-of-Attorney & Legal Bot Suite',
    tags: ['Cloud Architecture', 'PDF Generation', 'Telegram Bot', 'LegalTech'],
    description:
      'Cloud ecosystem solving daily operational bottlenecks for attorneys and legal firms. Features an automated power-of-attorney bot that slashed document preparation time from 45 minutes of manual error-prone drafting down to under 60 seconds with barcode-aligned precision.',
    highlights: [
      'Drafts barcode-aligned legal documents in under 1 minute',
      'Encrypted cloud archive for confidential case management',
      'No client installation required -- fully bot and cloud powered',
    ],
    images: [
      '/projects/vakil-1.png',
      '/projects/vakil-2.png',
      '/projects/vakil-3.png',
    ],
  },
  {
    number: '04',
    category: 'EdTech Social Network',
    name: 'Dornash Educational Community',
    subtitle: 'Specialized Dual-Sided Academic Platform',
    tags: ['EdTech', 'Social Network', 'Dual-Sided Marketplace', 'Web Dev'],
    description:
      'A specialized two-sided educational network uniting educational institutes, instructors, and students. Integrates social networking dynamics with structured educational tools, enabling instructors to market courses while students learn and interact.',
    highlights: [
      'Dual-sided ecosystem tailored for educational institutions and students',
      'Course marketing, interactive classrooms, and student portals',
      'Specialized educational community features',
    ],
    images: [
      '/projects/dornash-1.png',
      '/projects/dornash-2.png',
      '/projects/dornash-3.png',
    ],
  },
  {
    number: '05',
    category: 'Workflow & Appointment Automation',
    name: 'NobatZan & T-Report Suites',
    subtitle: 'Smart Booking Engine & Incident Ticketing Platform',
    tags: ['Online Scheduling', 'Telegram Bot', 'Ticketing SaaS', 'PHP'],
    description:
      'NobatZan transformed appointment booking for doctors, attorneys, and salons via Telegram bots and cloud calendar syncing. Complemented by T-Report, an organizational ticketing software bridging clients and administrative departments.',
    highlights: [
      'Automated appointment calendar for professionals via bot',
      'T-Report organizational incident tracking and departmental ticketing',
      'Reduced phone coordination labor by over 80%',
    ],
    images: [
      '/projects/nobat-1.png',
      '/projects/nobat-2.png',
      '/projects/nobat-3.png',
    ],
  },
  {
    number: '06',
    category: 'Systems & Cultural Computing',
    name: 'Parsi Mint Linux & Isfahan 3D',
    subtitle: 'National Operating System Distro & Interactive Heritage',
    tags: ['Linux Kernel', 'Custom Distro', 'Bash Script', '3D Multimedia'],
    description:
      'Parsi Mint Linux (versions 1 & 2) was a custom localized Iranian Linux distribution tailored for Persian users with integrated Persian desktop environments. Alongside Isfahan Multimedia 1 & 2, pioneer 3D interactive software preserving historical heritage.',
    highlights: [
      'Full custom Linux OS distribution with localized Persian tools',
      'Interactive 3D historical multimedia software of Isfahan (2005 & 2007)',
      'Iran’s first bulk email marketing platform and Linux domain service (2012)',
    ],
    images: [
      '/projects/parsimint-1.png',
      '/projects/isfahan-1.png',
      '/projects/isfahan-2.png',
    ],
  },
]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-[#121212] p-6 shadow-2xl sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
            {project.category}
          </span>
          <h3 className="heading-kanit mt-1 text-2xl font-bold uppercase text-white sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-zinc-400">{project.subtitle}</p>

          <div className="my-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm font-normal leading-relaxed text-zinc-300 sm:text-base">
            {project.description}
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Key Accomplishments</h4>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 sm:text-sm">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Screenshot Gallery */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.name} preview ${i + 1}`}
                className="h-44 w-full rounded-2xl border border-white/10 object-cover"
              />
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-full border border-white/20 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
            >
              Discuss Project
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (p: Project) => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const targetScale = 1 - (projects.length - 1 - index) * 0.025
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20, mass: 0.4 })

  return (
    <div ref={ref} className="relative h-[85vh]" style={{ top: `${index * 26}px` }}>
      <motion.article
        style={{ scale: smoothScale }}
        className="sticky top-20 flex h-[calc(85vh-1rem)] flex-col rounded-[36px] border border-[#D7E2EA]/30 bg-[#0C0C0C] p-5 shadow-2xl sm:top-24 sm:rounded-[48px] sm:p-7 md:top-28 md:rounded-[56px] md:p-8"
      >
        <div className="flex items-start justify-between gap-4 pb-3 sm:pb-4 md:pb-6">
          <div className="flex min-w-0 items-end gap-3 sm:gap-5 md:gap-7">
            <div className="heading-kanit shrink-0 text-[clamp(2.8rem,8vw,120px)] font-black leading-none text-[#D7E2EA]">
              {project.number}
            </div>
            <div className="min-w-0 pb-1">
              <div className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-purple-400 sm:text-sm">
                {project.category}
              </div>
              <h3 className="heading-kanit text-lg font-bold uppercase leading-tight text-[#D7E2EA] sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onSelect(project)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA] transition-all duration-200 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] sm:px-7 sm:py-2.5 sm:text-sm"
          >
            Project Details
            <ArrowUpRight size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[2fr_3fr] gap-3 sm:gap-4 md:gap-5">
          <div className="grid min-h-0 grid-rows-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 sm:gap-4 md:gap-5">
            <img
              src={project.images[0]}
              alt={`${project.name} preview one`}
              className="h-[clamp(120px,16vw,220px)] w-full rounded-[24px] border border-white/10 object-cover sm:rounded-[36px] md:rounded-[44px]"
              loading="lazy"
            />
            <img
              src={project.images[1]}
              alt={`${project.name} preview two`}
              className="h-[clamp(150px,22vw,320px)] w-full rounded-[24px] border border-white/10 object-cover sm:rounded-[36px] md:rounded-[44px]"
              loading="lazy"
            />
          </div>
          <div className="relative min-h-0 w-full overflow-hidden rounded-[24px] border border-white/10 sm:rounded-[36px] md:rounded-[44px]">
            <img
              src={project.images[2]}
              alt={`${project.name} preview three`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5 sm:p-7">
              <p className="line-clamp-2 text-xs font-normal text-zinc-300 sm:text-sm">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-28 md:-mt-14 md:rounded-t-[60px] md:px-12 md:pt-32"
    >
      <FadeIn
        as="h2"
        className="hero-heading heading-kanit mb-10 text-center text-[clamp(3rem,11vw,140px)] font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-20"
      >
        Projects
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

function StartupsSection() {
  const startups = [
    {
      name: 'Ericom Software Group',
      period: '2010 / 2014 -- Present',
      role: 'CEO & Founder',
      status: 'Active',
      statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      description:
        'Software development agency and technology innovation lab founded to build custom software, web platforms, and automated tools. Maintained a steady core team of senior engineers developing high-impact products.',
      learnings:
        'Leadership, selecting high-caliber talent, and navigating organizational dynamics through psychological guidance.',
    },
    {
      name: 'Arta AI Educational Management',
      period: 'Winter 2018',
      role: 'Creator & Lead Architect',
      status: 'Completed',
      statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description:
        'AI & machine learning platform substituting human administration in schools and training institutes via messaging bots.',
      learnings:
        'First-hand insight into AI chatbot adoption and SaaS revenue models.',
    },
    {
      name: 'VakilAfzar Cloud Legal Suite',
      period: 'Summer 2017',
      role: 'Co-founder & CTO',
      status: 'Completed',
      statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description:
        'Cloud-based software suite and automated bot for attorneys, generating power-of-attorney documents in under 60 seconds.',
      learnings:
        'Navigating bureaucratic partnerships, legal Bar Association dynamics, and B2B partner alignment.',
    },
    {
      name: 'Dornash Social Learning Network',
      period: 'Winter 2017',
      role: 'Founder & Architect',
      status: 'Completed',
      statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description:
        'Specialized educational social networking platform serving training centers, instructors, and eager learners.',
      learnings:
        'Network effect dynamics, multi-tenant educational content delivery, and viral loops.',
    },
    {
      name: 'NobatZan Booking Engine',
      period: 'Summer 2017',
      role: 'Founder & Tech Lead',
      status: 'Completed',
      statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description:
        'Automated appointment scheduling system for doctors, lawyers, and service businesses via mobile web and messaging bots.',
      learnings:
        'Platform risk and mitigating third-party messaging dependencies through native web fallbacks.',
    },
    {
      name: 'T-Report Organizational Ticketing',
      period: 'Winter 2015',
      role: 'Creator & Developer',
      status: 'Completed',
      statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description:
        'Internal reporting and ticketing application enabling clients and staff to route departmental tickets securely.',
      learnings:
        'The paramount importance of lean infrastructure, focused scope, and rapid customer feedback.',
    },
  ]

  return (
    <section id="startups" className="border-t border-white/10 bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn as="h2" className="hero-heading heading-kanit mb-4 text-center text-[clamp(2.8rem,10vw,120px)] font-black uppercase leading-none tracking-tight">
          Ventures & Leadership
        </FadeIn>
        <FadeIn delay={0.1} y={20} className="mb-16 text-center">
          <p className="mx-auto max-w-2xl text-sm font-medium text-zinc-400 sm:text-base">
            From founding Ericom Software Group to launching specialized SaaS, AI, and workflow automation platforms.
          </p>
        </FadeIn>

        {/* Ericom Banner Card */}
        <FadeIn delay={0.2} y={30} className="glass-card mb-12 overflow-hidden rounded-3xl border border-white/15 p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
                <Briefcase size={14} />
                Flagship Venture
              </div>
              <h3 className="heading-kanit mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                Ericom Software Group
              </h3>
              <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-300">
                Founded by Danial Rikhteh Garan in 2010 (full-scale operations since 2014), Ericom Software Group became a crucible for software architecture, client consulting, and high-performance engineering.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>10+ Years of Operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Web, Cloud & Desktop</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Mentorship & Incubator</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src="/projects/ericom-team.png"
                alt="Ericom Software Group Team"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </FadeIn>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map((st, i) => (
            <FadeIn
              key={st.name}
              delay={0.1 + i * 0.08}
              y={20}
              className="glass-card flex flex-col justify-between rounded-3xl p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${st.statusColor}`}>
                    {st.status}
                  </span>
                  <span className="text-xs font-medium text-zinc-500">{st.period}</span>
                </div>
                <h4 className="heading-kanit mt-4 text-xl font-bold uppercase text-white">{st.name}</h4>
                <p className="mt-1 text-xs font-semibold text-purple-300">{st.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300">{st.description}</p>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-[11px] font-semibold uppercase text-zinc-400">Key Learning / Insight</p>
                <p className="mt-1 text-xs text-zinc-300 italic">{st.learnings}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function HonorsSection() {
  const honors = [
    {
      title: 'Astan Quds Razavi Commendation',
      detail: 'Virtual Pilgrimage 3D Interactive Software acknowledgement (2011)',
      image: '/projects/award-2.png',
      tag: 'State Honor',
    },
    {
      title: 'Linux Research Week Honor',
      detail: 'Research week seminar recognition at MAU University (2011)',
      image: '/projects/award-3.png',
      tag: 'Academic',
    },
    {
      title: 'National Linux Seminar Award',
      detail: 'Operating systems research and presentation commendation (2008)',
      image: '/projects/award-1.png',
      tag: 'University',
    },
    {
      title: 'National Open-Source Conference',
      detail: 'Keynote and speaker covered nationally by ISNA news agency (2012)',
      image: '/projects/isna-news.png',
      tag: 'Keynote Speaker',
    },
  ]

  const certs = [
    { name: 'HTML & Web Coding', org: 'Vocational Training Org (170 Hours)' },
    { name: 'Flash MX & ActionScript', org: 'Vocational Training Org (96 Hours)' },
    { name: 'Photoshop Professional', org: 'Vocational Training Org (70 Hours)' },
    { name: 'Dreamweaver Web Dev', org: 'Vocational Training Org (70 Hours)' },
    { name: 'Personal Computer Operator', org: 'Vocational Training Org (80 Hours)' },
    { name: 'ICDL 2 Certification', org: 'Vocational Training Org (32 Hours)' },
  ]

  return (
    <section id="honors" className="border-t border-white/10 bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn as="h2" className="hero-heading heading-kanit mb-4 text-center text-[clamp(2.8rem,10vw,120px)] font-black uppercase leading-none tracking-tight">
          Honors & Media
        </FadeIn>
        <FadeIn delay={0.1} y={20} className="mb-16 text-center">
          <p className="mx-auto max-w-2xl text-sm font-medium text-zinc-400 sm:text-base">
            Official commendations, keynote appearances, and certifications earned throughout 14+ years of contributions.
          </p>
        </FadeIn>

        {/* Commendation Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {honors.map((h, i) => (
            <FadeIn
              key={h.title}
              delay={0.1 + i * 0.08}
              y={20}
              className="glass-card group overflow-hidden rounded-3xl p-4 flex flex-col"
            >
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={h.image}
                  alt={h.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-300 backdrop-blur-md">
                  {h.tag}
                </span>
              </div>
              <h4 className="heading-kanit text-base font-bold uppercase text-white">{h.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{h.detail}</p>
            </FadeIn>
          ))}
        </div>

        {/* Certifications Row */}
        <FadeIn delay={0.3} y={30} className="glass-panel mt-12 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-amber-400" size={24} />
            <h3 className="heading-kanit text-xl font-bold uppercase text-white sm:text-2xl">
              Professional Certifications & Publications
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {certs.map((c, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-purple-400" />
                <div>
                  <h5 className="text-xs font-bold text-white">{c.name}</h5>
                  <p className="text-[11px] text-zinc-400">{c.org}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-zinc-400">
            <span>Publications: <strong>Yelp (Gnome-Help)</strong> &bull; <strong>Fix Screen Linux Desktop</strong></span>
            <span className="font-semibold text-purple-300">Total Certified Vocational Hours: 518+ Hours</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ContactSection() {
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text)
    if (type === 'phone') {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    } else {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  return (
    <section id="contact" className="relative border-t border-white/10 bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-12 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[140px]">
        <div className="h-[400px] w-[600px] rounded-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn delay={0} y={30}>
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-300">
            <Sparkles size={14} className="text-amber-400" />
            Let&apos;s Build Together
          </span>
        </FadeIn>

        <FadeIn delay={0.1} y={40} className="mt-4">
          <h2 className="hero-heading heading-kanit text-[clamp(2.5rem,9vw,110px)] font-black uppercase leading-none tracking-tight">
            Connect With Danial
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="mt-6">
          <p className="mx-auto max-w-xl text-sm font-normal leading-relaxed text-zinc-300 sm:text-base">
            Interested in developing an algorithmic trading bot, consulting on Linux systems, or collaborating on a high-potential startup? Reach out directly.
          </p>
        </FadeIn>

        {/* Contact Action Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Telegram */}
          <FadeIn delay={0.3} y={20}>
            <a
              href="https://t.me/d_rikhtehgaran"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center justify-between rounded-3xl p-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
                  <Send size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400">Telegram Direct</p>
                  <p className="text-base font-bold text-white">@d_rikhtehgaran</p>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </FadeIn>

          {/* LinkedIn */}
          <FadeIn delay={0.35} y={20}>
            <a
              href="https://www.linkedin.com/in/danialrikhtehgaran"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center justify-between rounded-3xl p-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400">LinkedIn Profile</p>
                  <p className="text-base font-bold text-white">danialrikhtehgaran</p>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </FadeIn>

          {/* Email */}
          <FadeIn delay={0.4} y={20}>
            <div className="glass-card flex items-center justify-between rounded-3xl p-6 text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400">Email</p>
                  <a
                    href="mailto:d.rikhtehgaran@gmail.com"
                    className="text-sm sm:text-base font-bold text-white hover:underline"
                  >
                    d.rikhtehgaran@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('d.rikhtehgaran@gmail.com', 'email')}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </FadeIn>

          {/* Phone */}
          <FadeIn delay={0.45} y={20}>
            <div className="glass-card flex items-center justify-between rounded-3xl p-6 text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400">Phone</p>
                  <a
                    href="tel:+989131081446"
                    className="text-sm sm:text-base font-bold text-white hover:underline"
                  >
                    0913 108 1446
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('09131081446', 'phone')}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Download Resume Banner */}
        <FadeIn delay={0.5} y={30} className="mt-10">
          <div className="glass-panel flex flex-col items-center justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:p-8">
            <div className="text-left">
              <h4 className="text-base font-bold text-white">Full Comprehensive CV / Resume</h4>
              <p className="text-xs text-zinc-400">Download detailed PDF resume including complete course syllabi & work history.</p>
            </div>
            <a
              href="/Danial-Rikhteh-Garan-Resume.pdf"
              download="Danial-Rikhteh-Garan-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
            >
              <Download size={16} />
              Download Resume (PDF)
            </a>
          </div>
        </FadeIn>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center text-xs text-zinc-500">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin size={14} className="text-purple-400" />
              <span>Isfahan, Iran &bull; Available Worldwide</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Danial Rikhteh Garan. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#services" className="hover:text-white transition-colors">Expertise</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <StartupsSection />
      <HonorsSection />
      <ContactSection />
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
