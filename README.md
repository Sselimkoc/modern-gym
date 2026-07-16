# Modern Gym - Premium Fitness Experience

A modern, responsive React application for a premium fitness center, featuring a sleek design, scroll-driven animations, and an intuitive user interface. Built as a marketing/landing site for a fictional gym brand ("PowerFit").

![Modern Gym Website](public/logo192.png)

## Features

- **Stunning UI/UX**: Video hero section, animated components, and smooth transitions
- **Responsive Design**: Fully optimized for all device sizes
- **Modern Architecture**: Built with React 19 and styled-components
- **Interactive Elements**: Join modal form, cursor spotlight/tilt effects, animated count-up stats, sticky join button
- **Performance Optimized**: Lazy-loaded images, `prefers-reduced-motion` support, and scroll-linked animations via Framer Motion

## Key Sections

- Hero with video background and lead-capture modal
- Feature highlights ("Why Choose PowerFit")
- Fitness programs with category filtering
- Trainers/coaches showcase
- Membership plans (Basic / Premium / Elite)
- Testimonials (Google-review-style carousel)
- Mobile app promotion
- Facility photo gallery
- Contact section with map and working hours

## Technologies

- React 19
- Styled Components
- Framer Motion
- React Router DOM
- React Intersection Observer
- react-helmet-async (SEO/meta tags)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/modern-gym.git
cd modern-gym
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be in the `build` folder, ready for deployment.

## Project Structure

```
modern-gym/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── context/
│   ├── data/          # siteConfig.js — central content/config source
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   └── utils/
└── package.json
```

## License

MIT

## Author

Selim Koc
