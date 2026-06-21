# Uci Decoration - Wedding Organizer Platform

A modern wedding decoration booking platform built with React and Supabase.

## Features

- 🎨 Browse wedding decoration packages and services
- 📅 Book services with date selection
- 👤 User authentication (Login/Register)
- 📊 Personal dashboard to track bookings
- ⭐ Review and rate completed services
- 🏷️ Multi-category service filtering

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Supabase (PostgreSQL + Auth)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: Custom CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gykey/Wedding_org.git
cd Wedding_org
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the database schema:
- Open your Supabase SQL Editor
- Execute the contents of `supabase_schema.sql`

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
wedding_organizer/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Services.jsx      # Service catalog
│   │   ├── Dashboard.jsx     # User bookings
│   │   └── Login.jsx         # Authentication
│   ├── lib/
│   │   └── supabase.js       # Supabase client
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── supabase_schema.sql       # Database schema
└── package.json
```

## Database Schema

The application uses three main tables:
- `packages` - Service packages with pricing and features
- `bookings` - Customer orders
- `reviews` - Customer feedback and ratings

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## License

MIT

## Author

Uci Decoration Team
