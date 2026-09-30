# CareerTwin AI

## AI-Powered Career Readiness & Employability Platform

> From career aspiration to prerequisite diagnosis, personalized learning, measurable progress, and job-aligned skill evidence.

CareerTwin AI is an AI-assisted career readiness and employability platform designed to help learners understand their current capabilities, identify skill and prerequisite gaps, receive personalized learning recommendations, measure progress, and align their skills with real-world job requirements.

Developed as a prototype for the **MPOnline Hackathon** under the theme:

> **Innovate for Madhya Pradesh. Build for Viksit Bharat.**

---

## Overview

Career preparation is often fragmented across career guidance platforms, learning platforms, assessment tools, job portals, and resume builders.

A learner may know the career they want but still struggle to understand:

- What skills are actually required?
- Which skills do they already have?
- Which prerequisite concepts are missing?
- What should they learn first?
- Which topics can they skip because they already demonstrate competency?
- How do their skills align with a specific job?
- How can they demonstrate the skills they have developed?

CareerTwin AI connects these stages into a continuous career-readiness workflow.

The platform is built around four stages:

**DIAGNOSE → DEVELOP → PROVE → UPDATE**

- **Diagnose:** Understand current capabilities, skills, and prerequisite gaps.
- **Develop:** Generate a personalized learning path based on the learner's current state.
- **Prove:** Track assessments, learning progress, projects, and other evidence.
- **Update:** Continuously update the learner's CareerTwin as new evidence becomes available.

The goal is to transform career preparation from a generic learning journey into a measurable and personalized progression.

---

## Problem Statement

Students and early-career learners frequently face a gap between:

> "I want to become this."

and:

> "I know exactly what I need to do next."

Existing digital platforms can address individual parts of career preparation, but the overall journey can remain disconnected.

A learner may have access to:

- Career guidance
- Online courses
- Skill assessments
- Job portals
- Resume builders
- Learning platforms

However, these experiences may not share a common representation of the learner's evolving capabilities.

As a result, learners may receive lists of skills or courses without clearly understanding:

1. Their current capability level.
2. The prerequisite concepts behind difficult skills.
3. Which learning activity should come next.
4. Whether learning has improved their capability.
5. How their skills align with a particular job requirement.
6. What evidence can demonstrate their progress.

CareerTwin AI addresses this gap by connecting diagnosis, learning, validation, and job alignment into one continuous workflow.

---

## Our Solution

CareerTwin AI creates a dynamic **CareerTwin** for each learner.

The CareerTwin can represent:

- Target Career
- Required Skills
- Prerequisite Relationships
- Assessment Results
- Skill Gaps
- Learning Progress
- Target Job Requirements
- Skill Evidence

This creates a structured learner profile that evolves as the learner learns and demonstrates new capabilities.

CareerTwin is designed around four practical questions:

> **What do I know today?**

> **What may be missing?**

> **What should I learn next?**

> **How can I demonstrate my progress?**

---

## Core Innovation

### Prerequisite-Aware Career Readiness

The central innovation of CareerTwin AI is the use of **prerequisite-aware diagnosis** within a career-readiness workflow.

A conventional assessment may identify:

> "SQL is weak."

CareerTwin attempts to go one level deeper by examining relevant prerequisite concepts.

For example:

**Data Analyst → SQL → JOINs → Database Relationships → Primary Keys / Foreign Keys**

If a learner struggles with SQL JOIN-related questions, the system can inspect prerequisite concepts such as database relationships.

It may then surface:

> **Potential Root Gap: Database Relationships**

The learner can then be guided toward foundational concepts before continuing with more advanced SQL practice.

### Important Distinction

CareerTwin uses the term **Potential Root Gap** intentionally.

A prerequisite relationship represents a learning dependency modeled by the system. It does not establish scientifically proven causality for an individual learner.

---

## How CareerTwin Works

The complete CareerTwin workflow is:

**Career Goal**

↓

**Career & Skill Mapping**

↓

**Prerequisite Readiness Assessment**

↓

**Adaptive Assessment**

↓

**Skill & Prerequisite Analysis**

↓

**Potential Root Gap**

↓

**Personalized Curriculum**

↓

**Learning & Practice**

↓

**Reassessment**

↓

**Updated CareerTwin**

↓

**Target Job Skill Match**

↓

**Skill Passport**

This creates a feedback loop in which assessment and learning evidence can continuously update the learner's CareerTwin.

---

## Key Features

### 1. Career Goal Selection

The learner begins by selecting a target career.

Example:

**Target Career: Data Analyst**

The platform maps the target career to relevant skills and prerequisite concepts.

---

### 2. Prerequisite Readiness Assessment

The platform assesses more than broad skill labels.

Assessment questions can be associated with:

- Skill
- Prerequisite
- Difficulty
- Question type
- Expected concept
- Scoring information

This enables the system to understand competency at multiple levels.

---

### 3. Adaptive Assessment

CareerTwin can adjust the assessment path based on learner performance.

Strong performance can lead to more advanced questions.

Weak performance can trigger prerequisite checks.

If prerequisite performance is also weak, the system can recommend foundational learning.

The prototype uses structured and deterministic logic for core assessment behavior.

---

### 4. Skill and Prerequisite Map

CareerTwin represents relationships between career skills and foundational concepts.

Example:

**Data Analyst**

- SQL
  - SELECT
  - Filtering
  - Aggregation
  - JOINs
    - Database Relationships
      - Primary Keys
      - Foreign Keys
