# AI Coding Assistant Guidelines

**READ THIS FIRST before making any code changes**

This document contains critical guidelines for AI assistants working on the Cathedral of Unfinished Dreams codebase. Previous versions were derailed by complexity creep and broken integrations. These rules exist to prevent that.

## Core Principles

### 1. **IF IT WORKS, DON'T BREAK IT**
- Before modifying ANY existing code, ask: "Does this currently work?"
- Test existing functionality before making changes
- If something is working but imperfect, consider leaving it alone
- Incremental improvements > wholesale rewrites

### 2. **MINIMAL VIABLE CHANGES**
- Make the smallest possible change that solves the problem
- One feature at a time, one file at a time when possible
- Avoid "while I'm here, let me also..." changes
- Resist the urge to "improve" unrelated code

### 3. **ASK, DON'T ASSUME**
- If requirements are unclear, ask for clarification
- Don't invent features that aren't explicitly requested
- When in doubt about approach, present options rather than picking one
- Confirm understanding before implementing complex changes

## Specific Technical Rules

### Astro + React Integration
- **DO**: Keep React components in `/src/components/`
- **DO**: Use `client:only="react"` for interactive components
- **DON'T**: Mix React and Astro component patterns in the same file
- **DON'T**: Add React components to `.astro` files without explicit instruction

### Notion API Integration
- **DO**: Check existing Notion schema before adding new properties
- **DO**: Handle API errors gracefully (empty arrays, try/catch)
- **DON'T**: Modify the Notion database structure without confirmation
- **DON'T**: Assume Notion data exists or has expected format
- **CRITICAL**: Always provide fallbacks for missing Notion data

### Styling and UI
- **DO**: Use existing Tailwind classes and design patterns
- **DO**: Follow the dark theme aesthetic already established
- **DON'T**: Add new CSS frameworks or component libraries
- **DON'T**: Drastically change visual design without explicit request
- **REMEMBER**: Mobile responsiveness is important but secondary to desktop

### Payment Integration (When Added)
- **DO**: Use Stripe's recommended practices and examples
- **DO**: Handle payment failures gracefully
- **DON'T**: Store sensitive payment data in the app
- **DON'T**: Build custom payment UI without explicit instruction
- **CRITICAL**: Test payment flow thoroughly in sandbox mode

## Feature Scope Limitations

### ❌ DO NOT ADD without explicit request:
- User authentication or accounts
- Complex search or filtering
- Social features (comments, follows, likes)
- Advanced analytics or dashboards
- Multiple payment tiers or options
- Real-time features or websockets
- Third-party integrations beyond Stripe/Notion
- Performance optimizations unless there's a clear problem

### ✅ Safe to implement when requested:
- Simple UI improvements
- Basic responsive design fixes
- Error handling improvements
- Accessibility improvements
- Bug fixes for existing features

## Common Mistake Patterns to Avoid

### 1. **Overengineering Simple Features**
- BAD: Building a complex state management system for a simple counter
- GOOD: Using useState for simple component state

### 2. **Breaking Data Flow**
- BAD: Changing how Notion data is fetched without testing
- GOOD: Adding error handling to existing data flow

### 3. **Adding Dependencies**
- BAD: Installing new npm packages to solve simple problems
- GOOD: Using existing tools or writing simple custom code

### 4. **Premature Optimization**
- BAD: "This could be faster if we add caching/virtualization/etc"
- GOOD: "This works, ship it"

### 5. **Feature Creep**
- BAD: "While adding payments, I'll also add user profiles"
- GOOD: "Adding only the payment button as requested"

## Debugging Protocol

### When Code Doesn't Work:
1. **Check the console** for actual error messages
2. **Verify data structure** - log the Notion response to see actual format
3. **Test in isolation** - create minimal reproduction
4. **Check dependencies** - are all imports correct?
5. **Ask for help** if stuck for more than 30 minutes

### When Code Works But Looks Wrong:
1. **Check responsive design** at different screen sizes
2. **Verify dark theme** styles are applied correctly
3. **Test hover states** and interactions
4. **Confirm accessibility** basics (contrast, keyboard navigation)

## Project-Specific Context

### This Platform Is:
- An experiment in alternative creator economics
- Intentionally simple and focused
- Built for desktop-first browsing experience
- Optimized for ideas and text content, not media

### This Platform Is NOT:
- A social network
- A project management tool
- A complex marketplace
- A content management system

### Success Metrics:
- Does it work reliably?
- Can people browse ideas easily?
- Can creators add projects via Notion?
- When added: Can people send interest signals?

## Documentation Requirements

### MANDATORY: Track All Changes
- **Create/update** `docs/CHANGELOG.md` for every meaningful change
- **Include**: Date, AI agent name, what changed, why it changed
- **Format**: See example entry below
- **When**: After completing any task that modifies code or adds features

### Example Changelog Entry:
```markdown
## 2025-01-15 - Claude Sonnet 4
**Changed**: Added Stripe payment integration to project pages
**Why**: Implementing interest signal functionality per design doc
**Files Modified**: 
- src/components/SignalButton.jsx (new)
- src/pages/project/[id].astro (added button)
- src/utils/stripe.js (new)
**Notes**: Used Stripe Checkout, tested in sandbox mode
**Issues**: None, but mobile styling needs improvement
```

### Create Documentation Files:
- `docs/SETUP.md` - How to run the project locally
- `docs/DEPLOYMENT.md` - How to deploy changes
- `docs/API_NOTES.md` - Notion API quirks and workarounds
- `docs/TROUBLESHOOTING.md` - Common issues and solutions

### Update Existing Docs:
- If you modify how something works, update relevant docs
- If you discover new issues or solutions, add to troubleshooting
- Keep setup instructions current with any new dependencies

## Communication Guidelines

### Before Starting Work:
- Confirm you understand the specific request
- Ask about any unclear requirements
- Mention if the request seems to conflict with these guidelines

### During Work:
- Explain your approach before implementing
- Show code snippets for complex changes
- Ask for feedback on UI changes before finishing

### When Stuck:
- Describe what you've tried
- Share specific error messages
- Ask for guidance rather than making assumptions

## Emergency Protocols

### If You Break Something:
1. **STOP** adding features
2. **REVERT** to last working state if possible
3. **DOCUMENT** what went wrong
4. **ASK** for help debugging the specific issue

### If Requests Seem Out of Scope:
1. **REFERENCE** these guidelines
2. **EXPLAIN** why the request might break project principles
3. **SUGGEST** simpler alternatives if possible
4. **WAIT** for explicit confirmation before proceeding

## Remember

**This is version 0.1 of an experiment.** The goal is to ship something simple that works, not to build the perfect platform. When in doubt, choose the simpler approach. The platform embodies its own principles: incomplete, evolving, and honest about its limitations.

**Your job is to help build something that actually gets used, not something that's technically impressive.**

---

*These guidelines will evolve based on what we learn. When they need updating, update them rather than working around them.*
