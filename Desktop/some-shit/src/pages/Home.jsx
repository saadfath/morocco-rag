import BagViewer from '../components/BagViewer';
import Customizer from '../components/Customizer';
import OrderForm from '../components/OrderForm';
import useOrderStore from '../store/useOrderStore';

/**
 * Home page component
 * Main landing page with hero section, bag customizer, and order form
 */
export default function Home() {
  const setBagType = useOrderStore((state) => state.setBagType);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-amber-400 mb-6 drop-shadow-lg">
            SACIMAK
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Handcrafted Luxury Bags — Bold, Artisanal, Moroccan-Inspired
          </p>
          <p className="text-lg text-zinc-400 mb-12 max-w-3xl mx-auto">
            Each bag is a unique work of art. Choose your style, customize
            every detail, and own a piece of artisanal luxury.
          </p>

          {/* Bag Type Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div
              onClick={() => {
                setBagType('tote');
                document
                  .getElementById('customizer')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-zinc-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-amber-500"
            >
              <div className="h-48 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                <div className="text-6xl">👜</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-amber-400 mb-2">
                  TOTE BAG
                </h3>
                <p className="text-zinc-300 mb-4">
                  Rectangular open-top tote covered in overlapping sequins.
                  Available in multicolor rainbow, black+navy, gold+silver.
                </p>
                <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all">
                  Customize Tote →
                </button>
              </div>
            </div>

            <div
              onClick={() => {
                setBagType('clutch');
                document
                  .getElementById('customizer')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-zinc-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-amber-500"
            >
              <div className="h-48 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 flex items-center justify-center">
                <div className="text-6xl">💼</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-amber-400 mb-2">
                  CLUTCH BAG
                </h3>
                <p className="text-zinc-300 mb-4">
                  Slim rectangular box clutch with rounded corners and gold
                  metallic frame. Elegant and minimal.
                </p>
                <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all">
                  Customize Clutch →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customizer Section */}
      <section id="customizer" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-amber-400 text-center mb-12">
            Design Your Perfect Bag
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Viewer */}
            <div className="h-[500px]">
              <BagViewer />
            </div>

            {/* Customizer Controls */}
            <Customizer />
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-2xl mx-auto">
          <OrderForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-zinc-500">
          <p className="font-serif text-amber-400 text-xl mb-2">SACIMAK</p>
          <p className="text-sm">
            Handcrafted with love. Each bag tells a story.
          </p>
        </div>
      </footer>
    </div>
  );
}
