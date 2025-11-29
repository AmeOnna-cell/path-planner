# Ilocos Norte Tourism Path Planner

An intelligent path planning application for tourists visiting Ilocos Norte, Philippines. Save time and fuel by optimizing your travel route through the region's top destinations.

## Features

- 🗺️ **Interactive Map** - Visualize destinations on an interactive Mapbox map centered on Laoag City
- 🎯 **Interest-Based Selection** - Choose from 8 different interest categories (Churches, Beaches, Museums, Cuisine, Nature, Landmarks, History, Shopping)
- 📍 **Smart Destination Cards** - View destinations with ratings, opening hours, and real-time open/closed status
- 🤖 **AI Travel Assistant** - Get personalized recommendations through an AI chatbot interface
- ⏰ **Real-Time Status** - Automatically sort destinations by open/closed status

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16.0.5
- **React**: 19.2.0
- **Styling**: Tailwind CSS v4
- **Maps**: Mapbox GL
- **UI Components**: Radix UI, Lucide React icons
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Mapbox account and access token ([Get one here](https://account.mapbox.com/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd path-planner
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.jsx          # Landing page
│   ├── onboarding/       # Interest selection page
│   └── map/              # Main map view with 3-column layout
├── components/
│   ├── ui/               # Reusable UI components
│   └── map.jsx           # Mapbox map component
└── lib/
    └── utils.js          # Utility functions
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Your Mapbox access token for map rendering | Yes |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
