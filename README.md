# Kape Kanato · ADDC3LL Web Prototype

> **A proposed interactive Coffee Education & Sensory Platform for the Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL).**

---

## 📌 Prototype Notice

This repository contains a **working functional prototype and proof-of-concept website** designed for the **Ateneo de Davao University (AdDU)** community, Mindanao agricultural stakeholders, and specialty coffee enthusiasts.

* **Initiative:** Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL)
* **Parent Institution:** [Ateneo de Davao University](https://www.addu.edu.ph/)
* **Partner Organization:** Mindanao Coffee Network (MCN)
* **Location:** Marilog, Davao City, Philippines
* **Intellectual Property:** Registered with the Intellectual Property Office of the Philippines (IPOPHL) under Class 40 for coffee roasting and processing (February 27, 2026 – 2036).

> [!NOTE]
> This prototype is created for educational, research, and demonstration purposes. Official publications, schedules, and verified institutional services are managed directly by Ateneo de Davao University and the ADDC3LL laboratory team.

---

## ☕ What is "Kape Kanato"?

*"Kape Kanato"* is Cebuano/Bisaya for **"Our Coffee"**. It represents the shared identity, agricultural heritage, and community spirit of coffee cultivated across the mountains of Mindanao.

Mindanao produces over **70% to 80%** of the Philippines' total coffee harvest. This platform translates university research, post-harvest science, and sensory cupping protocols into an engaging, accessible digital guide for:
1. **Ateneo Students, Faculty & Researchers:** Connecting classroom theory to field applications, thesis projects, and campus sensory labs.
2. **Home Brewers & Coffee Enthusiasts:** Demystifying grind sizes, brew ratios, water temperatures, and tasting notes.
3. **Mindanao Coffee Farming Partners:** Celebrating indigenous farming cooperatives across Mount Apo, Bukidnon, and Sultan Kudarat.

---

## ✨ Interactive Features & Modules

### 1. Interactive Brewing Lab
* **Live Brew Ratio & Water Calculator:** Dial in exact doses (g), brew ratios (1:10 to 1:20), and calculate total water, bloom amounts, and beverage yields across 6 methods (*Hario V60*, *French Press*, *AeroPress*, *Cold Brew*, *Moka Pot*, and *Kape Kaldero*).
* **Live Step-by-Step Brew Assistant:** Real-time countdown timer with stage instructions (Bloom, Main Pours, Drawdown) and synthesized audio chimes generated via the Web Audio API.
* **Espresso Drink Visualizer:** Dynamic cross-section cup visualizer comparing liquid proportions, milk textures, and caffeine content for 8 classic cafe drinks.

### 2. Philippine Origins & Terroir Explorer
* **Regional Coffee Directory:** Profiles highlighting Mount Apo (BACOFA), Bukidnon (MILALITTRA), Sultan Kudarat (KFAC Fine Robusta), Sulu (Kahawa Sug), Batangas/Cavite (Kapeng Barako), and Benguet.
* **Sensory Flavor Matcher:** Select tasting notes (*Strawberry*, *Wild Honey*, *Jasmine*, *Jackfruit*, *Dark Chocolate*) to discover matching Philippine origins and cooperatives.

### 3. Coffee Fundamentals & Botany
* **Cherry Anatomy Explorer:** Interactive inspection of each botanical layer (Skin, Pulp, Mucilage, Parchment, Silverskin, and Seed).
* **Four Species Botanical Comparison:** Side-by-side breakdown of *Coffea arabica*, *Coffea canephora* (Robusta), *Coffea liberica* (Barako), and *Coffea excelsa*.
* **Historical Timeline:** The journey of coffee from ancient Ethiopia to the 1740 Batangas coffee boom and modern Mindanao specialty initiatives.

### 4. Farm-to-Cup Stepper & Roasting Science
* **6-Stage Production Journey:** Interactive stepper covering Cultivation, Selective Harvesting, Post-Harvest Processing (Washed, Natural, Honey, Anaerobic), Dry Milling, Roasting, and SCA Cupping.
* **Roast Profile Visualizer:** Compare Light (City), Medium (Full City), and Dark (French) roasts with temperature benchmarks and First/Second Crack markers.

### 5. Barista & Coffee IQ Quiz
* **10-Question Interactive Quiz:** Immediate educational explanations on bean biology, roasting physics, and Philippine coffee history.
* **Certificate Distinction:** Custom badges (*Master Cupper & Mindanao Coffee Champion*, *Specialty Barista Practitioner*) with a one-click score sharing tool.

### 6. A–Z Coffee Glossary & Global Quick Search
* **Search Modal (`⌘K`):** Instant search indexing articles, regions, brewing methods, and glossary definitions.
* **Glossary A–Z:** 25+ curated definitions covering SCA cupping terminology and Filipino heritage terms.
* **Bookmarking System:** Save articles to a personal reading list stored in `localStorage`.

### 7. About ADDC3LL
* **Institutional Profile:** Overview of the laboratory's three core pillars:
  1. *Academic Research & Innovation*
  2. *Training & Technology Transfer*
  3. *Agro-enterprise Development*
* **Intellectual Property Documentation:** Details on the IPOPHL Class 40 trademark registration.
* **Inquiry Form:** Working collaboration form for students, researchers, and coffee producers.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Client Components)
* **UI Library:** [React 18](https://react.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom warm coffee palette: `#2B1D16` espresso, `#5A3825` roast, `#B98556` caramel, `#F7F2EA` oat, `#FFFCF7` cream)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Audio:** Web Audio API (Synthesized tone chimes without external audio dependencies)
* **Persistence:** Browser `localStorage` (Reading bookmarks)

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.17+ or Node.js 20+ installed
* npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/kape-kanato.git
   cd kape-kanato
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Project Structure

```text
kape-kanato/
├── app/
│   ├── components/
│   │   ├── views/
│   │   │   ├── HomeView.jsx            # AdDU & ADDC3LL centered overview
│   │   │   ├── FundamentalsView.jsx    # Cherry anatomy & 4 species comparison
│   │   │   ├── FarmToCupView.jsx       # 6-stage production & roast degrees
│   │   │   ├── BrewingView.jsx         # Brewing encyclopedia & extraction theory
│   │   │   ├── PhilippineCoffeeView.jsx# Regional directory & map profiles
│   │   │   ├── QuizView.jsx            # 10-question Coffee IQ quiz & badges
│   │   │   └── AboutAddc3llView.jsx    # Verified ADDC3LL institutional profile
│   │   ├── ArticleModal.jsx            # Long-form article reader with bookmarks
│   │   ├── BrewCalculator.jsx          # Live ratio & water yield calculator
│   │   ├── BrewTimerModal.jsx          # Stage-by-stage pour timer with audio
│   │   ├── DrinkVisualizer.jsx         # Layered espresso drink cross-section
│   │   ├── FlavorWheelExplorer.jsx     # Sensory flavor-to-origin matcher
│   │   ├── Footer.jsx                  # Academic & community credits
│   │   ├── GlossaryModal.jsx           # Searchable A-Z coffee dictionary
│   │   ├── Navbar.jsx                  # Clean editorial minimalist navigation
│   │   └── SearchModal.jsx             # Global Cmd+K quick search
│   ├── data/
│   │   ├── articles.js                 # Educational long-form articles
│   │   ├── brewingMethods.js           # Method parameters & pour steps
│   │   ├── glossary.js                 # 25+ coffee terms & definitions
│   │   ├── quiz.js                     # 10 quiz questions & explanations
│   │   └── regions.js                  # Mindanao & Philippine origin profiles
│   ├── globals.css                     # Custom coffee scrollbars & typography
│   ├── layout.jsx                      # Root layout & page metadata
│   └── page.jsx                        # Main state router & modal orchestrator
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 📜 Credits & Acknowledgments

* **Ateneo de Davao University (ADDU)** — For institutional research, community engagement initiatives, and leadership in Mindanao agriculture.
* **Mindanao Coffee Network (MCN)** — Partner organization advancing sustainable coffee value chains in Mindanao.
* **Engr. Francis Christopher C. Bation & Team** — Commended by ADDU for their dedication to the ADDC3LL laboratory.
* **ADDU Innovation and Technology Support Office (ITSO)** — Facilitating intellectual property protection and technology transfer.
* **Mindanao Smallholder Farmers & Cooperatives** — Especially the indigenous Bagobo-Tagabawa farmers of Mount Apo (BACOFA) and the Talaandig coffee growers of Bukidnon (MILALITTRA).

---

*Developed with pride for the Ateneo de Davao community and Philippine coffee heritage.*

