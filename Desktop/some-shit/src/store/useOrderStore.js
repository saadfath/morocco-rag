import { create } from 'zustand';

/**
 * Zustand store for SACIMAK bag customizer
 * Manages bag customization state and customer orders
 */
const useOrderStore = create((set) => ({
  // Current bag customization state
  bagType: 'tote',
  sequinColor: '#FF6B9D', // Default: coral/pink
  sequinStyle: 'glossy',
  frameColor: 'gold',
  panelColor: '#C9A84C', // Default: sakimak gold
  quantity: 1,

  // Orders collection
  orders: [],

  /**
   * Updates the bag type (tote or clutch)
   * @param {string} type - 'tote' or 'clutch'
   */
  setBagType: (type) => set({ bagType: type }),

  /**
   * Updates the sequin color for tote bags
   * @param {string} color - Hex color code
   */
  setSequinColor: (color) => set({ sequinColor: color }),

  /**
   * Updates the sequin style (glossy or matte)
   * @param {string} style - 'glossy' or 'matte'
   */
  setSequinStyle: (style) => set({ sequinStyle: style }),

  /**
   * Updates the frame color for clutch bags
   * @param {string} color - 'gold', 'silver', or 'rose-gold'
   */
  setFrameColor: (color) => set({ frameColor: color }),

  /**
   * Updates the panel color for clutch bags
   * @param {string} color - Hex color code
   */
  setPanelColor: (color) => set({ panelColor: color }),

  /**
   * Updates the quantity
   * @param {number} qty - Quantity value
   */
  setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),

  /**
   * Adds a new order to the orders collection
   * @param {Object} orderData - Order information
   */
  addOrder: (orderData) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          id: `ORDER-${Date.now()}`,
          timestamp: new Date().toISOString(),
          status: 'pending',
          ...orderData,
        },
      ],
    })),

  /**
   * Updates an order's status
   * @param {string} orderId - Order ID
   * @param {string} status - New status ('pending', 'confirmed', 'completed')
   */
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),

  /**
   * Resets customization to defaults
   */
  resetCustomization: () =>
    set({
      bagType: 'tote',
      sequinColor: '#FF6B9D',
      sequinStyle: 'glossy',
      frameColor: 'gold',
      panelColor: '#C9A84C',
      quantity: 1,
    }),
}));

export default useOrderStore;
