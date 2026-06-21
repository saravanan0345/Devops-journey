import { useState, useEffect, useCallback, useRef } from "react";

const ROADMAP_DATA = [
  { phase: "Linux Fundamentals", weeks: 3, tools: ["Bash", "Linux"], color: "#3B82F6", topics: [
    "Basic Linux commands: ls, cp, mv, rm, pwd, mkdir", "File system hierarchy: /, /home, /etc, /var, /tmp",
    "File permissions: chmod, chown, chgrp basics", "Understanding users and groups in Linux",
    "Package management with apt: install, update, remove", "Package management with yum and dnf",
    "Shell scripting basics: variables and echo", "Shell scripting: conditionals (if/else)",
    "Shell scripting: loops (for, while)", "Shell scripting: functions",
    "Processes and signals: ps, top, htop", "Process control: kill, pkill, killall",
    "File editors: nano and vim basics", "Text processing: grep, sed, awk",
    "File archiving: tar, gzip, zip", "Environment variables and .bashrc",
    "Cron jobs and task scheduling", "SSH basics and key-based authentication",
    "System logs: journalctl, /var/log", "Disk usage: df, du, lsblk",
    "Network tools: ifconfig, ip, curl, wget"
  ]},
  { phase: "Networking Concepts", weeks: 2, tools: ["Wireshark", "TCP/IP"], color: "#8B5CF6", topics: [
    "OSI model: 7 layers explained", "TCP/IP model and how it differs from OSI",
    "IP addressing: IPv4 basics and classes", "Subnetting and CIDR notation",
    "IPv6 addressing basics", "DNS: how domain resolution works",
    "DHCP: dynamic IP assignment", "HTTP and HTTPS protocols",
    "FTP, SFTP, and SCP protocols", "SSH protocol deep dive",
    "Firewalls: iptables basics", "UFW: uncomplicated firewall setup",
    "Network troubleshooting: ping and traceroute", "netstat and ss commands"
  ]},
  { phase: "Version Control (Git)", weeks: 2, tools: ["Git", "GitHub", "GitLab"], color: "#10B981", topics: [
    "Git installation and configuration", "Git basics: init, clone, status",
    "Staging and committing changes", "Git log and history inspection",
    "Branching: create, switch, list branches", "Merging branches",
    "Resolving merge conflicts", "Remote repositories: push and pull",
    "Working with GitHub/GitLab", "Pull requests and code reviews",
    "Git Flow workflow", "GitHub Flow workflow",
    "Git tags and versioning", ".gitignore best practices"
  ]},
  { phase: "Python Programming", weeks: 5, tools: ["Python", "pip", "venv"], color: "#F59E0B", topics: [
    "Python installation and setup", "Variables, data types, and operators",
    "Strings and string methods", "Lists: creation, indexing, methods",
    "Dictionaries: key-value pairs", "Sets and tuples",
    "Conditional statements: if/elif/else", "Loops: for and while",
    "Functions: definition and calling", "Lambda functions",
    "Modules and packages", "File handling: read and write",
    "Error handling: try/except/finally", "List comprehensions",
    "The os module for system operations", "The subprocess module",
    "The sys module", "Working with JSON data",
    "Using requests library for HTTP", "Basic web scraping with BeautifulSoup",
    "Writing automation scripts", "Regex with re module",
    "Virtual environments with venv", "pip and package management",
    "Writing unit tests with unittest", "Intro to argparse for CLI tools",
    "Reading and writing CSV files", "Working with environment variables",
    "Logging in Python", "Basic API interaction with Python",
    "Intro to Paramiko for SSH automation", "Docker SDK for Python basics",
    "Python project structure", "Writing a deployment script",
    "Capstone: build a server health check script"
  ]},
  { phase: "Cloud Providers (AWS)", weeks: 5, tools: ["AWS", "EC2", "S3", "IAM", "VPC"], color: "#EF4444", topics: [
    "AWS account setup and console overview", "AWS global infrastructure: regions and AZs",
    "IAM: users, groups, and policies", "IAM roles and best practices",
    "EC2: launching your first instance", "EC2: instance types and pricing",
    "EC2: security groups and key pairs", "EC2: Elastic IPs and EBS volumes",
    "S3: buckets, objects, and storage classes", "S3: permissions and bucket policies",
    "S3: static website hosting", "VPC: creating a virtual private cloud",
    "VPC: subnets, route tables, internet gateways", "VPC: NAT gateways and private subnets",
    "RDS: launching a managed database", "RDS: backups and multi-AZ",
    "Lambda: serverless functions basics", "Lambda: triggers and event sources",
    "CloudWatch: metrics and alarms", "CloudWatch: log groups and insights",
    "Elastic Load Balancing basics", "Auto Scaling groups",
    "AWS CLI setup and configuration", "CloudFormation basics",
    "Route 53: DNS management", "SNS and SQS basics",
    "ECS: container service overview", "ECR: container registry",
    "AWS Cost Explorer and billing", "AWS Well-Architected Framework",
    "AWS Security best practices", "Capstone: deploy a web app on AWS",
    "Review and practice: AWS services quiz", "AWS certification prep overview",
    "Building a 3-tier architecture on AWS"
  ]},
  { phase: "Containerization (Docker)", weeks: 4, tools: ["Docker", "Docker Compose", "DockerHub"], color: "#06B6D4", topics: [
    "What is containerization and why Docker?", "Docker installation and setup",
    "Docker architecture: daemon, client, registry", "Running your first container: docker run",
    "Docker images: pull, list, remove", "Writing a Dockerfile",
    "Building custom Docker images", "Docker layers and caching",
    "Docker volumes for data persistence", "Bind mounts vs named volumes",
    "Docker networking: bridge, host, none", "Container networking and DNS",
    "Docker Compose: defining services", "Docker Compose: multi-container apps",
    "Docker Compose: networks and volumes", "Docker Hub: push and pull images",
    "Docker security best practices", "Multi-stage builds",
    "Docker health checks", "Debugging running containers",
    "Docker logs and monitoring", "Resource limits: CPU and memory",
    "Capstone: containerize a Python web app", "Docker in CI/CD pipelines",
    "Registry alternatives: ECR, GCR", "Docker Swarm basics",
    "Comparing containers vs VMs", "Container image scanning"
  ]},
  { phase: "CI/CD (Jenkins)", weeks: 4, tools: ["Jenkins", "GitLab CI", "CircleCI"], color: "#F97316", topics: [
    "CI/CD concepts and principles", "Jenkins installation on Linux",
    "Jenkins dashboard and plugin management", "Creating your first Jenkins job",
    "Freestyle vs pipeline jobs", "Declarative pipeline syntax",
    "Scripted pipeline syntax", "Jenkinsfile: stages and steps",
    "Integrating Git with Jenkins", "Triggering builds on push",
    "Environment variables in pipelines", "Parameterized builds",
    "Running unit tests in Jenkins", "Test reports and JUnit integration",
    "Building Docker images in Jenkins", "Pushing images to Docker Hub",
    "Deploying to staging environment", "Deployment approval gates",
    "Jenkins agents and distributed builds", "Jenkins credentials management",
    "Notifications: email and Slack", "Pipeline best practices",
    "GitLab CI/CD intro and .gitlab-ci.yml", "GitHub Actions overview",
    "CircleCI basics", "Comparing CI/CD tools",
    "Capstone: full CI/CD pipeline for a web app", "Pipeline as code best practices"
  ]},
  { phase: "Container Orchestration (K8s)", weeks: 6, tools: ["Kubernetes", "Helm", "kubectl"], color: "#6366F1", topics: [
    "Why Kubernetes? Problems it solves", "Kubernetes architecture overview",
    "Master node components: API server, etcd, scheduler", "Worker node components: kubelet, kube-proxy",
    "kubectl installation and configuration", "Namespaces in Kubernetes",
    "Pods: the smallest deployable unit", "Creating pods with YAML manifests",
    "Deployments: managing pod replicas", "ReplicaSets explained",
    "Services: ClusterIP, NodePort, LoadBalancer", "Ingress controllers and rules",
    "ConfigMaps: managing configuration", "Secrets: storing sensitive data",
    "Persistent Volumes and PVCs", "StorageClasses",
    "Horizontal Pod Autoscaler", "Vertical Pod Autoscaler basics",
    "Resource requests and limits", "Liveness and readiness probes",
    "Rolling updates and rollbacks", "DaemonSets and StatefulSets",
    "Jobs and CronJobs", "RBAC: roles and role bindings",
    "Network policies", "Service accounts",
    "Helm: package manager for Kubernetes", "Creating and using Helm charts",
    "Helm repositories and releases", "Kubernetes Dashboard",
    "Monitoring K8s with metrics-server", "kubectl debugging techniques",
    "Multi-cluster management basics", "Kubernetes in production: best practices",
    "Capstone: deploy a microservice app on K8s", "EKS: Kubernetes on AWS",
    "K8s security hardening", "GitOps with ArgoCD intro",
    "K8s networking deep dive", "Service mesh with Istio intro",
    "K8s logging with EFK stack", "Capstone: complete K8s project"
  ]},
  { phase: "Networking & Infrastructure", weeks: 4, tools: ["Nginx", "HAProxy", "Redis", "SSL/TLS"], color: "#84CC16", topics: [
    "Nginx: installation and basic configuration", "Nginx as a web server",
    "Nginx as a reverse proxy", "Nginx virtual hosts (server blocks)",
    "Nginx load balancing strategies", "Nginx caching configuration",
    "SSL/TLS: concepts and certificate types", "Setting up HTTPS with Let's Encrypt",
    "HAProxy: installation and setup", "HAProxy load balancing",
    "Forward proxies and their use cases", "Redis: installation and basics",
    "Redis as a caching layer", "Varnish cache overview",
    "Firewall configuration: iptables advanced", "UFW advanced rules",
    "AWS ELB: Application Load Balancer", "AWS ELB: Network Load Balancer",
    "DNS advanced: TTL, records types", "CDN concepts and Cloudflare basics",
    "Network performance tuning", "VPN basics and WireGuard intro",
    "Troubleshooting network issues", "Capstone: HA web setup with Nginx + HAProxy",
    "Security groups and network ACLs on AWS", "DDoS protection basics",
    "TCP tuning for performance", "Network monitoring with ntopng"
  ]},
  { phase: "Configuration Management", weeks: 4, tools: ["Ansible", "Puppet", "Chef"], color: "#EC4899", topics: [
    "Configuration management concepts", "Ansible: installation and setup",
    "Ansible inventory files", "Ansible ad-hoc commands",
    "Ansible playbooks: basics", "Ansible playbooks: variables",
    "Ansible modules: file, copy, template", "Ansible modules: service, package, user",
    "Ansible roles: structure and creation", "Ansible Galaxy",
    "Ansible Vault for secrets", "Ansible handlers and notify",
    "Ansible conditionals and loops", "Ansible tags",
    "Idempotency in Ansible", "Dynamic inventory",
    "Ansible with AWS (boto3)", "Ansible Tower/AWX overview",
    "Puppet: architecture and concepts", "Puppet manifests and modules",
    "Chef: cookbooks and recipes", "Chef resources",
    "Comparing Ansible vs Puppet vs Chef", "Capstone: configure a web server with Ansible",
    "Ansible for Docker management", "Testing Ansible roles with Molecule",
    "Ansible best practices", "Capstone: full infrastructure automation"
  ]},
  { phase: "Infrastructure as Code", weeks: 4, tools: ["Terraform", "CloudFormation", "Pulumi"], color: "#14B8A6", topics: [
    "IaC concepts and benefits", "Terraform: installation and setup",
    "Terraform providers and configuration", "Terraform resources and data sources",
    "Terraform plan, apply, destroy workflow", "Terraform state management",
    "Terraform variables and outputs", "Terraform modules",
    "Remote state with S3 and DynamoDB", "Terraform workspaces",
    "Terraform loops: count and for_each", "Terraform conditionals",
    "Terraform import existing infrastructure", "Terraform best practices",
    "AWS CloudFormation: stacks and templates", "CloudFormation parameters and outputs",
    "CloudFormation nested stacks", "Comparing Terraform vs CloudFormation",
    "Pulumi overview", "Terragrunt for Terraform at scale",
    "IaC security scanning with tfsec", "Sentinel policy as code",
    "Managing secrets in IaC", "Drift detection",
    "Capstone: full AWS infrastructure with Terraform", "IaC in CI/CD pipelines",
    "Multi-environment IaC setup", "Capstone: production-grade IaC project"
  ]},
  { phase: "Monitoring & Logging", weeks: 4, tools: ["Prometheus", "Grafana", "ELK Stack", "Fluentd"], color: "#A78BFA", topics: [
    "Observability: metrics, logs, traces", "Prometheus: installation and setup",
    "Prometheus metrics types: counter, gauge, histogram", "Prometheus exporters: Node Exporter",
    "Prometheus scrape configuration", "PromQL: basic queries",
    "PromQL: aggregation operators", "Alertmanager setup",
    "Alerting rules in Prometheus", "Grafana: installation and setup",
    "Grafana dashboards and panels", "Grafana data sources",
    "Grafana alerts", "Grafana variables and templating",
    "ELK Stack: Elasticsearch basics", "Elasticsearch indexing and search",
    "Logstash: data pipeline and filters", "Kibana: dashboards and visualizations",
    "Fluentd: log collection", "Fluent Bit: lightweight log processor",
    "Distributed tracing with Jaeger", "OpenTelemetry basics",
    "Kubernetes monitoring with Prometheus Operator", "Loki for log aggregation",
    "PagerDuty and on-call alerting", "SLOs, SLAs, and error budgets",
    "Capstone: full monitoring stack setup", "Capstone: production alerting system"
  ]}
];

