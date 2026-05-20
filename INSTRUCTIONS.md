Jamii Sasa Frontend Engineering Guidelines (Vue.js)
Objective

Build a scalable, production-grade, mobile-first social commerce application for African markets focused on trust-driven service discovery, not just listings.

The frontend must prioritize:

Speed on low-end devices
Mobile usability
Trust visibility
Simplicity
Real-world usability over visual complexity
1. Core Product Principles
Build for Trust First

Every UI decision must reinforce:

credibility
transparency
familiarity
accountability

Trust indicators must always be visible:

verified badges
mutual connections
recommendation source
completed jobs
repeat customers
recent activity

Do not hide critical trust signals behind tabs.

Mobile-First Always

Most users will use:

Android devices
inconsistent internet
low-end phones

Requirements:

Design mobile-first before desktop
Avoid heavy animations
Minimize bundle size
Optimize image loading
Avoid unnecessary API calls
Ensure touch-friendly spacing
Reduce Cognitive Load

Target users are not power users.

Avoid:

cluttered interfaces
too many actions
hidden flows
technical language

Prioritize:

clear actions
obvious navigation
progressive disclosure
simple forms
2. Frontend Architecture Standards
Stack

Required:

Vue 3
Composition API
Pinia
Vue Router
Axios
TailwindCSS

Optional:

VueUse
Zod/Yup for validation

Avoid unnecessary libraries.

Folder Structure

Use scalable modular architecture.

Example:

src/
 ├── api/
 ├── assets/
 ├── components/
 │    ├── shared/
 │    ├── booking/
 │    ├── social/
 │    └── provider/
 ├── composables/
 ├── layouts/
 ├── modules/
 ├── pages/
 ├── router/
 ├── stores/
 ├── services/
 ├── utils/
 └── types/
3. Component Standards
Components Must Be:
reusable
isolated
small
composable

Avoid massive components.

Separate:
UI logic
business logic
API logic

Never place API calls directly inside deeply nested UI components.

Use:

composables
service layers
Naming Convention
BaseButton.vue
ProviderCard.vue
BookingSummaryCard.vue
ReviewList.vue

Avoid vague names:

Card1.vue
DataComponent.vue
4. State Management Rules
Use Pinia Properly

Global state only for:

authentication
user session
notifications
bookings
app settings

Do NOT store temporary form state globally.

Persist Carefully

Persist only critical data:

auth token
onboarding progress
cached preferences

Never persist sensitive payment data.

5. API & Data Handling
API Standards

All API calls must:

handle loading states
handle empty states
handle retries
handle offline failures gracefully

No silent failures.

Error Handling

Every request must:

show user-friendly feedback
allow retry where necessary

Never expose raw backend errors.

Optimistic UI

Use cautiously:

bookings
recommendations
payments

Never fake successful payments.

6. UX Standards
Every Screen Must Have:
loading state
empty state
error state

Missing states = incomplete implementation.

Navigation Rules

Primary actions must always be obvious.

Examples:

Book Service
Message Provider
Recommend Provider
Pay Now

Avoid hidden CTAs.

Forms

Requirements:

inline validation
clear error messages
mobile keyboard optimization
autosave where appropriate

Minimize typing.

Prefer:

dropdowns
chips
smart defaults
7. Performance Requirements
Performance Is a Product Feature

Must optimize:

lazy loading routes
code splitting
image compression
virtual scrolling
caching
pagination
Target
Fast first paint on 3G
Smooth scrolling
Minimal layout shifts
8. Accessibility Standards

Required:

semantic HTML
keyboard accessibility
proper contrast
readable font sizes
touch targets ≥ 44px

Do not rely on color alone for status indicators.

9. Trust System UI Rules

This is NOT a generic marketplace.

The UI must emphasize:

who recommended a provider
relationship context
verified work history
social proof

Examples:

“Recommended by Brian Otieno”
“3 people in your network used this provider”
“Repeat customer”

These trust indicators are core product infrastructure.

10. Booking & Payment UX

Critical flows:

booking
confirmation
checkout
payment verification

Must feel:

safe
transparent
predictable

Always show:

pricing breakdown
provider details
booking summary
cancellation policy
payment status

Never create ambiguity around money.

11. Design Consistency

Use:

consistent spacing
consistent typography
reusable design tokens
shared button styles
shared input styles

Avoid:

random colors
inconsistent margins
different interaction patterns
12. Code Quality Rules

Every PR/check must verify:

no console logs
no dead code
no duplicated components
proper typing
responsive layouts
accessibility checks
loading/error states included
13. Testing Expectations

Minimum:

component tests
form validation tests
route protection tests
API failure tests

Critical flows must be tested:

authentication
booking
checkout
reviews
14. Security Rules

Never trust frontend input.

Must implement:

route guards
token expiration handling
secure storage practices
input sanitization

Never expose secrets in frontend code.

15. Product Mindset Expectations

Do NOT build features blindly.

Before implementing any screen, verify:

What user problem does this solve?
What trust problem does this reduce?
Is this necessary for MVP?
Can this be simplified further?
Does this work well on mobile?

Complexity is failure unless proven necessary.

16. MVP Discipline

This is an MVP.

Prioritize:

reliability
clarity
speed
trust

Do NOT over-engineer:

animations
micro interactions
dashboards
settings
customization

Focus on:

discovery
trust
booking
payment
reviews
provider reputation