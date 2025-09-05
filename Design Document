# Cathedral of Unfinished Dreams - Design Document

*Technical implementation of the vision*

## Overview

This document outlines the practical implementation of the Cathedral platform. The goal is to build the simplest possible version that embodies the core principles while remaining technically manageable and actually shippable.

## Core User Flows

### Primary User Journey: The Wanderer
1. **Discovery**: Browse a grid of project cards
2. **Exploration**: Click into individual project pages  
3. **Resonance**: Find something that sparks interest
4. **Signal**: Send a $5 interest signal
5. **Optional**: Follow project updates (low-pressure)

### Creator Journey: The Explorer
1. **Creation**: Add projects to Notion database
2. **Sharing**: Projects automatically appear on platform
3. **Feedback**: See which ideas receive signals
4. **Evolution**: Update projects naturally in Notion
5. **Optional**: Engage with supporters (no obligation)

## Technical Architecture

### Tech Stack (Proven)
- **Backend**: Notion API (content management)
- **Frontend**: Astro (static generation) + React (interactive components)
- **Styling**: Tailwind CSS (dark theme, minimal aesthetic)
- **Payments**: Stripe Checkout (simple, reliable)
- **Hosting**: Vercel (seamless Astro deployment)

### Data Flow
```
Notion Database → Astro Build → Static Site → React Components → Stripe Payments
```

### Notion Database Schema
```
Projects Table:
- Name (Title) - Project title
- Description (Rich Text) - Brief description
- Status (Select) - Current state
- Category (Select) - Broad category
- SignalCount (Number) - Total signals received
- LastUpdate (Date) - When last modified
- Content (Rich Text) - Detailed project description
```

## Core Features (v1)

### 1. Project Grid (Homepage)
- Clean card layout showing project title, brief description, status
- Simple, browsable interface
- Each card shows signal count
- Click to view full project page
- No search, no filtering (deliberately simple)

### 2. Individual Project Pages
- Full project description
- Current status and any updates
- **"Signal Interest ($5)" button**
- Optional: Creator note about what signals mean to them
- Simple, clean layout focused on the idea itself

### 3. Interest Signaling System
- Single payment option: $5 interest signal
- Stripe Checkout integration (user enters email, payment)
- Signal count displays on project cards and pages
- No user accounts required (payment email is enough)
- Confirmation page: "Your signal has been sent"

### 4. Creator Dashboard (Simple)
- View all projects and their signal counts
- See recent signals (email + timestamp)
- Update projects directly in Notion
- No complex analytics or metrics

## Payment Integration

### Stripe Implementation
- Create Stripe Checkout sessions for each project
- Single SKU: "$5 Interest Signal for [Project Name]"
- Collect email address for confirmation
- Webhook to update signal count in Notion
- Simple success/cancel pages

### Money Flow
- Stripe processing fees (~3%)
- Platform fee: 5% (sustainable but not extractive)
- Creator receives: ~$4.65 per signal
- Transparent fee structure, no hidden costs

## What We're NOT Building (v1)

**Explicitly out of scope:**
- User accounts or profiles
- Complex discovery features (search, tags, filters)
- Social features (comments, follows, messaging)
- Force graph visualizations
- Progress tracking or project management
- Multiple payment tiers
- Creator verification systems
- Mobile app
- Advanced analytics

**Why these are excluded:**
- Complexity creep killed the last version
- Focus on core value proposition first
- Each feature adds maintenance burden
- Simpler = more likely to actually ship

## UI/UX Principles

### Visual Design
- Dark theme (existing aesthetic works well)
- Clean, minimal cards
- Plenty of white space
- Typography-focused (ideas are text-heavy)
- Subtle hover states and interactions

### Interaction Design
- **Browsing**: Effortless, wandering-friendly
- **Reading**: Focused, distraction-free
- **Signaling**: One-click simple, no friction
- **Mobile**: Responsive but web-first

### Content Strategy
- Project titles: Clear, evocative
- Descriptions: One compelling paragraph max
- Status badges: Simple, color-coded
- No jargon, no "optimization speak"

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- Set up Notion database with proper schema
- Create basic Astro site with project grid
- Build individual project page template
- Implement Stripe payment flow
- Deploy to Vercel

### Phase 2: Polish (Week 3)
- Refine visual design and responsiveness
- Add webhook for signal count updates
- Create creator dashboard
- Test payment flow thoroughly
- Soft launch with friends

### Phase 3: Launch (Week 4)
- Final testing and bug fixes
- Write launch post explaining the concept
- Share with creative communities
- Monitor and iterate based on feedback

## Success Metrics (v1)

**Technical Success:**
- Site loads and works reliably
- Payment flow completes without errors
- Notion sync works correctly
- Mobile experience is usable

**Product Success:**
- At least one person sends an interest signal
- Creator can see and understand the feedback
- Platform feels different from existing options
- Ideas evolve based on signal feedback

**Cultural Success:**
- Creators feel permission to share incomplete work
- Supporters find value in the browsing experience
- Community forms around exploration, not completion
- Platform embodies its own principles

## Risk Mitigation

### Technical Risks
- **Notion API limits**: Cache data, implement graceful fallbacks
- **Stripe integration complexity**: Start with simplest possible flow
- **Performance**: Astro static generation handles traffic well

### Product Risks
- **No one uses it**: Start with creator's own network
- **Wrong pricing**: $5 feels right but may need adjustment
- **Complexity creep**: Strict feature freeze for v1

### Cultural Risks
- **Completion pressure creeps in**: Regular reminder of principles
- **Platform drift**: Keep README as north star
- **Creator burnout**: No obligations, no pressure

## Future Considerations (Post-v1)

*These are possibilities, not commitments:*
- Multiple creators on single platform
- Cross-project connections/recommendations
- Creator-to-creator signaling
- Different signal amounts
- Project completion notifications
- Simple comment system
- Export tools for creators

## Development Notes

### Code Organization
```
src/
├── components/
│   ├── ProjectCard.jsx
│   ├── ProjectGrid.jsx
│   └── SignalButton.jsx
├── pages/
│   ├── index.astro (project grid)
│   ├── project/[id].astro (individual pages)
│   ├── dashboard.astro (creator view)
│   └── api/webhook.js (Stripe webhook)
├── styles/
│   └── global.css (dark theme, minimal)
└── utils/
    ├── notion.js (API helpers)
    └── stripe.js (payment helpers)
```

### Environment Variables
```
NOTION_TOKEN=
NOTION_DATABASE_ID=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Launch Strategy

### Pre-Launch
- Creator populates 10-15 diverse projects
- Test with small group of trusted friends
- Refine based on initial feedback
- Prepare launch narrative

### Launch
- Simple blog post explaining the concept
- Share in creative/tech communities aligned with values
- No growth hacking, no viral mechanics
- Organic discovery through resonance

### Post-Launch
- Monitor usage patterns and feedback
- Iterate based on real user behavior
- Stay true to principles while improving experience
- Resist pressure to add complex features

---

**Remember: This is version 0.1 of the platform design. Everything can and should evolve based on what we learn from actually building and using it.**