function generateDays() {
  const days = [];
  let dayNum = 1;
  for (const phase of ROADMAP_DATA) {
    for (let t = 0; t < phase.topics.length && dayNum <= 365; t++, dayNum++) {
      const weekNum = Math.ceil(dayNum / 7);
      days.push({
        id: dayNum,
        phase: phase.phase,
        phaseColor: phase.color,
        tools: phase.tools,
        topic: phase.topics[t],
        week: weekNum,
        estimatedHours: Math.random() < 0.5 ? 3 : 4,
        xp: 10
      });
    }
  }
  while (days.length < 365) {
    days.push({
      id: days.length + 1,
      phase: "Advanced Practice",
      phaseColor: "#64748B",
      tools: ["Review", "Projects"],
      topic: `Advanced DevOps Project Day ${days.length + 1 - 310}`,
      week: Math.ceil((days.length + 1) / 7),
      estimatedHours: 4,
      xp: 10
    });
  }
  return days.slice(0, 365);
}

const ALL_DAYS = generateDays();
const LEVELS = [
  { name: "Beginner", min: 0, max: 200, icon: "🌱" },
  { name: "Learner", min: 200, max: 400, icon: "📚" },
  { name: "Explorer", min: 400, max: 600, icon: "🔍" },
  { name: "Builder", min: 600, max: 700, icon: "🔨" },
  { name: "Developer", min: 700, max: 800, icon: "💻" },
  { name: "Advanced Dev", min: 800, max: 900, icon: "🚀" },
  { name: "Future Engineer", min: 900, max: 1000, icon: "⭐" },
];

