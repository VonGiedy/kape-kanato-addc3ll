// app/components/StudioBeans.jsx
"use client";
import React from 'react';

// Clean studio-lit roasted coffee bean illustration with natural S-curve fissure and flat-lay drop shadow
function StudioBeanSvg({ variant = 'whole', uid = '1', className = '' }) {
  if (variant === 'crumb') {
    return (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} aria-hidden="true">
        <path
          d="M6 12 C7 6, 15 4, 18 10 C20 15, 13 19, 8 17 C5 15, 5 14, 6 12 Z"
          fill="#2D190D"
          style={{ filter: 'drop-shadow(2px 4px 4px rgba(10,5,2,0.55))' }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 130" className={`w-full h-full overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id={`beanGrad-${uid}`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#7C5335" />
          <stop offset="45%" stopColor="#4A2E1A" />
          <stop offset="85%" stopColor="#2A170B" />
          <stop offset="100%" stopColor="#1B0E06" />
        </radialGradient>
        <linearGradient id={`seamGlow-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#120803" />
          <stop offset="65%" stopColor="#3B2212" />
          <stop offset="100%" stopColor="#855A3B" stopOpacity="0.45" />
        </linearGradient>
        <filter id={`beanShadow-${uid}`} x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="4" dy="8" stdDeviation="6" floodColor="#100703" floodOpacity="0.58" />
        </filter>
      </defs>

      <g filter={`url(#beanShadow-${uid})`}>
        <ellipse
          cx="50"
          cy="65"
          rx="36"
          ry="50"
          fill={`url(#beanGrad-${uid})`}
          stroke="#211107"
          strokeWidth="1.5"
        />
        <ellipse
          cx="36"
          cy="42"
          rx="14"
          ry="24"
          transform="rotate(-14 36 42)"
          fill="#FFFFFF"
          opacity="0.08"
        />
        <path
          d="M 52 17 C 40 42, 62 84, 48 113"
          fill="none"
          stroke={`url(#seamGlow-${uid})`}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M 53.5 18 C 41.5 43, 63.5 85, 49.5 112"
          fill="none"
          stroke="#9E714F"
          strokeOpacity="0.22"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function StudioBeans({ compact = false }) {
  const beanSpecs = compact
    ? [
        { id: 'c1', top: '16%', left: '4%', size: 30, rot: -28 },
        { id: 'c2', top: '46%', left: '8%', size: 22, rot: 45 },
        { id: 'c3', top: '22%', right: '6%', size: 28, rot: 35 },
        { id: 'c4', top: '56%', right: '9%', size: 21, rot: -52 },
      ]
    : [
        // Left Flat-Lay Scatter
        { id: 'l1', top: '8%', left: '3.5%', size: 40, rot: -35 },
        { id: 'l2', top: '16%', left: '11%', size: 34, rot: 42 },
        { id: 'l3', top: '11%', left: '19%', size: 26, rot: 78 },
        { id: 'l4', top: '30%', left: '3%', size: 42, rot: 14 },
        { id: 'l5', top: '26%', left: '22%', size: 28, rot: -52 },
        { id: 'l6', top: '44%', left: '6.5%', size: 32, rot: 26 },

        // Right Flat-Lay Scatter
        { id: 'r1', top: '9%', right: '4%', size: 38, rot: 34 },
        { id: 'r2', top: '15%', right: '13%', size: 30, rot: -48 },
        { id: 'r3', top: '22%', right: '21%', size: 27, rot: 82 },
        { id: 'r4', top: '32%', right: '4%', size: 40, rot: -18 },
        { id: 'r5', top: '28%', right: '14%', size: 32, rot: 60 },
        { id: 'r6', top: '46%', right: '7%', size: 31, rot: -36 },

        // Subtle roast flecks
        { id: 'f1', top: '19%', left: '16%', size: 10, rot: 20, variant: 'crumb' },
        { id: 'f2', top: '18%', right: '19%', size: 10, rot: -40, variant: 'crumb' },
      ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {beanSpecs.map((b) => (
        <div
          key={b.id}
          className="hidden sm:block absolute"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            width: `${b.size}px`,
            height: `${Math.round(b.size * 1.25)}px`,
            transform: `rotate(${b.rot}deg)`,
          }}
        >
          <StudioBeanSvg variant={b.variant || 'whole'} uid={b.id} />
        </div>
      ))}
    </div>
  );
}
