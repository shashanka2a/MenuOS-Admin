import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Clock } from 'lucide-react';

export function DashboardHome() {
  const metrics = [
    {
      label: 'Revenue',
      value: '$12,453',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      label: 'Orders',
      value: '284',
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingBag,
    },
    {
      label: 'Guests',
      value: '512',
      change: '-3.1%',
      trend: 'down' as const,
      icon: Users,
    },
    {
      label: 'Avg Wait',
      value: '12m',
      change: '+2.3%',
      trend: 'down' as const,
      icon: Clock,
    },
  ];

  const topSellers = [
    { name: 'Margherita Pizza', orders: 47, revenue: '$658' },
    { name: 'Spaghetti Carbonara', orders: 38, revenue: '$532' },
    { name: 'Caesar Salad', orders: 34, revenue: '$408' },
    { name: 'Tiramisu', orders: 29, revenue: '$232' },
    { name: 'Lasagna', orders: 26, revenue: '$468' },
  ];

  const recentOrders = [
    { id: '#1245', table: 'Table 4', time: '2m ago', items: 3, total: '$52.38', status: 'preparing' },
    { id: '#1244', table: 'Table 7', time: '8m ago', items: 2, total: '$34.50', status: 'ready' },
    { id: '#1243', table: 'Table 2', time: '12m ago', items: 5, total: '$87.20', status: 'delivered' },
    { id: '#1242', table: 'Table 9', time: '15m ago', items: 1, total: '$18.00', status: 'delivered' },
    { id: '#1241', table: 'Table 5', time: '22m ago', items: 4, total: '$65.80', status: 'completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'ready':
        return 'bg-[#DCFCE7] text-[#166534]';
      case 'delivered':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
      case 'completed':
        return 'bg-[#F3F4F6] text-[#374151]';
      default:
        return 'bg-[#F3F4F6] text-[#374151]';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-sm">{metric.label}</span>
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-[28px] font-semibold text-foreground">{metric.value}</div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}
                >
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Sellers */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-semibold text-foreground mb-6">Top Sellers</h2>
        <div className="space-y-4">
          {topSellers.map((item, index) => (
            <div key={item.name} className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-primary">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.orders} orders</div>
              </div>
              <div className="font-semibold text-foreground">{item.revenue}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Table
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Time
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
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted cursor-pointer transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.table}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.time}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}