function getLevel(score) {
  return LEVELS.find(l => score >= l.min && score < l.max) || LEVELS[LEVELS.length - 1];
}

function getXpLevel(xp) {
  const lvls = [
    { name: "Beginner", min: 0, icon: "🌱" },
    { name: "Learner", min: 500, icon: "📚" },
    { name: "Explorer", min: 1500, icon: "🔍" },
    { name: "Builder", min: 3000, icon: "🔨" },
    { name: "Developer", min: 5000, icon: "💻" },
    { name: "Advanced Dev", min: 8000, icon: "🚀" },
    { name: "Future Engineer", min: 12000, icon: "⭐" },
  ];
  let lvl = lvls[0];
  for (const l of lvls) if (xp >= l.min) lvl = l;
  return lvl;
}

const MOTIVATIONAL = [
  "Great job Saravanan! 🎉", "You're one step closer to becoming a Developer!",
  "Consistency beats talent every time.", "Today's effort is tomorrow's success.",
  "Keep going! The journey of 365 days begins with one step.",
  "You're building something incredible!",
  "Every expert was once a beginner. Keep pushing!",
  "Your future self will thank you for this!",
];

const STORAGE_KEY = "saravanan_devops_journey";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function App() {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [completedDays, setCompletedDays] = useState({});
  const [inProgressDays, setInProgressDays] = useState({});
  const [notes, setNotes] = useState({});
  const [celebration, setCelebration] = useState(null);
  const [xp, setXp] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPhase, setFilterPhase] = useState("All");
  const [selectedDay, setSelectedDay] = useState(null);
  const [aiChat, setAiChat] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [streakData, setStreakData] = useState({ current: 0, longest: 0 });
  const aiEndRef = useRef(null);

  useEffect(() => {
    const saved = loadData();
    if (saved) {
      setCompletedDays(saved.completedDays || {});
      setInProgressDays(saved.inProgressDays || {});
      setNotes(saved.notes || {});
      setXp(saved.xp || 0);
      if (saved.loggedIn) { setLoggedIn(true); setPage("app"); }
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      saveData({ completedDays, inProgressDays, notes, xp, loggedIn: true });
      calcStreak();
    }
  }, [completedDays, inProgressDays, notes, xp, loggedIn]);

  useEffect(() => {
    if (aiEndRef.current) aiEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [aiChat]);

  function calcStreak() {
    const totalDone = Object.keys(completedDays).filter(k => completedDays[k]).length;
    const completedIds = Object.keys(completedDays).filter(k => completedDays[k]).map(Number).sort((a,b)=>a-b);
    let cur = 0, longest = 0, streak = 0;
    for (let i = 0; i < completedIds.length; i++) {
      if (i === 0 || completedIds[i] === completedIds[i-1] + 1) { streak++; }
      else { streak = 1; }
      longest = Math.max(longest, streak);
    }
    setStreakData({ current: streak, longest });
  }

  function handleLogin() {
    if (loginPass === "Saravanan@365" || loginPass === "devops365" || loginPass === "password") {
      setLoggedIn(true);
      setPage("app");
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Try: Saravanan@365");
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    setPage("login");
    setLoginPass("");
    saveData({ completedDays, inProgressDays, notes, xp, loggedIn: false });
  }

  function toggleComplete(dayId) {
    const wasComplete = completedDays[dayId];
    const newCompleted = { ...completedDays, [dayId]: !wasComplete };
    setCompletedDays(newCompleted);
    if (!wasComplete) {
      let bonus = 10;
      const day = ALL_DAYS[dayId - 1];
      const weekDays = ALL_DAYS.filter(d => d.week === day.week);
      const allWeekDone = weekDays.every(d => newCompleted[d.id]);
      if (allWeekDone) bonus += 100;
      setXp(prev => prev + bonus);
      const msg = MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)];
      setCelebration({ msg, bonus });
      setTimeout(() => setCelebration(null), 3500);
    } else {
      setXp(prev => Math.max(0, prev - 10));
    }
  }

  function toggleInProgress(dayId) {
    setInProgressDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  }

  async function askAI(prompt) {
    if (!prompt.trim()) return;
    const userMsg = { role: "user", content: prompt };
    setAiChat(prev => [...prev, userMsg]);
    setAiInput("");
    setAiLoading(true);
    try {
      const contextDay = selectedDay ? `The user is studying Day ${selectedDay.id}: "${selectedDay.topic}" in the "${selectedDay.phase}" phase.` : "The user is on a 365-day DevOps learning journey.";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are an expert DevOps tutor helping Saravanan on his 365-day DevOps journey. ${contextDay} Be concise, practical, and motivating. Format your responses with clear sections. Suggest resources when helpful.`,
          messages: [...aiChat, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "Sorry, I couldn't respond right now.";
      setAiChat(prev => [...prev, { role: "assistant", content: text }]);
    } catch {
      setAiChat(prev => [...prev, { role: "assistant", content: "Network error. Please check your connection and try again." }]);
    }
    setAiLoading(false);
  }

  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const devScore = Math.min(1000, Math.round((completedCount / 365) * 1000));
  const xpLevel = getXpLevel(xp);
  const scoreLevel = getLevel(devScore);

  const phases = ["All", ...ROADMAP_DATA.map(p => p.phase)];
  const filteredDays = ALL_DAYS.filter(d => {
    const matchSearch = d.topic.toLowerCase().includes(searchQuery.toLowerCase()) || d.phase.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPhase = filterPhase === "All" || d.phase === filterPhase;
    return matchSearch && matchPhase;
  });

  const bg = darkMode ? "#0F0F1A" : "#F8FAFC";
  const cardBg = darkMode ? "#1A1A2E" : "#FFFFFF";
  const cardBg2 = darkMode ? "#16213E" : "#F1F5F9";
  const text = darkMode ? "#E2E8F0" : "#1E293B";
  const textMuted = darkMode ? "#94A3B8" : "#64748B";
  const border = darkMode ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.15)";
  const accent = "#6366F1";
  const accent2 = "#8B5CF6";

  const styles = {
    app: { minHeight: "100vh", background: bg, color: text, fontFamily: "'Inter', system-ui, sans-serif", fontSize: "14px" },
    card: { background: cardBg, borderRadius: "16px", border: `1px solid ${border}`, padding: "20px" },
    card2: { background: cardBg2, borderRadius: "12px", border: `1px solid ${border}`, padding: "16px" },
    btn: { background: `linear-gradient(135deg, ${accent}, ${accent2})`, color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: "14px" },
    btnOutline: { background: "transparent", color: accent, border: `1px solid ${accent}`, borderRadius: "10px", padding: "8px 16px", cursor: "pointer", fontWeight: 500, fontSize: "13px" },
    input: { background: cardBg2, border: `1px solid ${border}`, borderRadius: "10px", padding: "10px 14px", color: text, width: "100%", fontSize: "14px", outline: "none" },
    pill: (color) => ({ background: color + "22", color: color, borderRadius: "20px", padding: "3px 10px", fontSize: "11px", fontWeight: 600, display: "inline-block" }),
    progressBar: (pct, color) => ({
      height: "8px", borderRadius: "4px", background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      overflow: "hidden", position: "relative"
    }),
    navItem: (active) => ({
      display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
      borderRadius: "10px", cursor: "pointer", fontWeight: active ? 600 : 400,
      background: active ? accent + "22" : "transparent",
      color: active ? accent : textMuted, fontSize: "13px",
      border: "none", width: "100%", textAlign: "left", transition: "all 0.2s"
    }),
  };

  if (page === "login") {
    return (
      <div style={{ ...styles.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "linear-gradient(135deg, #0F0F1A 0%, #1A1A3E 50%, #0F0F1A 100%)" }}>
        <div style={{ width: "100%", maxWidth: "420px", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🚀</div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>DevOps Journey 365</h1>
            <p style={{ color: "#94A3B8", margin: 0 }}>Your personal path to becoming a DevOps engineer</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "20px", padding: "32px" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#94A3B8", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Username</label>
              <input style={{ ...styles.input, background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(99,102,241,0.3)" }} value="Saravanan" readOnly />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "#94A3B8", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Password</label>
              <input type="password" style={{ ...styles.input, background: "rgba(255,255,255,0.07)", color: "#fff", border: `1px solid ${loginError ? "#EF4444" : "rgba(99,102,241,0.3)"}` }}
                value={loginPass} onChange={e => setLoginPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Enter password (Saravanan@365)" />
              {loginError && <p style={{ color: "#EF4444", fontSize: "12px", margin: "6px 0 0" }}>{loginError}</p>}
            </div>
            <button style={{ ...styles.btn, width: "100%", padding: "14px", fontSize: "15px" }} onClick={handleLogin}>
              Begin My DevOps Journey →
            </button>
            <p style={{ color: "#475569", fontSize: "11px", textAlign: "center", marginTop: "16px" }}>
              Hint: password is <code style={{ color: "#6366F1" }}>Saravanan@365</code>
            </p>
          </div>
          <p style={{ textAlign: "center", color: "#475569", fontSize: "12px", marginTop: "20px" }}>
            Progress is saved automatically across sessions
          </p>
        </div>
      </div>
    );
  }

  const weeklyGroups = {};
  for (const d of ALL_DAYS) {
    if (!weeklyGroups[d.week]) weeklyGroups[d.week] = [];
    weeklyGroups[d.week].push(d);
  }

  return (
    <div style={styles.app}>
      {celebration && (
        <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", borderRadius: "16px", padding: "20px 28px", color: "#fff", boxShadow: "0 20px 60px rgba(99,102,241,0.5)", animation: "slideIn 0.3s ease", maxWidth: "300px" }}>
          <div style={{ fontSize: "28px", marginBottom: "6px" }}>🎉</div>
          <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{celebration.msg}</div>
          <div style={{ fontSize: "13px", opacity: 0.9 }}>+{celebration.bonus} XP earned!</div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #6366F133; border-radius: 3px; }
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .nav-item:hover { background: rgba(99,102,241,0.1) !important; }
        .day-card:hover { transform: translateY(-2px); transition: transform 0.2s; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { background: rgba(99,102,241,0.1) !important; }
        input:focus { outline: 2px solid #6366F1 !important; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <div style={{ width: "220px", background: cardBg, borderRight: `1px solid ${border}`, padding: "20px 12px", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px", padding: "0 4px" }}>
            <div style={{ fontSize: "28px", animation: "float 3s ease-in-out infinite" }}>🚀</div>
            <div style={{ fontWeight: 700, fontSize: "13px", color: text, lineHeight: 1.3 }}>Saravanan</div>
            <div style={{ fontSize: "11px", color: accent }}>{xpLevel.icon} {xpLevel.name}</div>
            <div style={{ background: accent + "22", borderRadius: "20px", padding: "2px 10px", fontSize: "11px", color: accent, marginTop: "4px", display: "inline-block" }}>{xp.toLocaleString()} XP</div>
          </div>
          {[
            { id: "dashboard", icon: "📊", label: "Dashboard" },
            { id: "roadmap", icon: "🗺️", label: "Roadmap" },
            { id: "calendar", icon: "📅", label: "Calendar" },
            { id: "stats", icon: "📈", label: "Statistics" },
            { id: "ai", icon: "🤖", label: "AI Assistant" },
          ].map(tab => (
            <button key={tab.id} className="nav-item" style={styles.navItem(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              <span>{tab.icon}</span><span>{tab.label}</span>
            </button>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: `1px solid ${border}` }}>
            <button className="tab-btn" style={{ ...styles.navItem(false), justifyContent: "center" }} onClick={() => setDarkMode(d => !d)}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button className="tab-btn" style={{ ...styles.navItem(false), justifyContent: "center", color: "#EF4444" }} onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", background: bg }}>

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 4px", color: text }}>Welcome back, Saravanan! 👋</h1>
                <p style={{ color: textMuted, margin: 0 }}>Your DevOps journey continues. Keep the momentum going!</p>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                {[
                  { label: "Total Days", value: 365, icon: "📅", color: "#6366F1" },
                  { label: "Completed", value: completedCount, icon: "✅", color: "#10B981" },
                  { label: "Remaining", value: 365 - completedCount, icon: "⏳", color: "#F59E0B" },
                  { label: "Current Streak", value: `${streakData.current}d`, icon: "🔥", color: "#EF4444" },
                  { label: "Longest Streak", value: `${streakData.longest}d`, icon: "⚡", color: "#8B5CF6" },
                  { label: "XP Earned", value: xp.toLocaleString(), icon: "💎", color: "#06B6D4" },
                ].map(stat => (
                  <div key={stat.label} style={{ ...styles.card, textAlign: "center" }}>
                    <div style={{ fontSize: "24px", marginBottom: "8px" }}>{stat.icon}</div>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "11px", color: textMuted, marginTop: "2px" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                {/* Developer Score */}
                <div style={styles.card}>
                  <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: textMuted }}>Developer Score</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ position: "relative", width: "100px", height: "100px", flexShrink: 0 }}>
                      <svg viewBox="0 0 100 100" style={{ width: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="10" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke={`url(#grad${devScore})`} strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 42 * devScore / 1000} ${2 * Math.PI * 42 * (1 - devScore / 1000)}`}
                          strokeLinecap="round" />
                        <defs>
                          <linearGradient id={`grad${devScore}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: "20px", fontWeight: 700, color: accent }}>{devScore}</div>
                        <div style={{ fontSize: "9px", color: textMuted }}>/ 1000</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: text }}>{scoreLevel.icon} {scoreLevel.name}</div>
                      <div style={{ color: textMuted, fontSize: "12px", marginTop: "4px" }}>Score: {devScore}/1000</div>
                      <div style={{ marginTop: "12px" }}>
                        {LEVELS.map(l => (
                          <div key={l.name} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: devScore >= l.min ? accent : (darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)") }} />
                            <span style={{ fontSize: "10px", color: devScore >= l.min ? text : textMuted }}>{l.name}</span>
                            <span style={{ fontSize: "10px", color: textMuted, marginLeft: "auto" }}>{l.min}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Progress */}
                <div style={styles.card}>
                  <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: textMuted }}>Overall Progress</h3>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", color: text }}>Completion</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: accent }}>{Math.round(completedCount / 365 * 100)}%</span>
                    </div>
                    <div style={styles.progressBar()}>
                      <div style={{ position: "absolute", inset: 0, background: (darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"), borderRadius: "4px" }} />
                      <div style={{ height: "8px", borderRadius: "4px", background: "linear-gradient(90deg, #6366F1, #8B5CF6)", width: `${completedCount / 365 * 100}%`, transition: "width 0.5s" }} />
                    </div>
                  </div>
                  {ROADMAP_DATA.map(phase => {
                    const phaseDays = ALL_DAYS.filter(d => d.phase === phase.phase);
                    const phaseDone = phaseDays.filter(d => completedDays[d.id]).length;
                    const pct = phaseDays.length ? Math.round(phaseDone / phaseDays.length * 100) : 0;
                    return (
                      <div key={phase.phase} style={{ marginBottom: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                          <span style={{ fontSize: "11px", color: textMuted }}>{phase.phase.replace(" (", " (").split(" ").slice(0,2).join(" ")}</span>
                          <span style={{ fontSize: "11px", color: phase.color }}>{pct}%</span>
                        </div>
                        <div style={{ height: "4px", borderRadius: "2px", background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: phase.color, borderRadius: "2px", transition: "width 0.5s" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Continue Learning */}
              <div style={styles.card}>
                <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: textMuted }}>Continue Learning</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
                  {ALL_DAYS.filter(d => !completedDays[d.id]).slice(0, 6).map(d => (
                    <div key={d.id} className="day-card" style={{ ...styles.card2, cursor: "pointer", borderLeft: `3px solid ${d.phaseColor}` }}
                      onClick={() => { setSelectedDay(d); setActiveTab("roadmap"); }}>
                      <div style={{ display: "flex", justify: "space-between", alignItems: "flex-start", gap: "8px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "10px", color: textMuted, marginBottom: "4px" }}>Day {d.id} • Week {d.week}</div>
                          <div style={{ fontSize: "13px", fontWeight: 500, color: text, lineHeight: 1.4 }}>{d.topic}</div>
                          <div style={{ marginTop: "6px" }}><span style={styles.pill(d.phaseColor)}>{d.phase.split(" ")[0]}</span></div>
                        </div>
                        <button style={{ ...styles.btn, padding: "6px 12px", fontSize: "11px", flexShrink: 0 }} onClick={e => { e.stopPropagation(); toggleComplete(d.id); }}>
                          Done
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ROADMAP */}
          {activeTab === "roadmap" && (
            <div>
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>365-Day Roadmap</h2>
                <div style={{ marginLeft: "auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <input style={{ ...styles.input, width: "200px" }} placeholder="🔍 Search topics..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                  <select style={{ ...styles.input, width: "180px" }} value={filterPhase} onChange={e => setFilterPhase(e.target.value)}>
                    {phases.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              {selectedDay && (
                <div style={{ ...styles.card, marginBottom: "20px", borderLeft: `4px solid ${selectedDay.phaseColor}`, position: "relative" }}>
                  <button style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", color: textMuted, cursor: "pointer", fontSize: "18px" }} onClick={() => setSelectedDay(null)}>✕</button>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", color: textMuted, marginBottom: "6px" }}>Day {selectedDay.id} • Week {selectedDay.week} • Est. {selectedDay.estimatedHours}h</div>
                      <h3 style={{ margin: "0 0 8px", color: text, fontSize: "18px" }}>{selectedDay.topic}</h3>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                        <span style={styles.pill(selectedDay.phaseColor)}>{selectedDay.phase}</span>
                        {selectedDay.tools.map(t => <span key={t} style={styles.pill("#6366F1")}>{t}</span>)}
                      </div>
                      <textarea style={{ ...styles.input, height: "80px", resize: "vertical", fontSize: "13px" }}
                        placeholder="Add your notes, key takeaways, links..."
                        value={notes[selectedDay.id] || ""}
                        onChange={e => setNotes(prev => ({ ...prev, [selectedDay.id]: e.target.value }))} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
                      <button style={{ ...styles.btn, padding: "10px 16px" }} onClick={() => toggleComplete(selectedDay.id)}>
                        {completedDays[selectedDay.id] ? "✅ Completed" : "Mark Complete"}
                      </button>
                      <button style={styles.btnOutline} onClick={() => toggleInProgress(selectedDay.id)}>
                        {inProgressDays[selectedDay.id] ? "🟡 In Progress" : "Start Learning"}
                      </button>
                      <button style={styles.btnOutline} onClick={() => {
                        setAiChat([]);
                        setAiInput(`Explain "${selectedDay.topic}" in the context of DevOps. Give me a study plan, key concepts, and suggest 3 YouTube videos and 2 mini projects.`);
                        setActiveTab("ai");
                      }}>
                        🤖 Ask AI
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "10px" }}>
                {filteredDays.map(day => {
                  const done = completedDays[day.id];
                  const inProg = inProgressDays[day.id];
                  const status = done ? "completed" : inProg ? "in-progress" : "pending";
                  return (
                    <div key={day.id} className="day-card" style={{
                      ...styles.card2, cursor: "pointer",
                      borderLeft: `3px solid ${done ? "#10B981" : inProg ? "#F59E0B" : day.phaseColor}`,
                      opacity: done ? 0.75 : 1,
                    }} onClick={() => setSelectedDay(day)}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "10px", color: textMuted, marginBottom: "3px" }}>Day {day.id} • Wk {day.week}</div>
                          <div style={{ fontSize: "12px", fontWeight: 500, color: text, lineHeight: 1.4, marginBottom: "6px" }}>{day.topic}</div>
                          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                            <span style={{ ...styles.pill(done ? "#10B981" : inProg ? "#F59E0B" : "#64748B"), fontSize: "10px" }}>
                              {done ? "✅ Done" : inProg ? "🟡 Active" : "⚪ Pending"}
                            </span>
                            <span style={{ fontSize: "10px", color: textMuted }}>⏱ {day.estimatedHours}h</span>
                          </div>
                        </div>
                        <button style={{
                          width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0, marginLeft: "8px",
                          background: done ? "#10B981" : "transparent",
                          border: `2px solid ${done ? "#10B981" : border}`,
                          cursor: "pointer", color: done ? "#fff" : textMuted, fontSize: "12px",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }} onClick={e => { e.stopPropagation(); toggleComplete(day.id); }}>
                          {done ? "✓" : "○"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CALENDAR */}
          {activeTab === "calendar" && (
            <div>
              <h2 style={{ margin: "0 0 20px", fontSize: "20px", fontWeight: 700 }}>365-Day Calendar</h2>
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                {[["#10B981", "Completed"], ["#F59E0B", "In Progress"], ["#EF4444", "Pending"]].map(([c, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: c }} />
                    <span style={{ fontSize: "12px", color: textMuted }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={styles.card}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3px" }}>
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                    <div key={d} style={{ textAlign: "center", fontSize: "10px", color: textMuted, padding: "4px 0", fontWeight: 600 }}>{d}</div>
                  ))}
                  {ALL_DAYS.map(day => {
                    const done = completedDays[day.id];
                    const inProg = inProgressDays[day.id];
                    return (
                      <div key={day.id} title={`Day ${day.id}: ${day.topic}`}
                        onClick={() => { setSelectedDay(day); setActiveTab("roadmap"); }}
                        style={{
                          aspectRatio: "1", borderRadius: "4px", cursor: "pointer",
                          background: done ? "#10B981" : inProg ? "#F59E0B" : (darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"),
                          border: `1px solid ${done ? "#059669" : inProg ? "#D97706" : border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "9px", color: done || inProg ? "#fff" : textMuted,
                          transition: "transform 0.1s"
                        }}>
                        {day.id}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STATS */}
          {activeTab === "stats" && (
            <div>
              <h2 style={{ margin: "0 0 20px", fontSize: "20px", fontWeight: 700 }}>Statistics & Progress</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div style={styles.card}>
                  <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: textMuted }}>Phase Progress</h3>
                  {ROADMAP_DATA.map(phase => {
                    const phaseDays = ALL_DAYS.filter(d => d.phase === phase.phase);
                    const done = phaseDays.filter(d => completedDays[d.id]).length;
                    const pct = phaseDays.length ? Math.round(done / phaseDays.length * 100) : 0;
                    return (
                      <div key={phase.phase} style={{ marginBottom: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "12px", color: text }}>{phase.phase}</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: phase.color }}>{done}/{phaseDays.length}</span>
                        </div>
                        <div style={{ height: "6px", borderRadius: "3px", background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: phase.color, borderRadius: "3px", transition: "width 0.5s" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={styles.card}>
                  <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: textMuted }}>XP & Level Progress</h3>
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <div style={{ fontSize: "40px" }}>{xpLevel.icon}</div>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: accent }}>{xpLevel.name}</div>
                    <div style={{ color: textMuted, fontSize: "13px" }}>{xp.toLocaleString()} Total XP</div>
                  </div>
                  {[
                    { name: "🌱 Beginner", xpNeeded: 0 },
                    { name: "📚 Learner", xpNeeded: 500 },
                    { name: "🔍 Explorer", xpNeeded: 1500 },
                    { name: "🔨 Builder", xpNeeded: 3000 },
                    { name: "💻 Developer", xpNeeded: 5000 },
                    { name: "🚀 Advanced Dev", xpNeeded: 8000 },
                    { name: "⭐ Future Engineer", xpNeeded: 12000 },
                  ].map(l => (
                    <div key={l.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <div style={{ fontSize: "11px", color: xp >= l.xpNeeded ? text : textMuted, width: "130px", flexShrink: 0 }}>{l.name}</div>
                      <div style={{ flex: 1, height: "4px", borderRadius: "2px", background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: xp >= l.xpNeeded ? "100%" : `${Math.min(100, xp / l.xpNeeded * 100)}%`, background: xp >= l.xpNeeded ? "#10B981" : accent, borderRadius: "2px" }} />
                      </div>
                      <span style={{ fontSize: "10px", color: textMuted, width: "50px", textAlign: "right" }}>{l.xpNeeded.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                {[
                  { label: "Total Study Hours", value: `${completedCount * 3.5}h`, icon: "⏱️", color: "#6366F1" },
                  { label: "Completion Rate", value: `${Math.round(completedCount / 365 * 100)}%`, icon: "📊", color: "#10B981" },
                  { label: "Days This Week", value: ALL_DAYS.filter(d => d.week === Math.ceil(Math.max(1,...Object.keys(completedDays).filter(k=>completedDays[k]).map(Number)) / 7) && completedDays[d.id]).length, icon: "📆", color: "#F59E0B" },
                  { label: "Current Streak", value: `${streakData.current} days`, icon: "🔥", color: "#EF4444" },
                  { label: "Longest Streak", value: `${streakData.longest} days`, icon: "⚡", color: "#8B5CF6" },
                  { label: "Developer Score", value: `${devScore}/1000`, icon: "🎯", color: "#06B6D4" },
                ].map(s => (
                  <div key={s.label} style={{ ...styles.card, textAlign: "center" }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: "11px", color: textMuted, marginTop: "4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI ASSISTANT */}
          {activeTab === "ai" && (
            <div style={{ height: "calc(100vh - 48px)", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "16px" }}>
                <h2 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700 }}>🤖 AI Study Assistant</h2>
                <p style={{ color: textMuted, margin: 0, fontSize: "13px" }}>Ask anything about DevOps, topics, study plans, projects, or resources.</p>
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                {[
                  "Explain Kubernetes pods",
                  "Create a study plan for Docker",
                  "Suggest mini projects for CI/CD",
                  "What YouTube channels for DevOps?",
                  "How to get AWS certified?",
                ].map(q => (
                  <button key={q} style={{ ...styles.btnOutline, fontSize: "11px", padding: "5px 10px" }} onClick={() => { setAiInput(q); }}>
                    {q}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, ...styles.card, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1, overflowY: "auto", padding: "8px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {aiChat.length === 0 && (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: textMuted }}>
                      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤖</div>
                      <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px", color: text }}>Your DevOps AI Tutor</div>
                      <div style={{ fontSize: "13px" }}>Ask me anything — I'll explain topics, create study plans, suggest YouTube videos, and recommend mini projects!</div>
                    </div>
                  )}
                  {aiChat.map((msg, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                      <div style={{
                        maxWidth: "85%", padding: "12px 16px", borderRadius: "14px",
                        background: msg.role === "user" ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : cardBg2,
                        color: msg.role === "user" ? "#fff" : text,
                        fontSize: "13px", lineHeight: 1.6,
                        whiteSpace: "pre-wrap", wordBreak: "break-word"
                      }}>
                        {msg.role === "assistant" && <div style={{ fontSize: "10px", color: textMuted, marginBottom: "6px" }}>🤖 AI Tutor</div>}
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0" }}>
                      <div style={{ ...styles.card2, padding: "12px 16px", display: "flex", gap: "4px" }}>
                        {[0, 0.2, 0.4].map(d => (
                          <div key={d} style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, animation: `pulse 1s ${d}s infinite` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={aiEndRef} />
                </div>
                <div style={{ paddingTop: "12px", borderTop: `1px solid ${border}`, display: "flex", gap: "8px" }}>
                  <input style={{ ...styles.input, flex: 1 }}
                    value={aiInput} onChange={e => setAiInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && askAI(aiInput)}
                    placeholder="Ask about any DevOps topic... (Enter to send)" />
                  <button style={{ ...styles.btn, padding: "10px 20px", flexShrink: 0 }} onClick={() => askAI(aiInput)} disabled={aiLoading}>
                    {aiLoading ? "⌛" : "Send"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
