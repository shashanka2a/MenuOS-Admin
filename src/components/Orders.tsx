import { useState } from 'react';
import { Search, Receipt, X } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  table: string;
  time: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'served';
  orderTime: string;
}

export function Orders() {
  const [showReceipt, setShowReceipt] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders: Order[] = [
    {
      id: 1245,
      table: 'Table 4',
      time: '2m ago',
      orderTime: '2:45 PM',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 14.0 },
        { name: 'Caesar Salad', quantity: 1, price: 12.0 },
        { name: 'Tiramisu', quantity: 2, price: 8.0 },
      ],
      total: 52.0,
      status: 'pending',
    },
    {
      id: 1244,
      table: 'Table 7',
      time: '8m ago',
      orderTime: '2:39 PM',
      items: [
        { name: 'Spaghetti Carbonara', quantity: 2, price: 14.0 },
        { name: 'Garlic Bread', quantity: 1, price: 6.5 },
      ],
      total: 34.5,
      status: 'confirmed',
    },
    {
      id: 1243,
      table: 'Table 2',
      time: '12m ago',
      orderTime: '2:35 PM',
      items: [
        { name: 'Quattro Formaggi Pizza', quantity: 1, price: 16.0 },
        { name: 'Lasagna', quantity: 1, price: 18.0 },
        { name: 'Caprese Salad', quantity: 2, price: 11.0 },
        { name: 'Tiramisu', quantity: 1, price: 8.0 },
        { name: 'Espresso', quantity: 2, price: 3.5 },
      ],
      total: 87.0,
      status: 'served',
    },
    {
      id: 1242,
      table: 'Table 9',
      time: '15m ago',
      orderTime: '2:32 PM',
      items: [
        { name: 'Panna Cotta', quantity: 2, price: 9.0 },
        { name: 'Affogato', quantity: 1, price: 7.5 },
      ],
      total: 25.5,
      status: 'served',
    },
    {
      id: 1241,
      table: 'Table 5',
      time: '22m ago',
      orderTime: '2:25 PM',
      items: [
        { name: 'Pepperoni Pizza', quantity: 1, price: 15.0 },
        { name: 'Greek Salad', quantity: 1, price: 12.0 },
        { name: 'Gelato', quantity: 2, price: 6.0 },
        { name: 'House Wine', quantity: 1, price: 32.0 },
      ],
      total: 77.0,
      status: 'served',
    },
    {
      id: 1240,
      table: 'Table 11',
      time: '28m ago',
      orderTime: '2:19 PM',
      items: [
        { name: 'Bruschetta', quantity: 3, price: 8.5 },
        { name: 'Carbonara', quantity: 2, price: 14.0 },
      ],
      total: 53.5,
      status: 'confirmed',
    },
    {
      id: 1239,
      table: 'Table 3',
      time: '35m ago',
      orderTime: '2:12 PM',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 14.0 },
        { name: 'Arugula Salad', quantity: 1, price: 11.5 },
      ],
      total: 39.5,
      status: 'served',
    },
    {
      id: 1238,
      table: 'Table 8',
      time: '42m ago',
      orderTime: '2:05 PM',
      items: [
        { name: 'Ravioli', quantity: 1, price: 16.5 },
        { name: 'Minestrone Soup', quantity: 1, price: 8.0 },
        { name: 'Tiramisu', quantity: 1, price: 8.0 },
      ],
      total: 32.5,
      status: 'served',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'confirmed':
        return 'bg-[#DCFCE7] text-[#166534]';
      case 'served':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
      default:
        return 'bg-[#F3F4F6] text-[#374151]';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-foreground mb-1">QR Orders</h1>
        <p className="text-muted-foreground">Orders placed through QR code scanning</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">Pending Orders</div>
          <div className="text-[28px] font-semibold text-foreground">
            {orders.filter(o => o.status === 'pending').length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">Confirmed</div>
          <div className="text-[28px] font-semibold text-foreground">
            {orders.filter(o => o.status === 'confirmed').length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">Total Orders Today</div>
          <div className="text-[28px] font-semibold text-foreground">{orders.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by table or order #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="served">Served</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order #
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Table
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Time Placed
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted cursor-pointer transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {order.table.replace('Table ', '')}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{order.table}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">{order.orderTime}</div>
                    <div className="text-xs text-muted-foreground">{order.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setShowReceipt(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Order Receipt</h2>
              <button onClick={() => setShowReceipt(null)} className="p-1 hover:bg-muted rounded">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-6">
              {/* Receipt Header */}
              <div className="text-center mb-6 pb-6 border-b border-border">
                <h3 className="text-xl font-semibold text-foreground mb-1">The Bistro</h3>
                <p className="text-sm text-muted-foreground">123 Main Street, City</p>
                <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
              </div>

              {/* Order Info */}
              <div className="space-y-2 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order #:</span>
                  <span className="font-medium text-foreground">#{showReceipt.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Table:</span>
                  <span className="font-medium text-foreground">{showReceipt.table}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium text-foreground">{showReceipt.orderTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(showReceipt.status)}`}>
                    {showReceipt.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <h4 className="font-medium text-foreground text-sm">Items</h4>
                {showReceipt.items.map((item, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.quantity}x ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">${showReceipt.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%):</span>
                  <span className="text-foreground">${(showReceipt.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="font-semibold text-foreground text-lg">
                    ${(showReceipt.total * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Note */}
              <div className="bg-accent p-3 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  Complete billing through your POS system
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => setShowReceipt(null)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#ff5520] transition-colors text-sm font-medium"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
