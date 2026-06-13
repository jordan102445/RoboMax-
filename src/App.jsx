import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock3,
  Database,
  Gauge,
  Mail,
  MessageSquare,
  PhoneCall,
  Play,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UploadCloud,
  UserRound,
  UsersRound,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const BOOKING_PATH = "/book-demo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const workflow = [
  { label: "Cold Database", icon: Database, tone: "text-coral", value: "Imported" },
  { label: "AI Verification", icon: ShieldCheck, tone: "text-mint", value: "Cleaned" },
  { label: "AI Voice Calls", icon: PhoneCall, tone: "text-aqua", value: "Calling" },
  { label: "AI SMS Follow-up", icon: MessageSquare, tone: "text-sun", value: "Nurturing" },
  { label: "Qualified Responses", icon: Target, tone: "text-mint", value: "Scored" },
  { label: "Recruiter Dashboard", icon: BarChart3, tone: "text-aqua", value: "Delivered" },
];

const heroStats = [
  { value: "70%", label: "Less Recruiter Time" },
  { value: "3x", label: "Faster Outreach" },
  { value: "24/7", label: "Automated Contact" },
  { value: "Higher", label: "Response Rates" },
];

const painPoints = [
  "Calling disconnected numbers",
  "Voicemail after voicemail",
  "No answer",
  "Manual data cleanup",
  "Hours spent filtering bad leads",
  "Expensive recruiter time wasted",
];

const steps = [
  { title: "Upload your lead database", icon: UploadCloud },
  { title: "AI verifies phone numbers and validates contacts", icon: ShieldCheck },
  { title: "AI removes invalid and unreachable records", icon: Database },
  { title: "AI automatically calls candidates", icon: PhoneCall },
  { title: "AI automatically sends SMS follow-ups", icon: MessageSquare },
  { title: "Interested candidates are forwarded to recruiters", icon: UsersRound },
  { title: "Recruiters only work with real opportunities", icon: Target },
];

const features = [
  {
    title: "AI Lead Verification",
    description: "Automatically validate and clean contact databases.",
    icon: ShieldCheck,
  },
  {
    title: "AI Voice Calling",
    description: "Human-like AI conversations at scale.",
    icon: PhoneCall,
  },
  {
    title: "SMS Automation",
    description: "Instant follow-up messaging workflows.",
    icon: MessageSquare,
  },
  {
    title: "Lead Qualification",
    description: "Automatically identify interested prospects.",
    icon: Target,
  },
  {
    title: "Recruiter Dashboard",
    description: "View conversations, responses, and analytics.",
    icon: BarChart3,
  },
  {
    title: "Campaign Analytics",
    description: "Track performance and conversion rates.",
    icon: TrendingUp,
  },
  {
    title: "24/7 Operation",
    description: "Never stop contacting potential candidates.",
    icon: Clock3,
  },
  {
    title: "CRM Integration",
    description: "Connect with existing recruiting workflows.",
    icon: PlugZap,
  },
];

const useCaseSteps = [
  "Upload 10,000 trucking candidates",
  "RoboMax verifies contacts",
  "AI calls candidates automatically",
  "AI sends follow-up SMS",
  "Interested candidates are identified",
  "Recruiters only call qualified candidates",
];

const testimonials = [
  {
    quote:
      "RoboMax changed the economics of our outbound team. Our recruiters now spend their day with candidates who actually answer and want to talk.",
    name: "Melissa Grant",
    role: "Director of Recruiting, FleetBridge Staffing",
  },
  {
    quote:
      "We were burning time cleaning truck driver lists by hand. RoboMax gave us cleaner campaigns, faster callbacks, and far better recruiter morale.",
    name: "Andre Wilson",
    role: "VP Operations, Apex Driver Search",
  },
  {
    quote:
      "The first week made the value obvious. Disconnected contacts were filtered out before our team ever touched the campaign.",
    name: "Priya Shah",
    role: "Managing Partner, Northline Talent Group",
  },
];

