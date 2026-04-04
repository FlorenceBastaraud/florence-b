# mywebsite-v2

Personal portfolio website — v2. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and GSAP animations.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP 3
- **Runtime:** Node.js

## Features

- Hero section with typed greeting animation
- About, Career, and Skills sections
- Projects showcase with modal view and data driven from `public/data/projects.json`
- Language switch (multilingual support)
- Custom cursor
- Responsive layout

## Project structure

```
app/          # Next.js App Router pages and layout
components/   # React components (Hero, Projects, Career, Skills, etc.)
context/      # React context providers
hooks/        # Custom React hooks
public/
  data/       # Static JSON data (projects)
  images/     # Project thumbnails and assets
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
