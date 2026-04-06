import useOrderStore from '../store/useOrderStore';

/**
 * Customizer control panel component
 * Provides UI controls for bag type, colors, materials, and quantity
 */
export default function Customizer() {
  const {
    bagType,
    sequinColor,
    sequinStyle,
    frameColor,
    panelColor,
    quantity,
    setBagType,
    setSequinColor,
    setSequinStyle,
    setFrameColor,
    setPanelColor,
    setQuantity,
  } = useOrderStore();

  const presetSequinColors = [
    { name: 'Multicolor', color: '#FF6B9D' },
    { name: 'Black & Navy', color: '#1a1a2e' },
    { name: 'Gold & Silver', color: '#C9A84C' },
    { name: 'Coral', color: '#FF6B9D' },
    { name: 'Teal', color: '#16a085' },
    { name: 'Violet', color: '#9b59b6' },
  ];

  return (
    <div className="bg-zinc-800 rounded-2xl shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-serif text-amber-400 mb-4">
        Customize Your Bag
      </h2>

      {/* Bag Type Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-amber-400">
          Bag Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setBagType('tote')}
            className={`p-4 rounded-xl border-2 transition-all ${
              bagType === 'tote'
                ? 'border-amber-500 bg-amber-500/20 text-white'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <div className="font-bold">TOTE BAG</div>
            <div className="text-xs mt-1">Sequin Cover</div>
          </button>
          <button
            onClick={() => setBagType('clutch')}
            className={`p-4 rounded-xl border-2 transition-all ${
              bagType === 'clutch'
                ? 'border-amber-500 bg-amber-500/20 text-white'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <div className="font-bold">CLUTCH BAG</div>
            <div className="text-xs mt-1">Metal Frame</div>
          </button>
        </div>
      </div>

      {/* Tote Bag Controls */}
      {bagType === 'tote' && (
        <>
          {/* Sequin Color Picker */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-amber-400">
              Sequin Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              {presetSequinColors.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setSequinColor(preset.color)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    sequinColor === preset.color
                      ? 'border-amber-500'
                      : 'border-zinc-700 hover:border-zinc-600'
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={preset.name}
                >
                  <div className="text-[10px] font-bold text-white drop-shadow-lg">
                    {preset.name}
                  </div>
                </button>
              ))}
            </div>
            <input
              type="color"
              value={sequinColor}
              onChange={(e) => setSequinColor(e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sequin Style Toggle */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-amber-400">
              Material Finish
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSequinStyle('glossy')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  sequinStyle === 'glossy'
                    ? 'border-amber-500 bg-amber-500/20 text-white'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                ✨ Glossy
              </button>
              <button
                onClick={() => setSequinStyle('matte')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  sequinStyle === 'matte'
                    ? 'border-amber-500 bg-amber-500/20 text-white'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                🌙 Matte
              </button>
            </div>
          </div>
        </>
      )}

      {/* Clutch Bag Controls */}
      {bagType === 'clutch' && (
        <>
          {/* Frame Color Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-amber-400">
              Frame Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFrameColor('gold')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  frameColor === 'gold'
                    ? 'border-amber-500 bg-amber-500/20 text-white'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                Gold
              </button>
              <button
                onClick={() => setFrameColor('silver')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  frameColor === 'silver'
                    ? 'border-amber-500 bg-amber-500/20 text-white'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                Silver
              </button>
              <button
                onClick={() => setFrameColor('rose-gold')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  frameColor === 'rose-gold'
                    ? 'border-amber-500 bg-amber-500/20 text-white'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                Rose Gold
              </button>
            </div>
          </div>

          {/* Panel Color Picker */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-amber-400">
              Panel Color
            </label>
            <input
              type="color"
              value={panelColor}
              onChange={(e) => setPanelColor(e.target.value)}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>
        </>
      )}

      {/* Quantity Stepper */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-amber-400">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(quantity - 1)}
            className="w-12 h-12 rounded-lg bg-zinc-900 border-2 border-zinc-700 hover:border-amber-500 text-xl font-bold transition-all"
            disabled={quantity <= 1}
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="flex-1 h-12 px-4 rounded-lg bg-zinc-900 border-2 border-zinc-700 text-center text-xl font-bold focus:border-amber-500 outline-none"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 rounded-lg bg-zinc-900 border-2 border-zinc-700 hover:border-amber-500 text-xl font-bold transition-all"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