const faqs = [
  {
    question: "How does AI calling work?",
    answer:
      "RoboMax places compliant AI voice calls using approved campaign scripts, captures candidate intent, and routes interested responses to your team with call context.",
  },
  {
    question: "Can RoboMax integrate with our CRM?",
    answer:
      "Yes. RoboMax is built for recruiting and sales workflows, with integration patterns for common CRMs, ATS platforms, webhooks, and CSV-based handoffs.",
  },
  {
    question: "Can we upload our own databases?",
    answer:
      "Yes. Upload cold databases or segmented lists, then RoboMax validates, cleans, enriches, and prioritizes the records before outreach begins.",
  },
  {
    question: "Does RoboMax support SMS campaigns?",
    answer:
      "Yes. SMS follow-up workflows can be triggered after calls, missed calls, qualification events, and custom campaign milestones.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most teams can launch their first pilot quickly after campaign setup, list import, script approval, and routing preferences are configured.",
  },
];

function App() {
  const isBookingPage = window.location.pathname.replace(/\/$/, "") === BOOKING_PATH;

  return (
    <div className="min-h-screen overflow-hidden bg-ink text-white">
      <SiteHeader />
      {isBookingPage ? (
        <main>
          <BookingPage />
        </main>
      ) : (
        <main>
          <HeroSection />
          <ProblemSection />
          <HowItWorksSection />
          <FeaturesSection />
          <RecruitingUseCaseSection />
          <RoiSection />
          <TestimonialsSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
      )}
      <Footer />
    </div>
  );
}

function SiteHeader() {
  const isBookingPage = window.location.pathname.replace(/\/$/, "") === BOOKING_PATH;
  const navPrefix = isBookingPage ? "/" : "";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label="RoboMax Outreach home">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
            <Bot className="h-5 w-5" />
          </span>
          <span className="hidden font-display text-base font-bold tracking-wide min-[420px]:inline">RoboMax Outreach</span>
          <span className="font-display text-base font-bold tracking-wide min-[420px]:hidden">RoboMax</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 lg:flex">
          <a className="transition hover:text-white" href={`${navPrefix}#problem`}>
            Problem
          </a>
          <a className="transition hover:text-white" href={`${navPrefix}#how-it-works`}>
            How it works
          </a>
          <a className="transition hover:text-white" href={`${navPrefix}#features`}>
            Features
          </a>
          <a className="transition hover:text-white" href={`${navPrefix}#roi`}>
            ROI
          </a>
        </nav>
        <a
          href={BOOKING_PATH}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 text-sm font-bold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-mint sm:px-4"
        >
          <span className="hidden sm:inline">Book Demo</span>
          <span className="sm:hidden">Demo</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-fine-grid bg-[length:44px_44px] opacity-35" />
      <div className="absolute left-1/2 top-12 h-72 w-[52rem] -translate-x-1/2 rounded-full bg-mint/10 blur-3xl" />
      <div className="absolute right-0 top-48 h-72 w-72 rounded-full bg-aqua/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="min-w-0 max-w-3xl">
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-sm font-semibold text-white/75"
          >
            <Sparkles className="h-4 w-4 text-mint" />
            AI lead cleanup, voice, SMS, and qualification
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="max-w-4xl font-display text-5xl font-extrabold leading-[1.02] text-balance tracking-normal sm:text-6xl lg:text-7xl"
          >
            Stop Wasting Recruiter Time on Dead Leads
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            RoboMax Outreach automatically cleans your lead database, verifies phone numbers, contacts candidates using AI
            voice calls and SMS, and delivers only qualified responses to your team.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={BOOKING_PATH}>Book Demo</PrimaryButton>
            <SecondaryButton href="#demo">
              <Play className="h-4 w-4 fill-current" />
              Watch Demo
            </SecondaryButton>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
                <div className="font-display text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="mt-1 text-sm font-medium leading-5 text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-mint/[0.14] via-aqua/[0.08] to-coral/10 blur-2xl" />
      <div className="glass relative min-w-0 overflow-hidden rounded-lg p-3 sm:p-5">
        <div className="absolute inset-0 bg-fine-grid bg-[length:26px_26px] opacity-35" />
        <div className="relative grid min-w-0 gap-4 xl:grid-cols-[0.86fr_1.14fr]">
          <WorkflowDiagram />
          <DashboardMockup />
        </div>
      </div>
    </div>
  );
}

