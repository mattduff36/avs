# Product Requirements Document: Admin Panel - Machines for Sale Feature

## Introduction/Overview

This feature introduces an admin panel that allows authorized users to manage which machines are marked as "for sale" on the A&V Squires website. The primary goal is to enable the customer to make small content changes themselves without requiring developer intervention. The feature will add visual "For Sale" badges to machines on the /machines page and create a dynamic "Machines for Sale" section on the homepage when applicable.

## Goals

1. **Enable Self-Service Content Management**: Allow the customer to independently toggle machines as "for sale" without technical assistance
2. **Enhance Visual Communication**: Clearly indicate which machines are available for purchase through prominent badges
3. **Improve User Experience**: Create an engaging, animated badge system that matches the existing site aesthetics
4. **Maintain Site Performance**: Implement lightweight local storage solution that doesn't impact site speed
5. **Ensure Security**: Protect admin functionality behind proper authentication

## User Stories

1. **As a site administrator**, I want to log into an admin panel using username/password credentials so that I can manage machine sale status securely.

2. **As a site administrator**, I want to see a list of all machines with toggle switches so that I can easily mark machines as "for sale" or remove them from sale.

3. **As a site administrator**, I want changes to be saved automatically so that the website updates immediately without additional steps.

4. **As a website visitor**, I want to see clear "For Sale" badges on machines that are available for purchase so that I know which equipment I can buy.

5. **As a website visitor**, I want to see a dedicated "Machines for Sale" section on the homepage so that I can quickly find available equipment without browsing all machines.

6. **As a website visitor**, I want the "For Sale" badges to have engaging animations (like the 50-years badge) so that they catch my attention and enhance the browsing experience.

## Functional Requirements

### Authentication System
1. The system must provide a secure login page at `/admin` route
2. The system must authenticate users with username/password credentials stored as environment variables
3. The system must maintain login sessions and redirect unauthorized users to the login page
4. The system must provide a logout functionality
5. The system must protect all admin routes from unauthorized access

### Admin Interface
6. The system must display a list of all machines from the existing machinesData array
7. The system must provide toggle switches for each machine to set "for sale" status
8. The system must show machine names, images, and current sale status clearly
9. The system must save changes automatically when toggles are switched
10. The system must provide visual feedback when changes are saved
11. The system must maintain the existing machine data structure while adding sale status

### Data Storage
12. The system must store "for sale" status in a local JSON file (e.g., `machines-for-sale.json`)
13. The system must read this data on application startup and merge with existing machine data
14. The system must write changes to the JSON file immediately when toggles are changed
15. The system must handle file read/write errors gracefully

### Frontend Display - Machines Page
16. The system must display "For Sale" badges on machines marked as for sale
17. The badges must appear in the top-right corner of machine images
18. The badges must have the same animation as the 50-years badge (scale + rotate on hover)
19. The badges must be visually distinct and professionally styled
20. The system must maintain all existing machine page functionality

### Frontend Display - Homepage
21. The system must create a new "Machines for Sale" section on the homepage
22. This section must only appear when at least one machine is marked for sale
23. The section must be hidden completely when no machines are for sale
24. The section must display machine cards with "For Sale" badges
25. The section must link to the full machines page or individual machine details
26. The section must follow the existing homepage design patterns

### Badge Animation & Styling
27. The "For Sale" badge must use the same animation system as the 50-years badge
28. The badge must scale and rotate on hover (group-hover:scale-110 group-hover:rotate-6)
29. The badge must be positioned in the top-right corner of machine images
30. The badge must be styled consistently with the site's yellow color scheme
31. The badge must include appropriate drop shadows and visual effects

## Non-Goals (Out of Scope)

1. **Price Management**: This feature will not include price setting or display functionality
2. **Inventory Management**: No stock levels, availability dates, or detailed sales information
3. **User Registration**: No customer account creation or management
4. **Payment Processing**: No e-commerce or transaction functionality
5. **Email Notifications**: No automated notifications when machines are marked for sale
6. **Multi-level Admin**: Only single admin level access, no role-based permissions
7. **Content Management Beyond Machines**: No editing of services, contact info, or other site content
8. **Database Integration**: No database setup or migration requirements
9. **Audit Trail**: No logging or tracking of admin changes
10. **Mobile Admin Interface**: Admin panel optimized for desktop use only

