import { useState } from 'react';
import useOrderStore from '../store/useOrderStore';

/**
 * Admin dashboard component
 * Displays order management table with stats and filters
 */
export default function Dashboard() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [filter, setFilter] = useState('all');

  /**
   * Calculates order statistics
   * @returns {Object} Stats object with total, pending, confirmed, completed counts
   */
  const getStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      confirmed: orders.filter((o) => o.status === 'confirmed').length,
      completed: orders.filter((o) => o.status === 'completed').length,
    };
  };

  /**
   * Filters orders based on selected filter
   * @returns {Array} Filtered orders array
   */
  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter((order) =>
      filter === 'tote'
        ? order.bagType === 'tote'
        : filter === 'clutch'
        ? order.bagType === 'clutch'
        : order.status === filter
    );
  };

  /**
   * Formats timestamp to readable date
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Formatted date string
   */
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Returns status badge styling
   * @param {string} status - Order status
   * @returns {string} Tailwind classes for badge
   */
  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-900/30 text-yellow-400 border-yellow-500',
      confirmed: 'bg-blue-900/30 text-blue-400 border-blue-500',
      completed: 'bg-green-900/30 text-green-400 border-green-500',
    };
    return badges[status] || badges.pending;
  };

  const stats = getStats();
  const filteredOrders = getFilteredOrders();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-800 rounded-2xl shadow-xl p-6 border-2 border-amber-500/30">
          <div className="text-3xl font-bold text-amber-400">
            {stats.total}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Total Orders</div>
        </div>
        <div className="bg-zinc-800 rounded-2xl shadow-xl p-6 border-2 border-yellow-500/30">
          <div className="text-3xl font-bold text-yellow-400">
            {stats.pending}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Pending</div>
        </div>
        <div className="bg-zinc-800 rounded-2xl shadow-xl p-6 border-2 border-blue-500/30">
          <div className="text-3xl font-bold text-blue-400">
            {stats.confirmed}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Confirmed</div>
        </div>
        <div className="bg-zinc-800 rounded-2xl shadow-xl p-6 border-2 border-green-500/30">
          <div className="text-3xl font-bold text-green-400">
            {stats.completed}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Completed</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-zinc-800 rounded-2xl shadow-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('tote')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'tote'
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Tote Bags
          </button>
          <button
            onClick={() => setFilter('clutch')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'clutch'
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Clutch Bags
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'pending'
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'confirmed'
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'completed'
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900 border-b-2 border-amber-500">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-amber-400">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-amber-400">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-amber-400">
                  Bag Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-amber-400">
                  Config
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-amber-400">
                  Qty
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-amber-400">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-amber-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    No orders found. Create your first order!
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-zinc-300">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-white">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {order.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-bold uppercase">
                        {order.bagType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {order.bagType === 'tote' ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border-2 border-zinc-600"
                            style={{
                              backgroundColor: order.config.sequinColor,
                            }}
                          />
                          <span className="text-zinc-300">
                            {order.config.sequinStyle}
                          </span>
                        </div>
                      ) : (
                        <div className="text-zinc-300">
                          {order.config.frameColor} frame
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-white">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400">
                      {formatDate(order.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-lg text-sm font-semibold border-2 cursor-pointer outline-none ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