- Excel
- Statistics
- Data Visualization

This allows learning recommendations to consider dependencies between concepts.

---

### 5. Potential Root Gap Detection

When a learner struggles with an advanced concept, the system can inspect relevant prerequisite concepts.

Example:

**SQL JOIN difficulty → Prerequisite Analysis → Database Relationships → Potential Root Gap**

The system can then recommend foundational learning before advanced practice.

---

### 6. Personalized Curriculum

The learning path is based on the learner's current state.

Example:

- Python — Strong
- Excel — Moderate
- SQL — Developing
- Statistics — Moderate

Potential gap:

**Database Relationships**

Recommended sequence:

1. Database Fundamentals
2. Primary and Foreign Keys
3. Database Relationships
4. SQL JOINs
5. SQL Practice
6. Data Analysis Exercise

Where competency has already been demonstrated, the system can recommend reducing unnecessary repetition.

---

### 7. Reassessment and Progress

Learning is followed by reassessment.

The learning loop is:

**Initial Assessment → Learning → Practice → Reassessment → Updated Skill State → Updated Curriculum**

This makes the system dynamic rather than a one-time assessment tool.

---

### 8. Target Job Skill Matching

CareerTwin can compare a target job description with the learner's current skill profile.

The process is:

**Job Description → Required Skills → Skill Extraction → Skill Normalization → CareerTwin Skills → Potential Skill Gaps → Learning Actions**

Example:

**Target Job Requirements**

- SQL
- Excel
- Power BI
- Statistics

**CareerTwin Profile**

- SQL — Demonstrated
- Excel — Demonstrated
- Python — Demonstrated
- Power BI — Developing
- Statistics — Developing

The identified skill gaps can then be connected to learning actions.

> CareerTwin performs skill alignment. It does not predict or guarantee hiring outcomes.

---

## CareerTwin Profile

The CareerTwin is the central representation of the learner's evolving career-readiness state.

It can contain:

- Target Career
- Current Skills
- Prerequisite Gaps
- Assessment History
- Learning Progress
- Target Job Alignment
- Evidence

Unlike a static resume, the CareerTwin is intended to evolve as the learner develops and demonstrates new capabilities.

---

## Skill Passport

The Skill Passport is an **evidence-oriented skill profile**.

Instead of simply stating:

> "I know SQL."

the Skill Passport can represent:

**SQL**

**Status:** Developing

**Evidence:**

- Diagnostic Assessment
- SQL Practice
- Learning Completion
- Project Evidence

Future versions can support richer evidence such as:

- Projects
- Assessment results
- Practical exercises
- Learning completion
- Portfolio links

The Skill Passport is not presented as an external certification.

---

## Product Workflow

The prototype focuses on one complete vertical slice:

**Student Profile → Target Career → Prerequisite Assessment → Adaptive Questions → Skill & Prerequisite Map → Potential Root Gap → Personalized Curriculum → Reassessment → CareerTwin Dashboard → Target Job Match → Skill Passport**

The primary value comes from connecting these stages rather than treating them as independent features.

---

## Architecture

CareerTwin AI follows a modular hybrid architecture.

### Presentation Layer

The current prototype uses:

- React
- TypeScript
- Vite
- TanStack-based routing
- Reusable UI components

### Application Layer

The major product capabilities include:

- Assessment
- Career Mapping
- Curriculum
- Job Matching
- CareerTwin Dashboard
- Skill Passport

### Intelligence Layer

The intelligence layer combines:

- Deterministic assessment logic
- Structured skill relationships
- Curriculum rules
- AI-assisted extraction
- AI-assisted generation
- Personalization

### Data Layer

A production implementation can persist:

- Student Profiles
- Skills
- Prerequisites
- Assessments
- Responses
- Progress
- Learning Activities
- Job Requirements
- Evidence
- Skill Passport Data

The architecture is designed to remain modular so that individual components can evolve independently.

---

## AI and Deterministic Intelligence

CareerTwin deliberately avoids making every feature dependent on AI.

### Deterministic Logic

Used for:

- Assessment scoring
- Prerequisite relationships
- Skill-gap calculations
- Readiness calculations
- Progress tracking
- Curriculum ordering
- Evidence tracking

### AI-Assisted Functions

Used where language understanding or personalization is useful:

- Resume skill extraction
- Job description parsing
- Natural-language feedback
- Personalized explanations
- Question generation
- Recommendation refinement

### Design Principle

> **AI should enhance the decision-support layer, not replace deterministic product logic.**

This approach makes the core product logic more traceable and allows deterministic fallback behavior when an external AI service is unavailable.

---

## Technology Stack

| Layer | Technology / Approach |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | TanStack-based architecture |
| UI | Reusable component system |
| Assessment | Deterministic scoring logic |
| Skill Mapping | Structured skill/prerequisite data |
| Curriculum | Rule-based personalization |
| AI | Selective AI assistance |
| Data | Structured prototype/demo data |

> The current repository is a Vite + React + TypeScript application with an existing TanStack-based architecture. The project is intended to be extended within this architecture rather than unnecessarily migrated to another framework.

---

## Project Structure

The project is organized around product capabilities.

```text
src/
├── components/
├── pages/
├── routes/
├── features/
│   ├── assessment/
│   ├── career/
│   ├── curriculum/
│   ├── job-match/
│   ├── dashboard/
│   └── passport/
├── lib/
│   ├── assessment/
│   ├── career/
│   ├── curriculum/
│   └── ai/
├── data/
└── types/
