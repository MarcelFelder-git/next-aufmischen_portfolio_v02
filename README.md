# AUFMISCHEN – Artist Portfolio Engine 🚀🎵

A modern, highly optimized, headless portfolio website built for **AUFMISCHEN** (Producer, Mixing/Mastering Engineer, and Artist). The application decouples the content management from the presentation layer, delivering a blazing-fast user experience with an interactive UI.

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (React)
- **Content Management System:** Sanity CMS (Headless)
- **Styling:** Responsive Layout, Modular Design
- **Deployment & Hosting:** Vercel

---

## ✨ Features & Architecture

- **Headless Content Delivery:** Fully integrated with Sanity CMS. Audio references, project categories, upcoming events, and biography texts are pulled dynamically via structured GROQ queries.
- **Dynamic Modular Sections:** Fully responsive structure separating content into Work, About, Events, and Contact.
- **Asset Optimization:** Built-in Next.js image and asset optimization, fetching dynamically managed media smoothly from the Sanity CDN.
- **Production-Ready Core:** Designed with a scalable component structure to easily repurpose the layout engine for other artists or music professionals.

---

## 🛑 Project Status Disclaimer

This project was developed as a comprehensive contract work up to a 100% production-ready state. Due to client-side internal shifts and communication freezes prior to deployment, the site was not officially launched to the custom domain. It is hosted here as a fully functional, open-source showcase demonstrating advanced Next.js dynamic rendering and Headless CMS architectures.

---

## 🚀 Getting Started & Local Setup

### Step 1: Clone the repository

```bash 
git clone https://github.com/MarcelFelder-git/next-aufmischen_portfolio_v02.git
cd next-aufmischen_portfolio_v02

### Step 2: Install project dependencies

npm install

### Step 3: Set up Environment Variables

Create a file named .env.local in the root directory and insert your Sanity credentials:

NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

### Step 4: Run the local development server

npm run dev

Open http://localhost:3000 in your browser to see the results.

---

## 🎨 Schema Architecture (Sanity Studio)

The underlying CMS backend is modeled specifically to represent music production and live events:

- **track / work:** Fields for audio player links, artwork, credit descriptions (Producing, Mixing, Mastering), and artist names.
- **about:** Rich text block for bio updates along with dynamic hero image synchronization.
- **events:** Dynamic calendar entries handling tour dates or DJ gigs.
