# A&V Squires Plant Company LTD - Modern Website

A modern, professional website for A&V Squires Plant Company LTD, a leading civil engineering and plant hire company in the East Midlands.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Next.js 15 and optimized for speed
- **Accessible**: Following web accessibility best practices
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Interactive**: Smooth animations and hover effects using Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── machines/          # Equipment page
│   ├── news/              # News page
│   ├── projects/          # Projects page
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── ui/                # Shadcn/ui components
│   ├── Header.tsx         # Main navigation
│   └── Footer.tsx         # Site footer
├── data/                  # Site data and content
│   └── site-data.ts       # Structured site content
└── lib/                   # Utilities
    └── utils.ts           # Helper functions
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

All site content is managed through the structured data file at `src/data/site-data.ts`. This includes:

- Company information
- Contact details
- Navigation structure
- Services offered
- Statistics and achievements

To update content, simply modify the data in this file and the changes will be reflected across the entire site.

## 🎨 Design System

The website uses a consistent design system with:

- **Colors**: 
  - Primary: Orange (#ea580c)
  - Secondary: Slate grays
  - Background: White/Gray-50
- **Typography**: Inter font family
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: Shadcn/ui component library

## 📱 Pages

- **Homepage**: Hero section with company overview and featured services
- **About**: Company history, values, and achievements
- **Services**: Detailed service offerings with interactive cards
- **Projects**: Showcase of completed work
- **Machines**: Equipment and machinery information
- **News**: Latest company news and updates
- **Contact**: Contact form and company information

## 🔧 Customization

### Adding New Services
1. Add the service to the `services` array in `src/data/site-data.ts`
2. Include appropriate details: name, description, icon, etc.
3. Add images to the `public/images/` directory

### Modifying Styling
- Global styles: `src/app/globals.css`
- Component-specific: Use Tailwind classes
- Theme colors: Modify the CSS custom properties in `globals.css`

### Adding New Pages
1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your component
3. Update navigation in `src/data/site-data.ts`

## 🚀 Deployment

The site is ready for deployment to any Next.js-compatible platform:

- **Vercel**: Deploy directly from GitHub
- **Netlify**: Build command: `npm run build`
- **Custom server**: Export static files with `npm run build`

## 📊 Performance

The website is optimized for performance with:
- Image optimization using Next.js Image component
- Lazy loading for images and components
- Minimal JavaScript bundle size
- Fast loading animations
- Optimized CSS delivery

## 🎯 SEO

SEO optimization includes:
- Proper meta tags and descriptions
- Semantic HTML structure
- Image alt attributes
- Structured data for search engines
- Fast loading times

## 📞 Support

For technical support or questions about the website, please contact the development team.

---

Built with ❤️ for A&V Squires Plant Company LTD - Delivering excellence in construction since 1971.