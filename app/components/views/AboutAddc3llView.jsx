"use client";
import React, { useState } from 'react';
import { 
  Info, MapPin, Award, CheckCircle2, 
  Send, Users, BookOpen, Coffee, Sparkles, 
  ShieldCheck, ExternalLink, Calendar, FileText
} from 'lucide-react';

export default function AboutAddc3llView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    areaOfInterest: 'Academic Research & Innovation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

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
            The <strong>Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL)</strong> connects university academic research with grassroots innovation in Mindanao's coffee and cacao industries. Based in <strong>Marilog, Davao City</strong>, it operates in partnership with the <strong>Mindanao Coffee Network (MCN)</strong>.
          </p>
        </div>
      </div>

      {/* Explicit Prototype & Educational Disclaimer */}
      <div className="bg-amber-50 border border-amber-200/90 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm text-espresso/90 flex items-start gap-3 shadow-sm">
        <Info size={20} className="text-amber-800 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-950 font-bold block">
            Academic Prototype & Proof-of-Concept Notice:
          </strong>
          <p className="leading-relaxed">
            This website is an independent educational web prototype designed to illustrate digital tools and curriculum resources for ADDC3LL. It is <strong>not the official Ateneo de Davao University web portal</strong>. For official university inquiries and publications, please visit <a href="https://www.addu.edu.ph" target="_blank" rel="noreferrer" className="underline font-bold text-amber-900 hover:text-espresso">addu.edu.ph</a>.
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
            <span className="font-bold text-espresso">Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL)</span>
          </div>
          <div className="p-4 bg-oat rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Parent Institution</span>
            <span className="font-bold text-espresso">Ateneo de Davao University (ADDU)</span>
          </div>
          <div className="p-4 bg-oat rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Partner Organization</span>
            <span className="font-bold text-espresso">Mindanao Coffee Network (MCN)</span>
          </div>
          <div className="p-4 bg-oat rounded-2xl border border-border">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Physical Location</span>
            <span className="font-bold text-espresso">Marilog, Davao City, Philippines</span>
          </div>
        </div>
      </section>

      {/* Three Core Pillars of Activity */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
            Our Purpose & Mandate
          </span>
          <h2 className="text-3xl font-serif font-bold text-espresso">
            Three Pillars of Collaborative Innovation
          </h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            ADDC3LL's published framework connects academic research with practical agricultural application to support producers and communities across Mindanao.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-cream p-8 rounded-3xl border border-border shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-espresso text-cream flex items-center justify-center">
                <BookOpen size={22} className="text-caramel" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso">
                1. Academic Research & Innovation
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Connecting university research with the practical challenges and opportunities of Mindanao's coffee and cacao sectors. Fostering two-way knowledge exchange between academic researchers and agricultural producers.
              </p>
            </div>
            <div className="pt-4 border-t border-border text-xs text-roast font-semibold">
              Research · Applied Science · Knowledge Sharing
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-cream p-8 rounded-3xl border border-border shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-roast text-cream flex items-center justify-center">
                <Users size={22} className="text-caramel" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso">
                2. Training & Technology Transfer
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Providing a dedicated setting for transferring modern knowledge and processing technologies to practitioners in the field through workshops, demonstrations, and active collaboration.
              </p>
            </div>
            <div className="pt-4 border-t border-border text-xs text-roast font-semibold">
              Workshops · Technical Demonstrations · Capacity Building
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-cream p-8 rounded-3xl border border-border shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-800 text-cream flex items-center justify-center">
                <Coffee size={22} className="text-cream" />
              </div>
              <h3 className="text-xl font-serif font-bold text-espresso">
                3. Agro-enterprise Development
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Linking research and innovation directly with grassroots enterprise growth, strengthening local value chains, and helping smallholder coffee and cacao ventures thrive sustainably in Mindanao.
              </p>
            </div>
            <div className="pt-4 border-t border-border text-xs text-roast font-semibold">
              Value Addition · Enterprise Support · Grassroots Growth
            </div>
          </div>
        </div>
      </section>

      {/* Trademark & Intellectual Property Milestone */}
      <section className="bg-espresso text-cream rounded-3xl p-8 sm:p-12 border border-border/20 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-roast text-caramel text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <ShieldCheck size={14} /> Official University Milestone
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-cream">
              Intellectual Property Registration (IPOPHL)
            </h2>
          </div>
          <span className="text-xs text-oat/70 font-mono bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            Valid: 2026 – 2036
          </span>
        </div>

        <p className="text-sm sm:text-base text-oat/90 leading-relaxed max-w-3xl">
          On <strong>February 27, 2026</strong>, ADDC3LL achieved registered trademark status with the <strong>Intellectual Property Office of the Philippines (IPOPHL)</strong> under <strong>Class 40</strong>, covering <strong>coffee roasting and processing</strong>. Ateneo de Davao University formally announced this 10-year institutional milestone on <strong>May 11, 2026</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-oat/60 block mb-1 uppercase font-bold text-[10px]">Registration Body</span>
            <span className="font-bold text-cream">Intellectual Property Office of the Philippines (IPOPHL)</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-oat/60 block mb-1 uppercase font-bold text-[10px]">Registration Date</span>
            <span className="font-bold text-cream">February 27, 2026</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-oat/60 block mb-1 uppercase font-bold text-[10px]">Trademark Class</span>
            <span className="font-bold text-cream">Class 40 (Roasting & Processing)</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-oat/60 block mb-1 uppercase font-bold text-[10px]">Term of Validity</span>
            <span className="font-bold text-cream">10 Years (Until 2036)</span>
          </div>
        </div>
      </section>

      {/* Institutional Leadership & Recognition */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-6">
        <div className="pb-4 border-b border-border">
          <span className="text-xs font-bold uppercase tracking-widest text-roast block mb-1">
            Institutional Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
            Key People & Institutional Support
          </h2>
          <p className="text-sm text-muted mt-1">
            Recognized by Ateneo de Davao University in connection with ADDC3LL's development and trademark registration:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-oat border border-border space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-roast block">
              Laboratory Leadership & Development
            </span>
            <h4 className="font-serif font-bold text-xl text-espresso">
              Engr. Francis Christopher C. Bation
            </h4>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Formally commended by Ateneo de Davao University for his leadership, dedication, and work with the ADDC3LL laboratory team in advancing coffee and cacao initiatives.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-oat border border-border space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-roast block">
              Intellectual Property & Technology Support
            </span>
            <h4 className="font-serif font-bold text-xl text-espresso">
              Mr. Ed Ivan M. Bardoquillo
            </h4>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Officer-in-Charge of the ADDU Innovation and Technology Support Office (ITSO), who facilitated the formal IPOPHL trademark registration and institutional protection for ADDC3LL.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership: ADDU & Mindanao Coffee Network */}
      <section className="bg-cream rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-roast block">
          Strategic Partnership
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso">
          Ateneo de Davao University & Mindanao Coffee Network
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          ADDC3LL operates as a synergy between <strong>Ateneo de Davao University (ADDU)</strong>—a Filipino, Catholic, Jesuit university in Davao City committed to research and inclusive social transformation—and the <strong>Mindanao Coffee Network (MCN)</strong>, connecting university faculty and students directly with producers, cooperatives, and coffee-sector stakeholders.
        </p>
        <div className="flex flex-wrap gap-4 pt-2 text-xs">
          <div className="flex items-center gap-1.5 text-roast font-semibold">
            <MapPin size={15} /> Marilog District, Davao City
          </div>
          <div className="flex items-center gap-1.5 text-muted">
            • Focus: Coffee (Roasting & Processing) and Cacao
          </div>
        </div>
      </section>

      {/* Inquiry & Connect Section */}
      <section className="bg-oat rounded-3xl border border-border p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 bg-cream text-roast px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-border">
              <Sparkles size={14} /> Connect With The Laboratory
            </div>
            <h2 className="text-3xl font-serif font-bold text-espresso">
              Inquire or Connect with ADDC3LL
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Whether you are an agricultural producer, student researcher, or coffee and cacao industry partner, reach out to connect with the laboratory team.
            </p>

            <div className="pt-4 space-y-3 text-xs text-muted">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-roast shrink-0 mt-0.5" />
                <span>ADDC3LL Facility, Marilog, Davao City, Philippines</span>
              </div>
              <div className="flex items-start gap-2">
                <Info size={16} className="text-roast shrink-0 mt-0.5" />
                <span>Ateneo de Davao University & Mindanao Coffee Network Partnership</span>
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
                      Organization / Farm / Affiliation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AdDU Student / Coffee Producer"
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
                      <option>Academic Research & Innovation</option>
                      <option>Training & Technology Transfer</option>
                      <option>Agro-enterprise Development</option>
                      <option>Coffee Roasting & Processing Inquiry</option>
                      <option>General Institutional Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    Your Message / Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your inquiry, project, or collaboration interest..."
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
                  Thank you, <strong>{formData.name}</strong>! Your message regarding <em>{formData.areaOfInterest}</em> has been submitted. The ADDC3LL team will follow up via email at <strong>{formData.email}</strong>.
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
