# 🎯 CareerTwin AI

### AI-Powered Career Readiness & Employability Platform

*From career aspiration to prerequisite diagnosis, personalized learning, measurable progress, and job-aligned skill evidence.*

**Built for the MPOnline Hackathon — _Innovate for Madhya Pradesh. Build for Viksit Bharat._**

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Problem Statement](#-problem-statement)
3. [Our Solution](#-our-solution)
4. [Core Innovation: Prerequisite-Aware Diagnosis](#-core-innovation-prerequisite-aware-diagnosis)
5. [How CareerTwin Works](#-how-careertwin-works)
6. [Features](#-features)
7. [Architecture](#-architecture)
8. [AI + Deterministic Intelligence](#-ai--deterministic-intelligence)
9. [Tech Stack](#-tech-stack)
10. [Project Structure](#-project-structure)
11. [Installation Guide](#-installation-guide)
12. [Available Scripts](#-available-scripts)
13. [Deployment](#-deployment)
14. [Troubleshooting](#-troubleshooting)
15. [Roadmap](#-roadmap)
16. [Contributing](#-contributing)
17. [Responsible Design & Limitations](#-responsible-design--limitations)
18. [Acknowledgements](#-acknowledgements)

---

## 🌟 Overview

Career preparation is usually fragmented across career-guidance sites, learning platforms, assessment tools, job portals, and resume builders. A learner may know **what** they want to become, yet still be unsure:

- What skills are actually required?
- Which skills do I already have?
- Which foundational concepts am I missing?
- What should I learn first, and what can I safely skip?
- How do my skills line up with a specific job?
- How can I *show* the skills I've built?

**CareerTwin AI** connects all of these stages into one continuous, measurable workflow:

```
DIAGNOSE  →  DEVELOP  →  PROVE  →  UPDATE
```

| Stage | What happens |
|-------|--------------|
| **Diagnose** | Understand current capabilities, skills, and prerequisite gaps |
| **Develop** | Generate a personalized learning path from the learner's current state |
| **Prove** | Track assessments, learning progress, projects, and other evidence |
| **Update** | Continuously refresh the learner's CareerTwin as new evidence arrives |

> 🔗 **Live demo:** <https://careertwinai.vercel.app/>

---

## ❓ Problem Statement

Students and early-career learners often sit in the gap between:

> *"I want to become this."*  and  *"I know exactly what I need to do next."*

Learners typically get lists of skills or courses, but no shared representation of their **evolving** capability. As a result they struggle to know:

1. Their current capability level
2. The prerequisite concepts behind difficult skills
3. Which learning activity should come next
4. Whether learning actually improved their capability
5. How their skills align with a particular job requirement
6. What evidence demonstrates their progress

CareerTwin AI closes this gap by linking **diagnosis → learning → validation → job alignment**.

---

## 💡 Our Solution

CareerTwin AI builds a dynamic **CareerTwin** for every learner — a structured profile that evolves as they learn and demonstrate new capabilities. It can represent:

- 🎯 Target Career
- 🧩 Required Skills
- 🔗 Prerequisite Relationships
- 📝 Assessment Results
- 🕳️ Skill Gaps
- 📈 Learning Progress
- 💼 Target Job Requirements
- 🗂️ Skill Evidence

The CareerTwin answers four practical questions:

> **What do I know today?** · **What may be missing?** · **What should I learn next?** · **How can I demonstrate my progress?**

---

## 🚀 Core Innovation: Prerequisite-Aware Diagnosis

A conventional assessment says: *"SQL is weak."*

CareerTwin goes one level deeper by examining the **prerequisite concepts** behind a skill:

```
Data Analyst → SQL → JOINs → Database Relationships → Primary Keys / Foreign Keys
```

If a learner struggles with SQL JOIN questions, the system inspects the prerequisite concepts and may surface:

> **Potential Root Gap: Database Relationships**

The learner is then guided toward the foundation *before* continuing with advanced SQL practice.

> ⚠️ **Why "Potential" Root Gap?**
> A prerequisite relationship is a *modeled learning dependency*, not scientifically proven causality for an individual learner. The wording is intentional and honest.

---

## 🔄 How CareerTwin Works

```
Career Goal
    ↓
Career & Skill Mapping
    ↓
Prerequisite Readiness Assessment
    ↓
Adaptive Assessment
    ↓
Skill & Prerequisite Analysis
    ↓
Potential Root Gap
    ↓
Personalized Curriculum
    ↓
Learning & Practice
    ↓
Reassessment
    ↓
Updated CareerTwin
    ↓
Target Job Skill Match
    ↓
Skill Passport
```

This forms a **feedback loop** — assessment and learning evidence continuously update the learner's CareerTwin.

The prototype implements one complete vertical slice:

**Student Profile → Target Career → Prerequisite Assessment → Adaptive Questions → Skill & Prerequisite Map → Potential Root Gap → Personalized Curriculum → Reassessment → CareerTwin Dashboard → Target Job Match → Skill Passport**

---

## ✨ Features

### 1. 🎯 Career Goal Selection
The learner begins by choosing a target career (e.g., **Data Analyst**). The platform maps that career to its relevant skills and prerequisite concepts.

### 2. 🧪 Prerequisite Readiness Assessment
Assessment goes beyond broad skill labels. Each question can be tagged with:

- Skill
- Prerequisite
- Difficulty
- Question type
- Expected concept
- Scoring information

This lets the system understand competency at **multiple levels** — not just "SQL", but the concepts underneath it.

### 3. 🎚️ Adaptive Assessment
The assessment path adjusts to learner performance:

- **Strong performance** → more advanced questions
- **Weak performance** → prerequisite checks are triggered
- **Weak prerequisites too** → foundational learning is recommended

Core assessment behavior uses **structured, deterministic logic** so results are traceable.

### 4. 🗺️ Skill & Prerequisite Map
Relationships between career skills and foundational concepts are represented explicitly. Example for **Data Analyst**:

```
Data Analyst
├── SQL
│   ├── SELECT
│   ├── Filtering
│   ├── Aggregation
│   └── JOINs
│       └── Database Relationships
│           ├── Primary Keys
│           └── Foreign Keys
├── Excel
├── Statistics
└── Data Visualization
```

### 5. 🔍 Potential Root Gap Detection
When a learner struggles with an advanced concept, the system walks the prerequisite graph:

```
SQL JOIN difficulty → Prerequisite Analysis → Database Relationships → Potential Root Gap
```

It then recommends foundational learning before advanced practice.

### 6. 📚 Personalized Curriculum
The learning path is built from the learner's **current state**.

| Skill | Status |
|-------|--------|
| Python | Strong |
| Excel | Moderate |
| SQL | Developing |
| Statistics | Moderate |

**Potential gap:** Database Relationships

**Recommended sequence:**
1. Database Fundamentals
2. Primary and Foreign Keys
3. Database Relationships
4. SQL JOINs
5. SQL Practice
6. Data Analysis Exercise

Where competency is already demonstrated, the system recommends **reducing unnecessary repetition**.

### 7. 🔁 Reassessment & Progress Tracking
Learning is always followed by reassessment:

```
Initial Assessment → Learning → Practice → Reassessment → Updated Skill State → Updated Curriculum
```

This makes CareerTwin a **dynamic system**, not a one-time quiz.

### 8. 💼 Target Job Skill Matching
Compare a target job description against the learner's current skill profile:

```
Job Description → Required Skills → Skill Extraction → Skill Normalization
   → CareerTwin Skills → Potential Skill Gaps → Learning Actions
```

**Example**

| Job Requires | CareerTwin Profile |
|--------------|--------------------|
| SQL | ✅ Demonstrated |
| Excel | ✅ Demonstrated |
| Power BI | 🟡 Developing |
| Statistics | 🟡 Developing |
| — | Python — Demonstrated |

Identified gaps are connected directly to learning actions.

> CareerTwin performs **skill alignment**. It does **not** predict or guarantee hiring outcomes.

### 9. 🧬 CareerTwin Dashboard
The central view of the learner's evolving career-readiness state:

- Target Career
- Current Skills
- Prerequisite Gaps
- Assessment History
- Learning Progress
- Target Job Alignment
- Evidence

Unlike a static resume, it **evolves** as the learner grows.

### 10. 🛂 Skill Passport
An **evidence-oriented skill profile**. Instead of claiming *"I know SQL"*, the Skill Passport shows:

```
SQL
Status:   Developing
Evidence: • Diagnostic Assessment
          • SQL Practice
          • Learning Completion
          • Project Evidence
```

Future versions can support richer evidence such as projects, practical exercises, and portfolio links.

> The Skill Passport is **not** presented as an external certification.

---

## 🏗️ Architecture

CareerTwin AI follows a **modular hybrid architecture** so components can evolve independently.

| Layer | Responsibility |
|-------|----------------|
| **Presentation** | React + TypeScript + Vite, TanStack-based routing, reusable UI components |
| **Application** | Assessment, Career Mapping, Curriculum, Job Matching, CareerTwin Dashboard, Skill Passport |
| **Intelligence** | Deterministic assessment logic, structured skill relationships, curriculum rules, AI-assisted extraction/generation, personalization |
| **Data** | Student profiles, skills, prerequisites, assessments, responses, progress, learning activities, job requirements, evidence, Skill Passport data *(structured demo data in the prototype; persistence in production)* |

---

## 🤖 AI + Deterministic Intelligence

CareerTwin deliberately avoids making every feature depend on AI.

> **Design principle:** *AI should enhance the decision-support layer, not replace deterministic product logic.*

**Deterministic logic** (traceable, repeatable) handles:

- Assessment scoring
- Prerequisite relationships
- Skill-gap calculations
- Readiness calculations
- Progress tracking
- Curriculum ordering
- Evidence tracking

**AI-assisted functions** (where language understanding helps) handle:

- Resume skill extraction
- Job description parsing
- Natural-language feedback
- Personalized explanations
- Question generation
- Recommendation refinement

This keeps core logic auditable and enables **deterministic fallback** whenever an external AI service is unavailable.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + `tw-animate-css` |
| Components | [Radix UI](https://www.radix-ui.com/) primitives, shadcn/ui-style components, `cmdk`, `vaul`, `sonner`, `embla-carousel` |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Forms & Validation | React Hook Form + [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Tooling | ESLint 9, Prettier, Bun |
| Server Runtime | [Nitro](https://nitro.build/) |
| Assessment Logic | Deterministic scoring |
| Skill Mapping | Structured skill/prerequisite data |
| Curriculum | Rule-based personalization |
| AI | Selective AI assistance |

---

## 📁 Project Structure

```
careertwin_ai/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level views
│   ├── routes/             # TanStack Router route definitions
│   ├── features/
│   │   ├── assessment/     # Prerequisite & adaptive assessment
│   │   ├── career/         # Career & skill mapping
│   │   ├── curriculum/     # Personalized learning paths
│   │   ├── job-match/      # Target job skill matching
│   │   ├── dashboard/      # CareerTwin dashboard
│   │   └── passport/       # Skill Passport
│   ├── lib/
│   │   ├── assessment/     # Scoring & adaptive logic
│   │   ├── career/         # Skill/prerequisite graph logic
│   │   ├── curriculum/     # Curriculum rules
│   │   └── ai/             # AI-assisted helpers
│   ├── data/               # Structured demo data
│   └── types/              # Shared TypeScript types
├── .gitignore
├── .prettierignore
├── .prettierrc
├── bun.lock
├── bunfig.toml
├── components.json         # shadcn/ui configuration
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

> The `src/` layout above describes the intended feature-based organization. Actual folder contents may vary slightly as the project evolves.

---

## 🛠️ Installation Guide

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | v20.19+ (v22 LTS recommended) | Required by Vite 8 |
| **Bun** | Latest | Recommended (repo ships a `bun.lock`) |
| **npm / pnpm / yarn** | Any recent | Alternative to Bun |
| **Git** | Any recent | To clone the repository |

Check your versions:

```bash
node -v
bun -v      # optional if using npm
git --version
```

### Step 1 — Clone the repository

```bash
git clone https://github.com/Isg-23/careertwin_ai.git
cd careertwin_ai
```

### Step 2 — Install dependencies

**Using Bun (recommended):**

```bash
bun install
```

**Using npm (alternative):**

```bash
npm install
```

<details>
<summary>Don't have Bun? Install it here</summary>

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Or via npm
npm install -g bun
```

</details>

### Step 3 — (Optional) Configure environment variables

The prototype is designed to run using **deterministic logic and structured demo data**, so no keys are required for the core flow.

If you connect an external AI provider for the AI-assisted features (resume/job-description extraction, feedback, question generation), create a `.env` file in the project root:

```bash
cp .env.example .env   # if an example file exists, otherwise create .env manually
```

```env
# Example only — use the variable names your AI integration expects
AI_API_KEY=your_api_key_here
```

> 🔒 Never commit `.env` files or API keys. `.env` is already covered by `.gitignore` in most setups — verify before pushing.

### Step 4 — Start the development server

```bash
bun run dev
# or
npm run dev
```

Open the local URL printed in your terminal (typically **http://localhost:3000** or **http://localhost:5173**).

### Step 5 — Build for production

```bash
bun run build
# or
npm run build
```

### Step 6 — Preview the production build locally

```bash
bun run preview
# or
npm run preview
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite dev` | Start the development server with HMR |
| `build` | `vite build` | Create an optimized production build |
| `build:dev` | `vite build --mode development` | Build in development mode (unminified, easier debugging) |
| `preview` | `vite preview` | Serve the production build locally |
| `lint` | `eslint .` | Lint the codebase |
| `format` | `prettier --write .` | Auto-format all files with Prettier |

Run any script with `bun run <script>` or `npm run <script>`.

---

## ☁️ Deployment

The project is deployed on **Vercel**: <https://careertwinai.vercel.app/>

To deploy your own copy:

1. Push your fork to GitHub.
2. Import the repository on [Vercel](https://vercel.com/new).
3. Use the default Vite/Nitro detection (build command: `bun run build` or `npm run build`).
4. Add any required environment variables under **Project Settings → Environment Variables**.
5. Click **Deploy**.

Because the app builds through Nitro, it can also target other platforms (Netlify, Cloudflare, Node server, etc.) by configuring the appropriate Nitro preset.

---

## 🩺 Troubleshooting

| Problem | Fix |
|---------|-----|
| `Unsupported engine` / Vite fails to start | Upgrade Node.js to **v20.19+** (v22 LTS recommended) |
| `bun: command not found` | Install Bun (see Step 2) or use `npm install` instead |
| Dependency conflicts with npm | Try `npm install --legacy-peer-deps`, or use Bun which matches the lockfile |
| Port already in use | Stop the other process, or run `bun run dev -- --port 3001` |
| Stale/odd build behavior | Delete `node_modules` and lockfile cache, then reinstall: `rm -rf node_modules && bun install` |
| Lint/format errors on commit | Run `bun run format` then `bun run lint` |

---

## 🗺️ Roadmap

- [ ] Persistent backend & database for profiles, assessments, and evidence
- [ ] User authentication and multi-learner support
- [ ] Support for more career paths beyond Data Analyst
- [ ] Larger, expert-reviewed question banks per skill and prerequisite
- [ ] Resume upload with AI-assisted skill extraction
- [ ] Richer evidence types: projects, practical exercises, portfolio links
- [ ] Shareable / exportable Skill Passport
- [ ] Multilingual support (including Hindi) for wider accessibility across Madhya Pradesh
- [ ] Educator / institution dashboards
- [ ] Integration with real course catalogs and job portals

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Format & lint:** `bun run format && bun run lint`
5. **Push** the branch: `git push origin feature/your-feature-name`
6. **Open** a Pull Request describing your changes

Please keep changes within the existing Vite + React + TypeScript + TanStack architecture rather than migrating to another framework.

---

## ⚖️ Responsible Design & Limitations

CareerTwin AI is a **prototype** built to demonstrate a workflow. To stay honest and trustworthy:

- **"Potential Root Gap"** reflects a modeled prerequisite dependency — not proven causality.
- **Job matching** is skill alignment only — it does **not** predict or guarantee hiring outcomes.
- **Skill Passport** is an evidence-oriented profile — it is **not** an external certification.
- **Core logic is deterministic**, and AI is used only to assist, with fallback behavior when AI is unavailable.

---

## 🙏 Acknowledgements

- **MPOnline Hackathon** — *Innovate for Madhya Pradesh. Build for Viksit Bharat.*
- [TanStack](https://tanstack.com/), [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), [Recharts](https://recharts.org/), and [Lucide](https://lucide.dev/) for the tooling and components that made this possible.

---

<div align="center">

**Made with ❤️ by THE HOPE TRACERS**

*If you found this project useful, consider giving it a ⭐*

</div>
