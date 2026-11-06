# ApparxMath

A scalable mathematics learning platform for Cambodian students, teachers, and schools.

## Current stage

This repository contains the initial Next.js application foundation:
- Next.js App Router + TypeScript
- Tailwind CSS
- Shared site header and footer
- Public landing page and starter routes
- Initial Grade 11 course catalogue
- Placeholder account and teacher pages (authentication and data storage are not active)

The course list is a working content map, not a verified claim of complete official curriculum coverage. Validate chapter sequence and content against the current Cambodian textbook before publication.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Planned: Supabase Auth + Postgres, row-level security, KaTeX

## Run locally

1. Install Node.js (current LTS).
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open `http://localhost:3000`

## Planned architecture

```text
src/
  app/                 Route pages and global styles
  components/          Shared UI
  features/
    auth/               Authentication flows (planned)
    courses/            Curriculum and lesson experiences (planned)
    practice/           Exercises and quizzes (planned)
    progress/            Student progress (planned)
    classrooms/          Teacher classroom tools (planned)
    schools/             Multi-school management (planned)
  lib/
    supabase/            Database and auth clients (planned)
    permissions/         Role and access helpers (planned)
  types/                 Shared domain types (planned)
```

## Product roles (planned)

- Student: courses, practice, saved progress, quiz history
- Teacher: classes, assignments, assessment and feedback
- School administrator: school membership, staff, classes and reports
- Platform administrator: curriculum, platform configuration and oversight

## Security principles

- Enforce authorization on the server and in the database; never rely on hiding UI.
- Use school-scoped access and database row-level security for tenant isolation.
- Keep student data minimal and define retention and deletion policies.
- Do not store secrets in source control. Use environment variables.
- Review privacy, consent, and safeguarding requirements before onboarding minors.

## Development roadmap

1. Application foundation and design system
2. Curriculum content model and Grade 11 lessons
3. Supabase authentication and student progress
4. Teacher workspace and assessment tools
5. Multi-school administration and reporting
6. More grades, subjects, and mobile improvements
