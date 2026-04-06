import { useState } from 'react';
import useOrderStore from '../store/useOrderStore';

/**
 * Order form component
 * Collects customer information and submits orders
 */
export default function OrderForm() {
  const {
    bagType,
    sequinColor,
    sequinStyle,
    frameColor,
    panelColor,
    quantity,
    addOrder,
    resetCustomization,
  } = useOrderStore();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  /**
   * Handles form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles form submission and creates order
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const config =
      bagType === 'tote'
        ? { sequinColor, sequinStyle }
        : { frameColor, panelColor };

    addOrder({
      customerName: formData.customerName,
      email: formData.email,
      bagType,
      config,
      quantity,
      notes: formData.notes,
    });

    // Reset form and show success message
    setFormData({ customerName: '', email: '', notes: '' });
    setSubmitted(true);
    resetCustomization();

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-zinc-800 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-serif text-amber-400 mb-4">
        Place Your Order
      </h2>

      {submitted && (
        <div className="mb-4 p-4 bg-green-900/30 border-2 border-green-500 rounded-xl text-green-400">
          ✓ Order submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-semibold text-amber-400 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border-2 border-zinc-700 text-white focus:border-amber-500 outline-none transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-amber-400 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border-2 border-zinc-700 text-white focus:border-amber-500 outline-none transition-all"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Special Notes */}
        <div>
          <label className="block text-sm font-semibold text-amber-400 mb-2">
            Special Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border-2 border-zinc-700 text-white focus:border-amber-500 outline-none transition-all resize-none"
            placeholder="Any special requests or customization details..."
          />
        </div>

        {/* Order Summary */}
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-700">
          <div className="text-sm space-y-2 text-zinc-300">
            <div className="flex justify-between">
              <span>Bag Type:</span>
              <span className="font-bold text-white uppercase">{bagType}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="font-bold text-white">{quantity}</span>
            </div>
            {bagType === 'tote' && (
              <>
                <div className="flex justify-between items-center">
                  <span>Sequin Color:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border-2 border-zinc-600"
                      style={{ backgroundColor: sequinColor }}
                    />
                    <span className="font-bold text-white">{sequinColor}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Finish:</span>
                  <span className="font-bold text-white capitalize">
                    {sequinStyle}
                  </span>
                </div>
              </>
            )}
            {bagType === 'clutch' && (
              <>
                <div className="flex justify-between">
                  <span>Frame:</span>
                  <span className="font-bold text-white capitalize">
                    {frameColor}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Panel Color:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border-2 border-zinc-600"
                      style={{ backgroundColor: panelColor }}
                    />
                    <span className="font-bold text-white">{panelColor}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Add to Order
        </button>
      </form>
    </div>
  );
}
