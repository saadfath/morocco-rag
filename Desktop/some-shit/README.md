# SACIMAK — Luxury Handmade Bag Customizer

A stunning 3D bag customizer application for SACIMAK, a Moroccan-inspired artisanal luxury bag brand. Built with React Three Fiber for immersive 3D product visualization.

![SACIMAK](https://img.shields.io/badge/SACIMAK-Luxury_Bags-C9A84C?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Interactive 3D Customizer**
- **Real-time 3D Preview**: Rotate, zoom, and view bags from any angle
- **Procedural 3D Models**: Custom-built tote and clutch bag meshes using Three.js
- **Live Material Updates**: See color and material changes instantly

### 👜 **Two Bag Types**

#### TOTE BAG
- Rectangular open-top design with handle arcs
- Covered in overlapping sequins (fish-scale pattern)
- Customizable sequin colors: multicolor rainbow, black+navy, gold+silver, or custom
- Material finish: Glossy or Matte

#### CLUTCH BAG
- Slim rectangular box clutch with rounded corners
- Metallic frame (Gold, Silver, Rose Gold)
- Customizable front panel color
- Elegant minimal design

### 🛒 **Customer Features**
- Intuitive color picker with preset palettes
- Quantity selector
- Order form with customer details
- Order summary with visual config preview
- Success feedback on order submission

### 📊 **Admin Dashboard**
- Real-time order statistics (Total, Pending, Confirmed, Completed)
- Comprehensive orders table with filtering
- Filter by: Bag type, Status, Date
- Inline status updates
- Color-coded status badges

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite 8
- **3D Graphics**: React Three Fiber + Drei + Three.js
- **State Management**: Zustand
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite with Rolldown

## 📦 Installation

```bash
# Clone the repository
cd /home/saadf/Desktop/some-shit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Project Structure

```
some-shit/
├── public/
│   └── models/              # 3D model assets (.glb files)
├── src/
│   ├── components/
│   │   ├── BagViewer.jsx    # 3D viewer with R3F
│   │   ├── Customizer.jsx   # Customization controls
│   │   ├── OrderForm.jsx    # Customer order form
│   │   ├── Dashboard.jsx    # Admin dashboard
│   │   └── Navbar.jsx       # Navigation bar
│   ├── store/
│   │   └── useOrderStore.js # Zustand state management
│   ├── pages/
│   │   ├── Home.jsx         # Landing + customizer page
│   │   └── DashboardPage.jsx # Admin orders page
│   ├── App.jsx              # Router configuration
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind + custom styles
├── MEMORY.md                # Project state tracking
├── PROGRESS.md              # Development progress log
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#C9A84C` (sacimak-gold)
- **Dark Base**: `zinc-950`, `zinc-900`, `zinc-800`
- **Accent Gold**: `amber-400`, `amber-500`
- **Sequin Colors**: Coral (`#FF6B9D`), Teal (`#16a085`), Violet (`#9b59b6`)

### Typography
- **Brand Font**: Playfair Display (serif)
- **UI Font**: Inter (sans-serif)

### Components
- Cards: `bg-zinc-800 rounded-2xl shadow-xl`
- Buttons: `bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl`
- Borders: `border-amber-500/30`

## 🔧 Development

### Store Schema

```javascript
{
  bagType: 'tote' | 'clutch',
  sequinColor: '#hex',
  sequinStyle: 'glossy' | 'matte',
  frameColor: 'gold' | 'silver' | 'rose-gold',
  panelColor: '#hex',
  quantity: 1,
  orders: [
    {
      id: string,
      customerName: string,
      email: string,
      bagType: string,
      config: object,
      quantity: number,
      notes: string,
      timestamp: string,
      status: 'pending' | 'confirmed' | 'completed'
    }
  ]
}
```

### Key Components

#### BagViewer.jsx
- Uses React Three Fiber Canvas
- Procedural tote: BoxGeometry + TorusGeometry handles
- Procedural clutch: BoxGeometry body with frame details
- OrbitControls with auto-rotate
- Environment lighting (studio preset)

#### Customizer.jsx
- Dynamic controls based on bag type
- Color pickers with preset palettes
- Material style toggle (glossy/matte)
- Quantity stepper

#### Dashboard.jsx
- Statistics cards with color-coded badges
- Filter bar for multi-dimensional filtering
- Responsive orders table
- Inline status management

## 📝 Documentation

All components, functions, and hooks are fully documented with JSDoc comments. See individual files for detailed API documentation.

## 🎭 Brand Identity

**SACIMAK** represents bold, artisanal, Moroccan-inspired luxury. Each bag is a handcrafted work of art featuring:
- High-quality sequins and metallic finishes
- Artisanal craftsmanship
- Unique colorful designs
- Premium materials

## 🚀 Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production-ready files
# Deploy to any static hosting service (Vercel, Netlify, etc.)
```

## 📄 License

Private project for SACIMAK brand.

## 👨‍💻 Development Notes

- **Memory Tracking**: See `MEMORY.md` for current project state
- **Progress Log**: See `PROGRESS.md` for development history
- **Code Quality**: All code follows JSDoc documentation standards
- **File Size**: Components kept under 150 lines where possible

---

**Built with ❤️ for SACIMAK — Where Artisanal Craftsmanship Meets Modern Technology**

