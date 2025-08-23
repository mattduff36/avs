# Website Improvements Task List

Based on the comprehensive website audit conducted, this task list addresses all identified improvement suggestions to enhance performance, user experience, and technical quality.

## Relevant Files

- `src/components/HeroSlideshow.tsx` - Hero slideshow component requiring image optimization
- `src/components/Header.tsx` - Header component with logo requiring aspect ratio fixes
- `src/components/sections/HeroSection.tsx` - Hero section with 50-years badge requiring aspect ratio fixes
- `src/app/layout.tsx` - Root layout requiring scroll behavior and meta tag improvements
- `src/app/globals.css` - Global styles requiring scroll behavior attribute
- `src/app/machines/page.tsx` - Machines page requiring image optimization and loading states
- `src/app/services/page.tsx` - Services page requiring image optimization
- `src/app/projects/page.tsx` - Projects page requiring image optimization
- `src/app/contact/page.tsx` - Contact page requiring loading states
- `src/components/ui/loading-spinner.tsx` - New loading spinner component
- `src/components/ui/image-skeleton.tsx` - New image skeleton component
- `src/components/ui/error-boundary.tsx` - New error boundary component
- `src/lib/seo.ts` - New SEO utility functions
- `next.config.js` - Next.js configuration requiring image domain updates

### Notes

- Focus on performance optimizations first as they have the most impact on user experience
- Image optimizations should be implemented systematically across all pages
- Loading states and error boundaries improve perceived performance and reliability
- SEO improvements will enhance search engine visibility

## Tasks

- [x] 1.0 Image Performance Optimization
  - [x] 1.1 Add `sizes` prop to all images with `fill` attribute in HeroSlideshow component
  - [x] 1.2 Add `sizes` prop to service images on services page
  - [x] 1.3 Add `sizes` prop to machine images on machines page
  - [x] 1.4 Add `sizes` prop to project images on projects page
  - [x] 1.5 Add `sizes` prop to hero background image on home page
  - [x] 1.6 Fix logo aspect ratio by adding `width="auto"` or `height="auto"` in Header component
  - [x] 1.7 Fix 50-years badge aspect ratio by adding `width="auto"` or `height="auto"` in HeroSection
  - [x] 1.8 Add `priority` prop to above-the-fold images (hero slideshow, first service image)
  - [x] 1.9 Ensure all below-the-fold images use lazy loading (default behavior)

- [x] 2.0 Loading States and User Feedback
  - [x] 2.1 Create LoadingSpinner component with customizable size and color props
  - [x] 2.2 Create ImageSkeleton component for image loading states
  - [x] 2.3 Add loading spinner to machine image modal when opening
  - [x] 2.4 Add skeleton loading to service cards during expansion
  - [x] 2.5 Add loading state to contact page form submission (if form exists)
  - [x] 2.6 Add loading indicator to hero slideshow during image transitions
  - [x] 2.7 Implement loading states for external link clicks (Facebook, MPDEE)
  - [x] 2.8 Add hover effects to interactive elements (buttons, cards, links)

- [x] 3.0 Error Handling and Reliability
  - [x] 3.1 Create ErrorBoundary component with fallback UI
  - [x] 3.2 Wrap main page components with ErrorBoundary
  - [x] 3.3 Add error handling for image loading failures
  - [x] 3.4 Add fallback images for failed image loads
  - [x] 3.5 Implement error handling for external API calls (if any)
  - [x] 3.6 Add error logging for debugging purposes
  - [x] 3.7 Create user-friendly error messages for common failures

- [x] 4.0 SEO and Meta Tag Improvements
  - [x] 4.1 Create SEO utility functions in `src/lib/seo.ts`
  - [x] 4.2 Add comprehensive meta descriptions for all pages
  - [x] 4.3 Add Open Graph tags for social media sharing
  - [x] 4.4 Add Twitter Card meta tags
  - [x] 4.5 Add structured data (JSON-LD) for business information
  - [x] 4.6 Add canonical URLs to prevent duplicate content
  - [x] 4.7 Add alt text to all images for accessibility
  - [x] 4.8 Add proper heading hierarchy (h1, h2, h3) across all pages
  - [x] 4.9 Add schema markup for contact information and services

- [x] 5.0 Technical Configuration Updates
  - [x] 5.1 Add `data-scroll-behavior="smooth"` to html element in layout.tsx
  - [x] 5.2 Update Next.js config to use `images.remotePatterns` instead of deprecated `images.domains`
  - [x] 5.3 Move `experimental.turbo` to `config.turbopack` in next.config.js
  - [x] 5.4 Add `allowedDevOrigins` configuration for cross-origin requests
  - [x] 5.5 Optimize CSS bundle size by removing unused styles
  - [x] 5.6 Add proper caching headers for static assets
  - [x] 5.7 Configure proper security headers
  - [x] 5.8 Add robots.txt and sitemap.xml for SEO
  - [x] 5.9 Implement proper 404 page with helpful navigation
