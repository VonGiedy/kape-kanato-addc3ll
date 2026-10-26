"use client";
import React, { useState } from 'react';
import { 
  X, ChevronRight, Bookmark, BookmarkCheck, 
  Share2, Check, ArrowRight, ArrowLeft, BookOpen 
} from 'lucide-react';
import { ARTICLES } from '../data/articles';

export default function ArticleModal({ 
  articleId, 
  onClose, 
  isBookmarked, 
  onToggleBookmark,
  onNavigateArticle 
}) {
  const [copied, setCopied] = useState(false);
  const article = ARTICLES[articleId];

  if (!article) return null;

  const articleKeys = Object.keys(ARTICLES);
  const currentIndex = articleKeys.indexOf(articleId);
  const prevArticleKey = currentIndex > 0 ? articleKeys[currentIndex - 1] : null;
  const nextArticleKey = currentIndex < articleKeys.length - 1 ? articleKeys[currentIndex + 1] : null;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-espresso/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-cream w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Sticky Header Bar */}
        <div className="p-4 sm:px-6 border-b border-border flex items-center justify-between bg-oat/90 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted truncate">
            <span className="text-roast">{article.category}</span>
            <ChevronRight size={14} className="shrink-0" />
            <span className="truncate">{article.readTime}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                isBookmarked 
                  ? 'bg-roast text-cream' 
                  : 'bg-cream text-muted hover:text-espresso border border-border'
              }`}
              title={isBookmarked ? 'Saved to bookmarks' : 'Bookmark this article'}
            >
              {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share link button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-cream hover:bg-border/60 text-muted hover:text-espresso border border-border transition-colors text-xs font-semibold flex items-center gap-1"
              title="Copy share link"
            >
              {copied ? <Check size={16} className="text-emerald-700" /> : <Share2 size={16} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-cream hover:bg-border/60 text-muted hover:text-espresso flex items-center justify-center border border-border transition-colors ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Hero Image if available */}
          {article.imgUrl && (
            <div className="h-64 sm:h-80 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-8 overflow-hidden relative">
              <img 
                src={article.imgUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-black/20" />
            </div>
          )}

          <div>
            <span className="inline-block bg-roast/10 text-roast text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-espresso leading-tight">
              {article.title}
            </h1>
            {article.summary && (
              <p className="text-lg text-muted/90 font-serif italic mt-4 pb-6 border-b border-border">
                "{article.summary}"
              </p>
            )}
          </div>

          {/* Render structured content */}
          <div className="space-y-6 text-espresso/90 text-base sm:text-lg leading-relaxed">
            {article.content.map((block, idx) => {
              if (block.type === 'p') {
                return (
                  <p key={idx} className="text-muted leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'h3') {
                return (
                  <h3 key={idx} className="text-2xl font-serif font-bold text-espresso pt-4">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={idx} className="space-y-2.5 my-4 pl-4 border-l-2 border-caramel">
                    {block.items.map((item, i) => (
                      <li key={i} className="text-muted text-base leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>

          {/* Key Takeaways Box */}
          {article.takeaways && article.takeaways.length > 0 && (
            <div className="bg-oat p-6 rounded-3xl border border-border mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-roast text-cream flex items-center justify-center">
                  <BookOpen size={16} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-roast">
                  Key Takeaways for Coffee Learners
                </h4>
              </div>
              <ul className="space-y-3">
                {article.takeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-cream text-roast flex items-center justify-center shrink-0 shadow-sm text-xs font-bold mt-0.5 border border-border">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next / Previous Article Navigation */}
          <div className="pt-8 border-t border-border flex items-center justify-between gap-4">
            {prevArticleKey ? (
              <button
                onClick={() => onNavigateArticle(prevArticleKey)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-muted hover:text-espresso p-2 rounded-xl hover:bg-oat transition-colors"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Previous Article</span>
              </button>
            ) : <div />}

            {nextArticleKey && (
              <button
                onClick={() => onNavigateArticle(nextArticleKey)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-roast hover:text-espresso p-2 rounded-xl hover:bg-oat transition-colors ml-auto"
              >
                <span>Next: {ARTICLES[nextArticleKey].title.slice(0, 24)}...</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

