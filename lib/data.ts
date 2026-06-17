// ─────────────────────────────────────────────
//  PORTFOLIO DATA — Software / AI / Cloud & MLOps
// ─────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export const STATS = [
  { value: 5,  suffix: "+",  label: "Years of experience"      },
  { value: 18, suffix: "+",  label: "ML models in production"  },
  { value: 4,  suffix: "",   label: "Cloud / MLOps certs"       },
  { value: 99, suffix: ".9%",label: "Avg. uptime delivered"     },
];

export const SKILLS = [
  {
    category: "Software Engineering",
    icon: "🧩",
    color: "violet",
    items: [
      { name: "Python",         level: "Expert"        },
      { name: "TypeScript",     level: "Expert"        },
      { name: "Go (Golang)",    level: "Avancé"        },
      { name: "React / Next.js",level: "Expert"        },
      { name: "FastAPI",        level: "Expert"        },
      { name: "Node.js",        level: "Avancé"        },
      { name: "REST / gRPC",    level: "Expert"        },
      { name: "System Design",  level: "Expert"        },
    ],
  },
  {
    category: "AI / Machine Learning",
    icon: "🧠",
    color: "pink",
    items: [
      { name: "PyTorch",          level: "Expert"        },
      { name: "TensorFlow",       level: "Avancé"        },
      { name: "scikit-learn",     level: "Expert"        },
      { name: "LLMs / OpenAI API",level: "Expert"        },
      { name: "LangChain / LangGraph", level: "Avancé"   },
      { name: "RAG & Vector DBs", level: "Expert"        },
      { name: "Hugging Face",     level: "Avancé"        },
      { name: "Prompt Engineering",level: "Expert"       },
    ],
  },
  {
    category: "MLOps & ML Infra",
    icon: "🔁",
    color: "emerald",
    items: [
      { name: "MLflow",          level: "Expert"        },
      { name: "Kubeflow",        level: "Avancé"        },
      { name: "Airflow",         level: "Avancé"        },
      { name: "Feature Stores",  level: "Intermédiaire" },
      { name: "Model Serving (Triton / TorchServe)", level: "Avancé" },
      { name: "Vertex AI / SageMaker", level: "Avancé"  },
      { name: "DVC / Data Versioning", level: "Avancé"  },
      { name: "CI/CD for ML",    level: "Expert"        },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: "☁️",
    color: "amber",
    items: [
      { name: "AWS (SAA-C03)",   level: "Expert"        },
      { name: "GCP (PCA / ML Engineer)", level: "Avancé"},
      { name: "Docker",          level: "Expert"        },
      { name: "Kubernetes",      level: "Expert"        },
      { name: "Terraform",       level: "Avancé"        },
      { name: "GitHub Actions",  level: "Expert"        },
      { name: "Prometheus / Grafana", level: "Avancé"   },
      { name: "Cost Optimization", level: "Expert"      },
    ],
  },
  {
    category: "Data Engineering",
    icon: "🗄️",
    color: "sky",
    items: [
      { name: "PostgreSQL",      level: "Expert"        },
      { name: "Apache Spark",    level: "Avancé"        },
      { name: "Apache Kafka",    level: "Intermédiaire" },
      { name: "Redis",           level: "Avancé"        },
      { name: "Elasticsearch",   level: "Avancé"        },
      { name: "Pinecone / Weaviate", level: "Avancé"    },
    ],
  },
  {
    category: "Methods & Tools",
    icon: "🛠️",
    color: "slate",
    items: [
      { name: "Agile / Scrum",   level: "Expert"        },
      { name: "TDD / CI Testing",level: "Avancé"        },
      { name: "A/B Testing & Experimentation", level: "Avancé" },
      { name: "Model Monitoring",level: "Expert"        },
      { name: "Code Review",     level: "Expert"        },
      { name: "Technical Writing",level: "Avancé"       },
    ],
  },
];

export const TECH_BARS = [
  { name: "Python / ML Engineering",          level: 96 },
  { name: "Cloud Architecture (AWS/GCP)",     level: 92 },
  { name: "MLOps & Model Deployment",         level: 90 },
  { name: "React / Next.js / TypeScript",     level: 88 },
  { name: "Kubernetes / Docker",              level: 89 },
  { name: "LLMs / RAG / LangChain",           level: 91 },
  { name: "CI/CD & Infrastructure as Code",   level: 88 },
  { name: "Data Pipelines (Spark/Airflow)",   level: 84 },
];

export const PROJECTS = [
  {
    id: 1,
    stack: ["Python", "LangGraph", "GPT-4o", "Pinecone", "FastAPI", "Kubernetes"],
    category: "ai",
    emoji: "🧠",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    stack: ["MLflow", "Kubeflow", "Airflow", "Terraform", "AWS SageMaker", "Prometheus"],
    category: "mlops",
    emoji: "🔁",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    stack: ["Go", "Prometheus", "Grafana", "Kubernetes", "Terraform", "GCP"],
    category: "cloud",
    emoji: "📡",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    stack: ["Next.js 14", "TypeScript", "PostgreSQL", "AWS EKS", "Redis", "Stripe"],
    category: "software",
    emoji: "🚀",
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    stack: ["PyTorch", "TensorRT", "Triton", "Docker", "ONNX", "Kubernetes"],
    category: "ai",
    emoji: "👁️",
    github: "#",
    demo: "#",
  },
  {
    id: 6,
    stack: ["Go", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "AWS"],
    category: "cloud",
    emoji: "⚙️",
    github: "#",
    demo: "#",
  },
];

export const EXPERIENCES = [
  {
    id: 1,
    period: "2025 — Present",
    current: true,
  },
  {
    id: 2,
    period: "2021 — 2023",
    current: false,
  },
  {
    id: 3,
    period: "2020 — 2021",
    current: false,
  },
];

export const EDUCATION = [
  {
    id: 1,
    school: "Université Numérique Cheikh hamidou Kane",
    year: "2023 — 2025",
    icon: "🎓",
  },
  {
    id: 2,
    school: "Université Numérique Cheikh hamidou Kane",
    year: "2020 — 2023",
    icon: "💻",
  },
];

export const CERTIFICATIONS = [
  {
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    year: "2024",
    icon: "☁️",
    color: "bg-amber-500/10 border-amber-500/20",
    iconBg: "bg-amber-500/20",
  },
  {
    name: "AWS Certified Machine Learning — Specialty",
    issuer: "Amazon Web Services",
    year: "2024",
    icon: "🤖",
    color: "bg-pink-500/10 border-pink-500/20",
    iconBg: "bg-pink-500/20",
  },
  {
    name: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    year: "2023",
    icon: "🔷",
    color: "bg-blue-500/10 border-blue-500/20",
    iconBg: "bg-blue-500/20",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    year: "2023",
    icon: "🐳",
    color: "bg-sky-500/10 border-sky-500/20",
    iconBg: "bg-sky-500/20",
  },
];

export const CONTACT_LINKS = [
  {
    icon: "📧",
    label: "Email",
    value: "africadigitalcenter2023@email.com",
    href: "mamadoualy@email.com",
    color: "hover:border-sky-400/50",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/mamadouyaly",
    href: "https://linkedin.com/in/alexdupont",
    color: "hover:border-blue-400/50",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/mamadouyaly-dev",
    href: "https://github.com/devcode-dev",
    color: "hover:border-slate-400/50",
  },
  {
    icon: "🌐",
    label: "Portfolio",
    value: "devcode",
    href: "https://mamadouyaly.dev",
    color: "hover:border-violet-400/50",
  },
];

export const OPEN_TO = [
  "AI / ML Engineer roles",
  "MLOps & Platform roles",
  "Remote-first opportunities",
  "Series A–C startups",
  "AI product teams",
];

export const TESTIMONIALS = [
  {
    quote: "Yaly took our ML models from notebooks to production-grade pipelines in weeks, not months. The MLOps foundation he built is still our standard today.",
    author: "Sarah M.",
    role: "VP Engineering, TechCorp Canada",
    avatar: "SM",
  },
  {
    quote: "The RAG system Alex built processes thousands of documents a day with near-perfect accuracy. It fundamentally changed how our analysts work.",
    author: "James K.",
    role: "CTO, StartupAI",
    avatar: "JK",
  },
  {
    quote: "Rare engineer who's equally strong in software architecture and applied ML. Alex consistently ships fast without cutting corners on reliability.",
    author: "Priya R.",
    role: "Product Manager, AgenceDigitale",
    avatar: "PR",
  },
];