function WorkflowDiagram() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="relative min-w-0 rounded-lg border border-white/10 bg-ink/70 p-3 sm:p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-mint/80">Live Workflow</p>
          <h2 className="mt-1 font-display text-xl font-bold">Lead intake to recruiter handoff</h2>
        </div>
        <span className="hidden rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-bold text-mint sm:inline-flex">
          Active
        </span>
      </div>
      <div className="space-y-3">
        {workflow.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.label} variants={fadeUp} className="relative">
              <div className="grid min-w-0 grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-2.5 sm:grid-cols-[42px_minmax(0,1fr)_auto] sm:p-3">
                <div className={`grid h-9 w-9 place-items-center rounded-lg bg-white/[0.08] sm:h-10 sm:w-10 ${item.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs text-white/50">Stage {index + 1}</p>
                </div>
                <span className="hidden rounded-full bg-white/[0.08] px-2.5 py-1 text-xs font-semibold text-white/70 sm:inline-flex xl:hidden">
                  {item.value}
                </span>
              </div>
              {index < workflow.length - 1 && (
                <div className="mx-auto grid h-3 w-10 place-items-center text-white/30 sm:h-5">
                  <ArrowDown className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function DashboardMockup() {
  const rows = [
    ["Marcus Lane", "Qualified", "Voice + SMS", "91%"],
    ["Tanya Brooks", "Callback", "AI Voice", "84%"],
    ["Chris Rivera", "Invalid", "Verified", "0%"],
    ["M. Bennett", "Interested", "SMS", "88%"],
  ];

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[#0b0d13]/95">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-coral" />
          <span className="h-2.5 w-2.5 rounded-full bg-sun" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
        </div>
        <span className="text-xs font-semibold text-white/50">Recruiter Dashboard</span>
      </div>
      <div className="p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["8,742", "Verified contacts", "text-mint"],
            ["2,104", "Live responses", "text-aqua"],
            ["612", "Ready for recruiters", "text-sun"],
          ].map(([value, label, color]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-3">
              <p className={`font-display text-2xl font-extrabold ${color}`}>{value}</p>
              <p className="mt-1 text-xs font-medium text-white/50">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.82fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-white">Campaign Velocity</p>
              <Gauge className="h-4 w-4 text-mint" />
            </div>
            <div className="flex h-28 items-end gap-2 sm:h-36">
              {[42, 66, 54, 82, 70, 94, 88, 100, 76, 92].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 16 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.9, delay: index * 0.04 }}
                  className="min-h-4 flex-1 rounded-t bg-gradient-to-t from-aqua/[0.55] to-mint"
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-white">AI Queue</p>
              <Zap className="h-4 w-4 text-sun" />
            </div>
            <div className="space-y-3">
              {[
                ["Verifying", "72%"],
                ["Calling", "58%"],
                ["SMS Follow-up", "81%"],
                ["Recruiter Handoff", "39%"],
              ].map(([label, width]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs text-white/60">
                    <span>{label}</span>
                    <span>{width}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width }}
                      transition={{ duration: 1, delay: 0.15 }}
                      className="h-full rounded-full bg-gradient-to-r from-mint to-aqua"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
          <div className="no-scrollbar overflow-x-auto">
            <div className="min-w-[460px] sm:min-w-0">
              <div className="grid grid-cols-[1.2fr_0.8fr_0.9fr_0.5fr] gap-2 bg-white/[0.07] px-3 py-2 text-xs font-bold text-white/60">
                <span className="truncate">Candidate</span>
                <span className="truncate">Status</span>
                <span className="truncate">Channel</span>
                <span className="truncate">Fit</span>
              </div>
              {rows.map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-[1.2fr_0.8fr_0.9fr_0.5fr] gap-2 border-t border-white/[0.08] px-3 py-2 text-xs text-white/60"
                >
                  {row.map((cell, index) => (
                    <span
                      key={cell}
                      className={`truncate ${index === 1 && cell !== "Invalid" ? "font-semibold text-mint" : ""}`}
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <Section id="problem" eyebrow="The hidden cost of cold databases" title="Your Recruiters Are Doing Work AI Should Be Doing">
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {painPoints.map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <XCircle className="h-5 w-5 shrink-0 text-coral" />
              <span className="font-semibold text-white/80">{point}</span>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-4 md:grid-cols-2">
            <ProcessCard
              label="Traditional Process"
              tone="text-coral"
              items={["Buy database", "Dial every record", "Chase bad data", "Log voicemails", "Manually qualify"]}
              footer="Recruiters spend most of the week filtering noise."
            />
            <ProcessCard
              label="RoboMax Process"
              tone="text-mint"
              items={["Upload list", "Verify contacts", "Call with AI", "Trigger SMS", "Send qualified responses"]}
              footer="Recruiters focus on ready conversations."
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ProcessCard({ label, tone, items, footer }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className={`font-display text-xl font-bold ${tone}`}>{label}</h3>
        {tone === "text-mint" ? <CheckCircle2 className="h-5 w-5 text-mint" /> : <XCircle className="h-5 w-5 text-coral" />}
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-ink text-xs font-bold text-white/60">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-white/70">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-white/10 bg-ink/70 p-4 text-sm font-semibold leading-6 text-white/70">
        {footer}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <Section id="how-it-works" eyebrow="Automation that removes the busywork" title="How RoboMax Outreach Works">
      <Reveal>
        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-mint via-aqua to-transparent md:block" />
          <div className="grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="relative grid gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-5 md:grid-cols-[72px_1fr_auto] md:items-center"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-mint/25 bg-mint/10 text-mint">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Step {index + 1}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">{step.title}</h3>
                  </div>
                  {index < steps.length - 1 ? (
                    <ArrowRight className="hidden h-5 w-5 text-white/30 md:block" />
                  ) : (
                    <CheckCircle2 className="hidden h-5 w-5 text-mint md:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function FeaturesSection() {
  return (
    <Section id="features" eyebrow="First contact, automated" title="Everything Needed To Automate First Contact">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-mint/35 hover:bg-white/[0.07]"
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.08] text-mint transition group-hover:border-mint/35 group-hover:bg-mint/10">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

function RecruitingUseCaseSection() {
  return (
    <Section id="industries" eyebrow="Purpose-built for recruiting teams" title="Built For Modern Recruiting Teams">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-aqua/25 bg-aqua/10 text-aqua">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Example workflow</p>
                <h3 className="font-display text-xl font-bold">Trucking candidate outreach</h3>
              </div>
            </div>
            <div className="space-y-3">
              {useCaseSteps.map((item, index) => (
                <div key={item} className="grid grid-cols-[36px_1fr] items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.08] text-sm font-bold text-mint">
                    {index + 1}
                  </span>
                  <span className="font-medium text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <RoiGraphic />
        </Reveal>
      </div>
    </Section>
  );
}

function RoiGraphic() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0d13] p-5 shadow-glow">
      <div className="absolute inset-0 bg-fine-grid bg-[length:24px_24px] opacity-30" />
      <div className="relative">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint/75">ROI Model</p>
            <h3 className="mt-1 font-display text-2xl font-bold">10,000 candidate list</h3>
          </div>
          <div className="rounded-lg border border-mint/25 bg-mint/10 px-4 py-3">
            <p className="text-sm font-bold text-mint">Up to 70% time saved</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-coral/[0.18] bg-coral/[0.08] p-4">
            <p className="font-display text-lg font-bold text-coral">Traditional</p>
            <div className="mt-5 space-y-4">
              <MetricBar label="Manual dialing" value="92%" color="bg-coral" />
              <MetricBar label="Bad data filtering" value="76%" color="bg-coral" />
              <MetricBar label="Recruiter focus" value="28%" color="bg-coral" />
            </div>
            <p className="mt-5 font-display text-4xl font-extrabold">300</p>
            <p className="text-sm font-semibold text-white/60">recruiter hours</p>
          </div>
          <div className="rounded-lg border border-mint/20 bg-mint/[0.08] p-4">
            <p className="font-display text-lg font-bold text-mint">RoboMax</p>
            <div className="mt-5 space-y-4">
              <MetricBar label="Automated processing" value="96%" color="bg-mint" />
              <MetricBar label="Qualified routing" value="84%" color="bg-mint" />
              <MetricBar label="Recruiter focus" value="89%" color="bg-mint" />
            </div>
            <p className="mt-5 font-display text-4xl font-extrabold">Only</p>
            <p className="text-sm font-semibold text-white/60">qualified conversations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-semibold text-white/60">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: value }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

function RoiSection() {
  return (
    <Section id="roi" eyebrow="Cleaner pipeline, stronger recruiter output" title="See The Impact">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Example</p>
            <h3 className="mt-2 font-display text-4xl font-extrabold">10,000 leads</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-coral/[0.18] bg-coral/[0.08] p-4">
                <p className="font-bold text-coral">Traditional</p>
                <ul className="mt-4 space-y-3 text-sm text-white/60">
                  <li className="flex gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    300 recruiter hours
                  </li>
                  <li className="flex gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    Massive manual effort
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-mint/[0.18] bg-mint/[0.08] p-4">
                <p className="font-bold text-mint">RoboMax</p>
                <ul className="mt-4 space-y-3 text-sm text-white/60">
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                    Automated processing
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                    Only qualified conversations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Up to 70%", "recruiter time saved", Clock3],
              ["Faster", "hiring cycles", Zap],
              ["Higher", "contact rates", PhoneCall],
              ["Better", "recruiter productivity", TrendingUp],
            ].map(([value, label, Icon]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <Icon className="h-6 w-6 text-mint" />
                <p className="mt-6 font-display text-3xl font-extrabold">{value}</p>
                <p className="mt-2 text-sm font-semibold text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section id="testimonials" eyebrow="Trusted by high-volume teams" title="Recruiters Feel The Difference Fast">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 lg:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <motion.figure key={testimonial.name} variants={fadeUp} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <div className="mb-6 flex gap-1 text-sun">
              {Array.from({ length: 5 }).map((_, index) => (
                <Sparkles key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="text-base leading-7 text-white/75">"{testimonial.quote}"</blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-5">
              <p className="font-bold text-white">{testimonial.name}</p>
              <p className="mt-1 text-sm text-white/50">{testimonial.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section id="faq" eyebrow="Answers before the demo" title="FAQ">
      <Reveal>
        <div className="mx-auto max-w-4xl divide-y divide-white/10 rounded-lg border border-white/10 bg-white/[0.045]">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 open:bg-white/[0.035]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-white">
                {faq.question}
                <ArrowDown className="h-5 w-5 shrink-0 text-mint transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function FinalCtaSection() {
  return (
    <section id="demo" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-mint/10 to-transparent" />
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.12] via-white/[0.065] to-mint/[0.07] p-8 text-center shadow-glow sm:p-12">
          <div className="absolute inset-0 bg-fine-grid bg-[length:28px_28px] opacity-30" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-mint/80">Ready to remove dead leads</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-balance sm:text-5xl">Let Your Recruiters Recruit</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Stop paying recruiters to clean databases and chase unreachable contacts.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <PrimaryButton href={BOOKING_PATH}>Schedule Demo</PrimaryButton>
              <SecondaryButton href={BOOKING_PATH}>
                <CalendarCheck className="h-4 w-4" />
                Book Strategy Call
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const groups = {
    Product: ["Features", "Pricing", "Workflow", "Analytics"],
    Industries: ["Recruiting", "Trucking", "Staffing", "Call Centers"],
    Resources: ["ROI Guide", "Security", "Integrations", "API"],
    Contact: ["Book Demo", "Sales", "Support", "Partners"],
  };

  return (
    <footer className="border-t border-white/10 bg-black/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_1.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
              <Bot className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-bold">RoboMax Outreach</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
            AI-powered lead verification, voice outreach, SMS follow-up, and recruiter-ready qualification.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-4">
          {Object.entries(groups).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-bold text-white">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/50">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#demo" className="transition hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 RoboMax Outreach. All rights reserved.</p>
        <p>Built for recruiting, staffing, sales, and lead generation teams.</p>
      </div>
    </footer>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-mint/75">{eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance sm:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BookingPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const timezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Local timezone";
    } catch {
      return "Local timezone";
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          timezone,
          source: window.location.href,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "The booking could not be sent.");
      }

      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message || "The booking could not be sent.");
    }
  };

  return (
    <section className="relative px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 bg-fine-grid bg-[length:44px_44px] opacity-25" />
      <div className="absolute left-1/2 top-20 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-mint/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-[#0b0d13] shadow-glow"
      >
        <div className="absolute inset-0 bg-fine-grid bg-[length:28px_28px] opacity-20" />
        <div className="relative border-b border-white/10 bg-gradient-to-br from-mint/15 via-aqua/5 to-coral/5 p-5 sm:p-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-mint">
            <CalendarDays className="h-4 w-4" />
            Book online demo
          </div>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Book your RoboMax Outreach demo.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
            Share this page as a direct booking link. Fill in the details below and RoboMax will confirm the online call by email.
          </p>
        </div>

        <div className="relative p-5 sm:p-7">
          {status === "success" ? (
            <div className="rounded-lg border border-mint/20 bg-mint/[0.08] p-5">
              <CheckCircle2 className="h-8 w-8 text-mint" />
              <h3 className="mt-4 font-display text-2xl font-bold text-white">Booking request sent.</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Thanks, {form.firstName}. Your preferred demo time was sent to RoboMax Outreach. We will confirm the online call details by email.
              </p>
              <div className="mt-5">
                <PrimaryButton href="/">Back to Home</PrimaryButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" icon={UserRound}>
                  <input
                    required
                    name="First name"
                    value={form.firstName}
                    onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                    autoComplete="given-name"
                    placeholder="Alex"
                    className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
                  />
                </Field>
                <Field label="Surname" icon={UserRound}>
                  <input
                    required
                    name="Last name"
                    value={form.lastName}
                    onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                    autoComplete="family-name"
                    placeholder="Morgan"
                    className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
                  />
                </Field>
              </div>

              <Field label="Email" icon={Mail}>
                <input
                  required
                  type="email"
                  name="Email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Preferred date" icon={CalendarDays}>
                  <input
                    required
                    type="date"
                    name="Preferred date"
                    min={today}
                    value={form.date}
                    onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                    className="w-full bg-transparent text-sm font-semibold text-white outline-none [color-scheme:dark]"
                  />
                </Field>
                <Field label="Preferred time" icon={Clock3}>
                  <input
                    required
                    type="time"
                    name="Preferred time"
                    value={form.time}
                    onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))}
                    className="w-full bg-transparent text-sm font-semibold text-white outline-none [color-scheme:dark]"
                  />
                </Field>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-white/60">
                After submitting, the person who booked receives a confirmation email. RoboMax also receives an internal booking notification.
              </div>

              {status === "error" && (
                <div className="rounded-lg border border-coral/25 bg-coral/10 p-4 text-sm leading-6 text-coral">
                  {error} Please try again in a moment.
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <PrimaryButton type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Booking"}
                </PrimaryButton>
                <SecondaryButton href="/">
                  <X className="h-4 w-4" />
                  Cancel
                </SecondaryButton>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block rounded-lg border border-white/10 bg-white/[0.055] p-4 transition focus-within:border-mint/30 focus-within:bg-white/[0.075]">
      <span className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white/45">
        <Icon className="h-4 w-4 text-mint" />
        {label}
      </span>
      {children}
    </label>
  );
}

function PrimaryButton({ href, onClick, children, type = "button", disabled = false }) {
  const className =
    "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-mint px-6 text-sm font-extrabold text-ink shadow-[0_16px_45px_rgba(77,240,176,0.24)] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function SecondaryButton({ href, onClick, children, type = "button" }) {
  const className =
    "inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.055] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default App;
