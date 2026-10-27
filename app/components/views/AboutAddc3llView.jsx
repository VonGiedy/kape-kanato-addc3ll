"use client";
import React, { useState } from 'react';
import { 
  Info, MapPin, Award, CheckCircle2, 
  Send, Users, BookOpen, Coffee, Sparkles, 
  ShieldCheck, ExternalLink, Calendar, FileText,
  FlaskConical, School, Target, TrendingUp, Mail, Layers
} from 'lucide-react';

export default function AboutAddc3llView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    areaOfInterest: 'Coffee Processing & Fermentation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const OBJECTIVES = [
    {
      num: 1,
      title: "Processing Studies Lab",
      desc: "Establish a dedicated laboratory for coffee and cacao processing studies."
    },
    {
      num: 2,
      title: "R&D for Quality & Consistency",
      desc: "Facilitate research and development to improve the quality and consistency of coffee and cacao products through innovative post-harvest processes (e.g. fermentation and drying processes)."
    },
    {
      num: 3,
      title: "Farmer Training & Education",
      desc: "Provide training and education for local farmers, producers, and other industry stakeholders across Mindanao."
    },
    {
      num: 4,
      title: "Multi-Sectoral Partnerships",
      desc: "Partner with universities, research institutions, coffee and cacao industry stakeholders, and government agencies to leverage resources and expertise."
    },
    {
      num: 5,
      title: "Sustainable & Fair-Trade Practices",
      desc: "Support sustainable agricultural practices and fair-trade initiatives that protect biodiversity and uplift rural livelihoods."
    }
  ];

  const COFFEE_PROGRAMS = [
    { stage: "Processing", items: "Drying, Hulling, Milling" },
    { stage: "Fermentation", items: "Controlled aerobic, anaerobic, and innovative yeast trials" },
    { stage: "Quality Control", items: "SCA Green Grading & Cupping evaluation" },
    { stage: "Roasting", items: "Thermodynamic profiling and sample roasting" },
    { stage: "Packaging & Storage", items: "Reposo moisture stabilization and barrier packaging" },
    { stage: "Marketing", items: "Connecting specialty producers with local and regional markets" }
  ];

  const CACAO_PROGRAMS = [
    { stage: "Processing", items: "Fermentation box protocols, drying, winnowing, grinding" },
    { stage: "Fermentation", items: "Microbiological tracking of flavor precursors" },
    { stage: "Quality Control", items: "Cut-test defect analysis & sensory evaluation" },
    { stage: "Roasting", items: "Bean roasting for artisanal chocolate and tablea" },
    { stage: "Packaging & Storage", items: "Moisture-controlled preservation" },
    { stage: "Marketing", items: "Promoting Davao and Mindanao single-estate cacao" }
  ];

  const FACILITIES = [
    {
      title: "Research Laboratory",
      icon: FlaskConical,
      badge: "Scientific Analysis",
      desc: "Equipped with specialized tools for fermentation analysis, microbial tracking, moisture/water activity measurement, and post-harvest processing studies."
    },
    {
      title: "Training Center",
      icon: School,
      badge: "Education & Capacity",
      desc: "Classroom and hands-on training facility for educational workshops, barista instruction, cupping sessions, and producer research programs."
    },
    {
      title: "Experimental Farms",
      icon: Layers,
      badge: "Field Trials",
      desc: "Dedicated agricultural acreage for field trials, shade canopy agroforestry studies, and demonstration of engineering solutions for sustainable practices."
    }
  ];

  const EXPECTED_OUTCOMES = [
    {
      title: "Enhanced Quality & Value",
      desc: "Upgrading cup profiles and consistency of Mindanao coffee and cacao products to achieve specialty grade benchmarks."
    },
    {
      title: "Increased Marketability & Export",
      desc: "Expanding domestic visibility and international export potential for Davao and Mindanao single-origin lots."
    },
    {
      title: "Improved Farmer Livelihoods",
      desc: "Empowering smallholders and indigenous communities through direct access to better, high-value processing methods."
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-espresso text-cream py-14 px-6 sm:px-12 rounded-3xl shadow-lg border border-border/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-roast text-caramel text-xs font-semibold px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider">
            Ateneo de Davao University Initiative · Prototype
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            About ADDC3LL
          </h1>
          <p className="text-base sm:text-lg text-oat/90 leading-relaxed">
            The <strong>Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL)</strong> is a university-based research, training, and innovation facility located in <strong>Marilog, Davao City</strong>. It connects academic science with grassroots development across Mindanao's coffee and cacao sectors.
          </p>
        </div>
      </div>

      {/* Prototype Disclaimer */}
      <div className="bg-amber-50 border border-amber-200/90 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm text-espresso/90 flex items-start gap-3 shadow-sm">
        <Info size={20} className="text-amber-800 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-950 font-bold block">
            Academic Prototype & Proof-of-Concept Notice:
          </strong>
          <p className="leading-relaxed">
            This website is an independent educational web prototype illustrating digital tools and curriculum resources for ADDC3LL. It is <strong>not an official Ateneo de Davao University portal</strong>. For official university inquiries and publications, please visit <a href="https://www.addu.edu.ph" target="_blank" rel="noreferrer" className="underline font-bold text-amber-900 hover:text-espresso">addu.edu.ph</a>.
          </p>
        </div>
      </div>

      {/* Institutional Overview Quick Facts */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-roast mb-4">
          Institutional Profile & Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-oat rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Official Name</span>
            <span className="font-bold text-espresso">Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory</span>
          </div>
          <div className="p-4 bg-oat rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Parent Institution</span>
            <span className="font-bold text-espresso">Ateneo de Davao University (ADDU)</span>
          </div>
          <div className="p-4 bg-oat rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Physical Location</span>
            <span className="font-bold text-espresso">Marilog, Davao City, Philippines</span>
          </div>
          <div className="p-4 bg-oat rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Primary Sectors</span>
            <span className="font-bold text-espresso">Coffee & Cacao Value Chains</span>
          </div>
        </div>
      </section>

      {/* 5 Official Objectives */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
            Institutional Goals
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Official Objectives
          </h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            ADDC3LL operates under five core mandates to transform post-harvest quality and farmer livelihoods in Mindanao:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OBJECTIVES.map((obj) => (
            <div 
              key={obj.num}
              className="bg-cream p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:border-roast/50 transition-colors"
            >
              <div>
                <span className="w-8 h-8 rounded-full bg-oat text-roast flex items-center justify-center font-bold text-xs mb-4 border border-border">
                  0{obj.num}
                </span>
                <h4 className="font-serif font-bold text-lg text-espresso mb-2">
                  {obj.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Quick Trademark Highlight as 6th companion card */}
          <div className="bg-espresso text-cream p-6 rounded-2xl border border-border/20 shadow-md flex flex-col justify-between">
            <div>
              <span className="inline-block bg-roast text-caramel text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-4">
                Milestone · IPOPHL
              </span>
              <h4 className="font-serif font-bold text-lg text-cream mb-2">
                Class 40 Registered Trademark
              </h4>
              <p className="text-xs text-oat/90 leading-relaxed">
                Registered on February 27, 2026 with the Intellectual Property Office of the Philippines covering coffee roasting and processing (valid through 2036).
              </p>
            </div>
            <span className="text-[11px] text-caramel font-semibold mt-4 block">
              Announced May 11, 2026 by ADDU
            </span>
          </div>
        </div>
      </section>

      {/* Research Programs: Coffee & Cacao */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
            Scope of Innovation
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Research Programs
          </h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Integrated R&D programs covering the full product lifecycle from post-harvest engineering to sensory quality and marketing:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coffee Research Program */}
          <div className="bg-cream p-6 sm:p-8 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-espresso text-cream flex items-center justify-center">
                <Coffee size={20} className="text-caramel" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-espresso">
                  Coffee Research Program
                </h3>
                <span className="text-xs text-roast font-semibold">Arabica, Fine Robusta & Liberica</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {COFFEE_PROGRAMS.map((item, idx) => (
                <div key={idx} className="p-3 bg-oat/70 rounded-xl border border-border text-xs sm:text-sm">
                  <strong className="text-espresso block font-semibold mb-0.5">{item.stage}</strong>
                  <span className="text-muted">{item.items}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cacao Research Program */}
          <div className="bg-cream p-6 sm:p-8 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-amber-900 text-cream flex items-center justify-center">
                <Sparkles size={20} className="text-amber-200" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-espresso">
                  Cacao Research Program
                </h3>
                <span className="text-xs text-roast font-semibold">Single-Estate Davao Cacao & Tablea</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {CACAO_PROGRAMS.map((item, idx) => (
                <div key={idx} className="p-3 bg-oat/70 rounded-xl border border-border text-xs sm:text-sm">
                  <strong className="text-espresso block font-semibold mb-0.5">{item.stage}</strong>
                  <span className="text-muted">{item.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities and Resources */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
            Infrastructure & Learning Spaces
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Facilities & Resources
          </h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Established in Marilog, Davao City to support academic investigation, producer workshops, and real-world field trials:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACILITIES.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div key={idx} className="bg-oat p-6 rounded-2xl border border-border space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-espresso text-cream flex items-center justify-center mb-3">
                    <Icon size={20} className="text-caramel" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-roast block mb-1">
                    {fac.badge}
                  </span>
                  <h4 className="font-serif font-bold text-xl text-espresso mb-2">
                    {fac.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="bg-oat rounded-3xl border border-border p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
            Measurable Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Expected Outcomes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPECTED_OUTCOMES.map((out, idx) => (
            <div key={idx} className="bg-cream p-6 rounded-2xl border border-border shadow-sm space-y-2">
              <span className="text-xs font-bold text-roast uppercase tracking-wider block">
                Outcome 0{idx + 1}
              </span>
              <h4 className="font-serif font-bold text-lg text-espresso">
                {out.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {out.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Academic Mandate */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-roast block">
          Academic Extension
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
          Education & Student Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-oat rounded-xl border border-border text-xs sm:text-sm">
            <strong className="text-espresso block font-semibold mb-1">Workshops & Seminars</strong>
            <p className="text-muted leading-relaxed">Hands-on post-harvest and cupping education for local farmers, baristas, and community members.</p>
          </div>
          <div className="p-4 bg-oat rounded-xl border border-border text-xs sm:text-sm">
            <strong className="text-espresso block font-semibold mb-1">Publications & Guides</strong>
            <p className="text-muted leading-relaxed">Publishing practical research findings, processing manuals, and best practice guides for the industry.</p>
          </div>
          <div className="p-4 bg-oat rounded-xl border border-border text-xs sm:text-sm">
            <strong className="text-espresso block font-semibold mb-1">Student Thesis Extension</strong>
            <p className="text-muted leading-relaxed">Providing a formal avenue for undergraduate and graduate students to conduct field and lab research.</p>
          </div>
        </div>
      </section>

      {/* Partnership and Institutional Support */}
      <section className="bg-espresso text-cream rounded-3xl p-8 sm:p-12 border border-border/20 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-roast text-caramel text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Institutional Backing
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Partnership and Support
          </h2>
        </div>

        <p className="text-sm sm:text-base text-oat/90 leading-relaxed max-w-3xl">
          This initiative is supported under the <strong>Strengthening the Implementation of Regional and Local Peace and Development Agendas (SPADe)</strong> and <strong>Mindanao Peace and Development (MinPAD) RISE Program</strong> of the <strong>Mindanao Development Authority (MinDA)</strong> in partnership with:
        </p>

        {/* Partner list pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-xs">
          {[
            { label: "MinDA", sub: "Mindanao Dev Authority" },
            { label: "DILG", sub: "Dept. of Interior & Local Govt." },
            { label: "European Union", sub: "Co-funded by EU" },
            { label: "German Cooperation", sub: "German Federal Ministry (BMZ)" },
            { label: "GIZ", sub: "Implemented by GIZ GmbH" },
            { label: "MCN", sub: "Mindanao Coffee Network" }
          ].map((partner, i) => (
            <div key={i} className="bg-white/5 p-3.5 rounded-xl border border-white/10 text-center">
              <span className="font-bold text-cream block text-sm">{partner.label}</span>
              <span className="text-[10px] text-oat/60 mt-0.5 block leading-tight">{partner.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Official Contact Details */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-6">
        <div className="pb-4 border-b border-border">
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
            Direct Contacts
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Leadership & Inquiries
          </h2>
          <p className="text-sm text-muted mt-1">
            For more information, research proposals, and potential collaborations, connect directly with the laboratory coordinators:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-oat border border-border space-y-1">
            <span className="text-[10px] uppercase font-bold text-roast tracking-wider block">Lab Central Inquiries</span>
            <h4 className="font-serif font-bold text-base text-espresso">ADDC3LL General Desk</h4>
            <a 
              href="mailto:addc3ll@addu.edu.ph" 
              className="text-xs sm:text-sm font-semibold text-roast hover:underline flex items-center gap-1.5 pt-1"
            >
              <Mail size={14} /> addc3ll@addu.edu.ph
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-oat border border-border space-y-1">
            <span className="text-[10px] uppercase font-bold text-roast tracking-wider block">Project Coordinator</span>
            <h4 className="font-serif font-bold text-base text-espresso">Dr. Mark Anthony Rotor</h4>
            <a 
              href="mailto:marrotor@addu.edu.ph" 
              className="text-xs sm:text-sm font-semibold text-roast hover:underline flex items-center gap-1.5 pt-1"
            >
              <Mail size={14} /> marrotor@addu.edu.ph
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-oat border border-border space-y-1">
            <span className="text-[10px] uppercase font-bold text-roast tracking-wider block">Project Lead & Engineering</span>
            <h4 className="font-serif font-bold text-base text-espresso">Engr. Francis Christopher Bation</h4>
            <a 
              href="mailto:fccbation@addu.edu.ph" 
              className="text-xs sm:text-sm font-semibold text-roast hover:underline flex items-center gap-1.5 pt-1"
            >
              <Mail size={14} /> fccbation@addu.edu.ph
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Collaboration Form */}
      <section className="bg-oat rounded-3xl border border-border p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 bg-cream text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-border">
              <Sparkles size={14} /> Connect With The Lab
            </div>
            <h2 className="text-3xl font-serif font-bold text-espresso">
              Send an Academic or Producer Inquiry
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Whether you are an agricultural producer, student researcher, or coffee and cacao industry partner, leave a message below.
            </p>

            <div className="pt-4 space-y-3 text-xs text-muted">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-roast shrink-0 mt-0.5" />
                <span>ADDC3LL Facility, Marilog, Davao City, Philippines</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="text-roast shrink-0 mt-0.5" />
                <span>Central: addc3ll@addu.edu.ph</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-cream p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-oat text-espresso text-sm focus:outline-none focus:ring-2 focus:ring-roast"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maria@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-oat text-espresso text-sm focus:outline-none focus:ring-2 focus:ring-roast"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                      Organization / Farm / Department
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AdDU Student / Farming Cooperative"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-oat text-espresso text-sm focus:outline-none focus:ring-2 focus:ring-roast"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                      Area of Interest
                    </label>
                    <select
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-oat text-espresso text-sm focus:outline-none focus:ring-2 focus:ring-roast"
                    >
                      <option>Coffee Processing & Fermentation Studies</option>
                      <option>Cacao Fermentation & Quality Control</option>
                      <option>Student Thesis & Graduate Research Extension</option>
                      <option>Farmer Training & Workshop Inquiries</option>
                      <option>Institutional & Multi-Agency Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    Your Message / Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your inquiry, research proposal, or partnership..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-oat text-espresso text-sm focus:outline-none focus:ring-2 focus:ring-roast"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-espresso hover:bg-roast text-cream font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                >
                  <Send size={16} className="text-caramel" />
                  <span>Submit Inquiry to ADDC3LL</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-espresso">
                  Inquiry Received
                </h3>
                <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>! Your inquiry regarding <em>{formData.areaOfInterest}</em> has been logged. You may also contact Dr. Mark Anthony Rotor (marrotor@addu.edu.ph) or Engr. Francis Christopher Bation (fccbation@addu.edu.ph).
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-oat hover:bg-border/60 text-espresso text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
