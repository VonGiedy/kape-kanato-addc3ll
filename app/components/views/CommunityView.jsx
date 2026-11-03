// app/components/views/CommunityView.jsx
"use client";
import React, { useState } from 'react';
import { 
  Award, MapPin, Calendar, ExternalLink, 
  Search, BookOpen, Users, Sparkles, X, 
  CheckCircle2, ChevronRight, ShieldCheck,
  GraduationCap, Trophy, Mic
} from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/communityPosts';

export default function CommunityView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    'All',
    'National Competitions',
    'Research & Keynotes',
    'Farmer & Academe Collaboration',
    'Institutional & IP Milestones'
  ];

  const filteredAchievements = ACHIEVEMENTS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery = 
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.awardBadge.toLowerCase().includes(q) ||
      item.honorees.some(h => h.name.toLowerCase().includes(q) || h.role.toLowerCase().includes(q)) ||
      item.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Editorial Header */}
      <div className="bg-espresso text-cream py-12 px-6 sm:px-12 rounded-3xl shadow-lg border border-border/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-roast text-caramel text-xs font-semibold px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider">
              <Trophy size={13} />
              <span>Official University Record</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-3">
              ADDC3LL Achievements & Milestones
            </h1>
            <p className="text-base sm:text-lg text-oat/90 leading-relaxed font-normal">
              A permanent archive of academic keynotes, national brewing competition podiums, farmer-academe field triumphs, and institutional milestones achieved by the Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL) and student partners.
            </p>
          </div>

          <div className="hidden sm:flex shrink-0 p-2.5 bg-white rounded-2xl border border-white/20 shadow-md w-24 h-24 items-center justify-center">
            <img 
              src="/addc3ll-logo.jpg" 
              alt="ADDC3LL Official Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-caramel font-bold block text-lg font-serif">PCQC 2026</span>
            <span className="text-oat/70 text-[11px]">2nd Runner-Up & Top 15</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-caramel font-bold block text-lg font-serif">DARCES 2026</span>
            <span className="text-oat/70 text-[11px]">3rd Runner-Up Duo Brewing</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-caramel font-bold block text-lg font-serif">74th PSME</span>
            <span className="text-oat/70 text-[11px]">National Keynote Speaker</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-caramel font-bold block text-lg font-serif">Class 40</span>
            <span className="text-oat/70 text-[11px]">IPOPHL 10-Yr Trademark</span>
          </div>
        </div>
      </div>

      {/* Blue Beans Society Synergy Note */}
      <div className="bg-oat border border-border p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-roast text-cream flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <GraduationCap size={20} className="text-caramel" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-espresso">
              Blue Beans Society (BBS) · Ateneo de Davao University
            </h4>
            <p className="text-xs text-muted leading-relaxed mt-0.5">
              The official student coffee society of Ateneo de Davao University, actively partnering with ADDC3LL researchers and local coffee farmers for sensory calibration, technical workshops, and national brewing competitions.
            </p>
          </div>
        </div>
        <a
          href="https://www.facebook.com/profile.php?id=61585832537772"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-roast hover:text-espresso bg-cream px-3.5 py-2 rounded-xl border border-border shrink-0 flex items-center gap-1.5 transition-colors"
        >
          <span>Blue Beans Society</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-cream rounded-2xl border border-border">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium transition-all ${
                  isSelected 
                    ? 'bg-roast text-cream shadow-sm font-semibold' 
                    : 'text-muted hover:text-espresso hover:bg-oat'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Real-time search */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search honorees, events, awards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-cream border border-border rounded-xl text-xs sm:text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-roast"
          />
        </div>
      </div>

      {/* Achievements Archive List */}
      <div className="space-y-10">
        {filteredAchievements.length === 0 ? (
          <div className="bg-cream rounded-3xl p-12 text-center border border-border space-y-3">
            <Award size={32} className="mx-auto text-muted/60" />
            <h3 className="text-lg font-serif font-bold text-espresso">No achievements match your search</h3>
            <p className="text-xs sm:text-sm text-muted">Try clearing the search query or selecting a different category.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-2 text-xs font-bold text-roast hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredAchievements.map((item) => (
            <article 
              key={item.id}
              className="bg-cream rounded-3xl border border-border shadow-sm overflow-hidden hover:border-roast/40 transition-colors"
            >
              {/* Card Header Banner */}
              <div className="p-6 sm:p-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 bg-oat/40">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-roast text-cream text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    <Trophy size={13} className="text-caramel" />
                    <span>{item.awardBadge}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-muted bg-cream px-2.5 py-0.5 rounded-full border border-border">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted self-start sm:self-auto">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-roast" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-roast" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Text & Honorees */}
                <div className={`space-y-5 ${item.images && item.images.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                  
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso leading-snug">
                      {item.title}
                    </h2>
                    {item.organization && (
                      <span className="text-xs font-semibold text-roast mt-1 block">
                        Conferred by / Held at: {item.organization}
                      </span>
                    )}
                  </div>

                  {/* Honorees Chips */}
                  {item.honorees && item.honorees.length > 0 && (
                    <div className="p-3.5 bg-oat rounded-2xl border border-border space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted block">
                        Recognized Individuals & Partners:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {item.honorees.map((h, idx) => (
                          <div key={idx} className="bg-cream p-2.5 rounded-xl border border-border/80">
                            <strong className="text-espresso block font-serif font-bold">{h.name}</strong>
                            <span className="text-muted text-[11px] block">{h.role}</span>
                            <span className="text-roast font-semibold text-[10px] block mt-0.5">{h.affiliation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Official University Narrative */}
                  <div className="text-sm text-espresso/90 leading-relaxed space-y-3 font-normal whitespace-pre-line pt-1">
                    {item.content}
                  </div>

                  {/* Impact Note */}
                  {item.impactNote && (
                    <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-800 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block">Laboratory Significance:</strong>
                        <p className="text-amber-900 leading-relaxed mt-0.5">{item.impactNote}</p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-muted bg-oat px-2 py-0.5 rounded-md border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* External Link */}
                  {item.externalLink && (
                    <div className="pt-1">
                      <a
                        href={item.externalLink.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-roast hover:text-espresso hover:underline"
                      >
                        <span>{item.externalLink.label}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right: Images Gallery */}
                {item.images && item.images.length > 0 && (
                  <div className="lg:col-span-5 space-y-3">
                    {item.images.length === 1 ? (
                      <div 
                        onClick={() => setSelectedImage(item.images[0])}
                        className="group relative rounded-2xl overflow-hidden border border-border bg-espresso/5 cursor-pointer shadow-sm hover:shadow-md transition-all"
                      >
                        <img
                          src={item.images[0].url}
                          alt={item.images[0].caption}
                          className="w-full h-auto max-h-[440px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="p-3 bg-espresso text-cream text-[11px] leading-snug flex items-center justify-between">
                          <span className="line-clamp-2 text-oat/90">{item.images[0].caption}</span>
                          <span className="text-[10px] text-caramel uppercase font-bold shrink-0 ml-2">Click to Enlarge</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                        {item.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className="group relative rounded-2xl overflow-hidden border border-border bg-espresso/5 cursor-pointer shadow-sm hover:shadow-md transition-all"
                          >
                            <img
                              src={img.url}
                              alt={img.caption}
                              className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-2.5 bg-espresso text-cream text-[11px] leading-snug flex items-center justify-between">
                              <span className="line-clamp-1 text-oat/90">{img.caption}</span>
                              <span className="text-[10px] text-caramel uppercase font-bold shrink-0 ml-2">Enlarge</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Minimalist Institutional Footer */}
              <div className="px-6 sm:px-8 py-3 bg-oat/60 border-t border-border flex items-center justify-between text-xs text-muted">
                <span className="font-mono text-[11px]">
                  Ateneo de Davao University · ADDC3LL
                </span>
                <span className="text-[11px] font-semibold text-roast">
                  Official Recognition Archive
                </span>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Lightbox Modal for Full Image Inspection */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-espresso rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-cream">
              <span className="text-xs font-semibold text-caramel uppercase tracking-wider flex items-center gap-1.5">
                <Trophy size={14} />
                <span>Achievement Photo Archive</span>
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors"
                aria-label="Close photo"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-2 sm:p-4 bg-black/40 overflow-auto flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="p-4 bg-espresso text-cream text-xs sm:text-sm text-oat/90">
              <p>{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
