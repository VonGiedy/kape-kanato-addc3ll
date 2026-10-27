// app/components/views/CommunityView.jsx
"use client";
import React, { useState } from 'react';
import { 
  Users, MapPin, Calendar, Heart, Share2, 
  ExternalLink, Search, Tag, MessageSquare, 
  Sparkles, Award, BookOpen, Send, X, Check,
  Camera, Filter, ChevronRight
} from 'lucide-react';
import { COMMUNITY_POSTS } from '../../data/communityPosts';

export default function CommunityView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState(() => {
    const initial = {};
    COMMUNITY_POSTS.forEach(p => {
      initial[p.id] = { count: p.likesCount, liked: false };
    });
    return initial;
  });
  const [copiedId, setCopiedId] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    name: '',
    role: 'Student / Blue Beans Society',
    title: '',
    story: '',
    tags: '#AdDC3LL #BlueBeansSociety'
  });

  const categories = [
    'All',
    'Competitions & Accolades',
    'Academic & Research',
    'Field Days & Partnerships'
  ];

  const handleLike = (id) => {
    setLikes(prev => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  const handleCopyLink = (id) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText?.(`${window.location.origin}/#community-${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const filteredPosts = COMMUNITY_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery = 
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.location.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setShowSubmitModal(false);
      setSubmitForm({
        name: '',
        role: 'Student / Blue Beans Society',
        title: '',
        story: '',
        tags: '#AdDC3LL #BlueBeansSociety'
      });
    }, 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Editorial Header */}
      <div className="bg-espresso text-cream py-12 px-6 sm:px-12 rounded-3xl shadow-lg border border-border/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-roast text-caramel text-xs font-semibold px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider">
            ADDC3LL & Blue Beans Society
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-3">
            Community & Field Dispatches
          </h1>
          <p className="text-base sm:text-lg text-oat/90 leading-relaxed font-normal">
            Celebrating the people, research milestones, brewing competitions, and farmer partnerships powering Davao and Mindanao's coffee movement.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="bg-caramel hover:bg-amber-500 text-espresso text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Send size={15} />
              <span>Share a Dispatch or Milestone</span>
            </button>
            <a
              href="https://www.facebook.com/profile.php?id=61585832537772"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-cream text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all border border-white/15 flex items-center gap-2"
            >
              <span>Blue Beans Society (BBS)</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
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
            placeholder="Search dispatches, people, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-cream border border-border rounded-xl text-xs sm:text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-roast"
          />
        </div>
      </div>

      {/* Blue Beans Society & Lab Synergy Banner */}
      <div className="bg-oat border border-border p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-roast text-cream flex items-center justify-center shrink-0 mt-0.5">
            <Users size={18} className="text-caramel" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-espresso">
              Blue Beans Society (BBS) · Ateneo de Davao University
            </h4>
            <p className="text-xs text-muted leading-relaxed mt-0.5">
              The student-led coffee society of Ateneo de Davao University, actively partnering with ADDC3LL researchers and local farmers for training, cupping, and competitions.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-roast bg-cream px-3 py-1.5 rounded-lg border border-border shrink-0 font-semibold">
          Academe × Farmer Link
        </span>
      </div>

      {/* Dispatches Feed */}
      <div className="space-y-12">
        {filteredPosts.length === 0 ? (
          <div className="bg-cream rounded-3xl p-12 text-center border border-border space-y-3">
            <Filter size={32} className="mx-auto text-muted/60" />
            <h3 className="text-lg font-serif font-bold text-espresso">No dispatches match your search</h3>
            <p className="text-xs sm:text-sm text-muted">Try clearing the search query or selecting a different category.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-2 text-xs font-bold text-roast hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const currentLikes = likes[post.id] || { count: post.likesCount, liked: false };
            const isCopied = copiedId === post.id;

            return (
              <article 
                key={post.id}
                id={`community-${post.id}`}
                className="bg-cream rounded-3xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Post Top Meta */}
                <div className="p-6 sm:p-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-espresso text-caramel flex items-center justify-center font-bold text-xs shadow-sm">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-espresso">{post.author.name}</span>
                        <span className="text-[10px] uppercase font-bold text-roast bg-oat px-2 py-0.5 rounded-full border border-border">
                          {post.category}
                        </span>
                      </div>
                      <span className="text-xs text-muted block">{post.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted self-start sm:self-auto">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-roast" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-roast" />
                      <span>{post.location}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content Grid */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left / Top: Post Text Narrative */}
                  <div className={`space-y-4 ${post.images && post.images.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-espresso leading-snug">
                      {post.title}
                    </h2>

                    {/* Pre-formatted narrative with natural paragraph breaks */}
                    <div className="text-sm text-espresso/90 leading-relaxed space-y-3 font-normal whitespace-pre-line">
                      {post.content}
                    </div>

                    {/* Tags */}
                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag, i) => (
                        <button
                          key={i}
                          onClick={() => setSearchQuery(tag.replace('#', ''))}
                          className="text-[11px] font-medium text-roast bg-oat hover:bg-roast hover:text-cream px-2.5 py-1 rounded-lg border border-border transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* External Link if provided */}
                    {post.externalLink && (
                      <div className="pt-2">
                        <a
                          href={post.externalLink.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-roast hover:text-espresso hover:underline"
                        >
                          <span>{post.externalLink.label}</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right: Images Gallery */}
                  {post.images && post.images.length > 0 && (
                    <div className="lg:col-span-5 space-y-3">
                      {post.images.length === 1 ? (
                        <div 
                          onClick={() => setSelectedImage(post.images[0])}
                          className="group relative rounded-2xl overflow-hidden border border-border bg-espresso/5 cursor-pointer shadow-sm hover:shadow-md transition-all"
                        >
                          <img
                            src={post.images[0].url}
                            alt={post.images[0].caption}
                            className="w-full h-auto max-h-[420px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
                          />
                          <div className="p-3 bg-espresso/90 text-cream text-[11px] leading-snug flex items-center justify-between">
                            <span className="line-clamp-2">{post.images[0].caption}</span>
                            <span className="text-[10px] text-caramel uppercase font-bold shrink-0 ml-2">Click to View</span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                          {post.images.map((img, idx) => (
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
                              <div className="p-2.5 bg-espresso/90 text-cream text-[11px] leading-snug flex items-center justify-between">
                                <span className="line-clamp-1">{img.caption}</span>
                                <span className="text-[10px] text-caramel uppercase font-bold shrink-0 ml-2">Zoom</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Post Footer Actions */}
                <div className="px-6 sm:px-8 py-3.5 bg-oat/70 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        currentLikes.liked
                          ? 'bg-rose-100 text-rose-700 shadow-sm'
                          : 'text-muted hover:text-espresso hover:bg-cream'
                      }`}
                      aria-label="Applaud dispatch"
                    >
                      <Heart 
                        size={15} 
                        className={currentLikes.liked ? 'fill-current text-rose-600' : ''} 
                      />
                      <span>{currentLikes.count}</span>
                    </button>

                    <button
                      onClick={() => handleCopyLink(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-muted hover:text-espresso hover:bg-cream transition-colors"
                      title="Copy dispatch link"
                    >
                      {isCopied ? (
                        <>
                          <Check size={14} className="text-emerald-700" />
                          <span className="text-emerald-700 font-semibold">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={14} />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-[11px] text-muted">
                    ADDC3LL Milestone Archive
                  </span>
                </div>
              </article>
            );
          })
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
              <span className="text-xs font-semibold text-caramel uppercase tracking-wider">
                Photo Dispatch
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors"
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

      {/* Submit Story Modal */}
      {showSubmitModal && (
        <div 
          onClick={() => setShowSubmitModal(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-cream rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-border animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="font-serif font-bold text-xl text-espresso">
                  Submit a Field Dispatch or Story
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Share student achievements, farmer stories, or event updates for ADDC3LL.
                </p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-8 h-8 rounded-full hover:bg-oat flex items-center justify-center text-muted hover:text-espresso"
              >
                <X size={18} />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h4 className="font-serif font-bold text-lg text-espresso">Dispatch Received!</h4>
                <p className="text-xs text-muted max-w-xs mx-auto">
                  Thank you! Your story has been submitted for review by the ADDC3LL and Blue Beans Society team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Florence / Sophia"
                      value={submitForm.name}
                      onChange={(e) => setSubmitForm({ ...submitForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-oat text-espresso text-xs focus:ring-2 focus:ring-roast focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                      Role / Affiliation
                    </label>
                    <select
                      value={submitForm.role}
                      onChange={(e) => setSubmitForm({ ...submitForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-oat text-espresso text-xs focus:ring-2 focus:ring-roast focus:outline-none"
                    >
                      <option>Student / Blue Beans Society</option>
                      <option>Faculty / ADDC3LL Researcher</option>
                      <option>Coffee Farmer / Cooperative</option>
                      <option>Barista / Community Enthusiast</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    Dispatch Headline / Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cupping Session with Marilog Coffee Growers"
                    value={submitForm.title}
                    onChange={(e) => setSubmitForm({ ...submitForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-oat text-espresso text-xs focus:ring-2 focus:ring-roast focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    Story / Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what happened, who was involved, and the key highlights..."
                    value={submitForm.story}
                    onChange={(e) => setSubmitForm({ ...submitForm, story: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-oat text-espresso text-xs focus:ring-2 focus:ring-roast focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-espresso"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-roast hover:bg-espresso text-cream rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Send size={13} />
                    <span>Submit Dispatch</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