## Design Considerations

### Visual Design
- **Badge Design**: Create a "For Sale" badge that complements the existing 50-years badge style
- **Color Scheme**: Use the site's custom yellow (#FFDD44 or similar) for consistency
- **Typography**: Match existing font weights and styles
- **Positioning**: Top-right corner placement to avoid interfering with existing content

### Animation Specifications
- **Hover Effect**: `group-hover:scale-110 group-hover:rotate-6`
- **Transition**: `transition-all duration-500`
- **Initial State**: `opacity-1 scale-1`
- **Drop Shadow**: `drop-shadow-lg` for depth

### Homepage Integration
- **Section Placement**: Position between hero section and services/stats
- **Responsive Design**: Ensure section works on all device sizes
- **Content Hierarchy**: Maintain visual balance with existing homepage sections

## Technical Considerations

### Framework Integration
- **Next.js Compatibility**: Ensure all features work with Next.js 15.5.0
- **Server-Side Rendering**: Handle data loading appropriately for SSR
- **API Routes**: Use Next.js API routes for admin functionality
- **Environment Variables**: Store credentials securely in `.env.local`

### File System Operations
- **JSON File Location**: Store in `/data/machines-for-sale.json`
- **Error Handling**: Graceful fallbacks if file doesn't exist or is corrupted
- **Atomic Writes**: Ensure file writes are atomic to prevent corruption
- **Backup Strategy**: Consider simple backup mechanism for data safety

### Performance Considerations
- **Minimal Bundle Impact**: Keep admin code separate from public bundle
- **Efficient Data Loading**: Only load admin data when needed
- **Animation Performance**: Use CSS transforms for smooth animations
- **Image Optimization**: Ensure badge images are properly optimized

### Security Measures
- **Environment Variables**: Store admin credentials in `.env.local`
- **Route Protection**: Implement middleware to protect admin routes
- **Session Management**: Use secure session handling
- **Input Validation**: Validate all admin inputs

## Success Metrics

### Primary Success Criteria
1. **Admin Adoption**: Customer successfully uses admin panel without developer assistance within first week
2. **Functionality Accuracy**: 100% of toggle changes reflect correctly on frontend within 5 seconds
3. **Visual Integration**: "For Sale" badges appear consistent with existing design language
4. **Performance Maintenance**: No measurable impact on page load times (< 50ms difference)

### Secondary Success Criteria
5. **User Engagement**: Increase in contact form submissions mentioning machines for sale
6. **Admin Efficiency**: Reduce time to mark machines for sale from hours (via developer) to minutes (self-service)
7. **Error Rate**: Zero critical errors in admin functionality during first month
8. **Mobile Compatibility**: Homepage "Machines for Sale" section displays correctly on all device sizes

## Open Questions

1. **Badge Image**: Should we create a custom "For Sale" badge image or use text-based badge?
2. **Homepage Section Title**: What should the "Machines for Sale" section be titled? ("Equipment for Sale", "Available Machines", etc.)
3. **Machine Linking**: Should homepage sale items link to the machines page or individual machine sections?
4. **Admin Panel Styling**: Should the admin panel match the main site design or use a simpler, functional design?
5. **Session Duration**: How long should admin sessions remain active?
6. **Backup/Recovery**: Do we need a simple backup mechanism for the JSON data file?
7. **Multiple Admins**: Are there multiple people who might need admin access, requiring multiple username/password pairs?

## Implementation Priority

### Phase 1 (MVP)
- Basic admin authentication
- Simple toggle interface for machines
- JSON file storage system
- "For Sale" badges on machines page

### Phase 2 (Enhancement)
- Homepage "Machines for Sale" section
- Badge animations and styling refinements
- Error handling and edge cases
- Admin panel UI improvements

### Phase 3 (Polish)
- Performance optimizations
- Security hardening
- Documentation and user guide
- Testing and quality assurance
