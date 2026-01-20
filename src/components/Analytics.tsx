import { useState } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';

export function Analytics() {
  const [dateRange, setDateRange] = useState('last7days');
  const { theme } = useTheme();

  const revenueData = [
    { date: 'Mon', revenue: 2400 },
    { date: 'Tue', revenue: 2210 },
    { date: 'Wed', revenue: 2890 },
    { date: 'Thu', revenue: 3200 },
    { date: 'Fri', revenue: 4100 },
    { date: 'Sat', revenue: 4800 },
    { date: 'Sun', revenue: 3800 },
  ];

  const ordersByHour = [
    { hour: '10am', orders: 12 },
    { hour: '11am', orders: 28 },
    { hour: '12pm', orders: 45 },
    { hour: '1pm', orders: 52 },
    { hour: '2pm', orders: 38 },
    { hour: '3pm', orders: 24 },
    { hour: '4pm', orders: 18 },
    { hour: '5pm', orders: 22 },
    { hour: '6pm', orders: 42 },
    { hour: '7pm', orders: 58 },
    { hour: '8pm', orders: 48 },
    { hour: '9pm', orders: 32 },
  ];

  const categoryData = [
    { name: 'Pizzas', value: 458, color: '#FF6B35' },
    { name: 'Pasta', value: 324, color: '#22C55E' },
    { name: 'Salads', value: 182, color: '#3B82F6' },
    { name: 'Desserts', value: 145, color: '#F59E0B' },
    { name: 'Beverages', value: 236, color: '#8B5CF6' },
  ];

  const topItems = [
    { name: 'Margherita Pizza', orders: 142, revenue: '$1,988', avgPrice: '$14.00', trend: '+12%', sparkline: [12, 15, 18, 14, 22, 25, 20] },
    { name: 'Spaghetti Carbonara', orders: 118, revenue: '$1,652', avgPrice: '$14.00', trend: '+8%', sparkline: [18, 16, 20, 22, 19, 24, 18] },
    { name: 'Caesar Salad', orders: 96, revenue: '$1,152', avgPrice: '$12.00', trend: '+5%', sparkline: [10, 12, 14, 13, 16, 18, 15] },
    { name: 'Lasagna', orders: 87, revenue: '$1,566', avgPrice: '$18.00', trend: '-3%', sparkline: [20, 18, 17, 15, 14, 13, 12] },
    { name: 'Tiramisu', orders: 84, revenue: '$672', avgPrice: '$8.00', trend: '+15%', sparkline: [8, 9, 10, 12, 14, 16, 14] },
  ];

  const datePresets = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 days', value: 'last7days' },
    { label: 'Last 30 days', value: 'last30days' },
    { label: 'This month', value: 'thismonth' },
    { label: 'Last month', value: 'lastmonth' },
  ];

  const renderSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="60" height="20" className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke="#FF6B35"
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  // Chart colors based on theme
  const chartColors = {
    grid: theme === 'dark' ? '#374151' : '#E5E7EB',
    text: theme === 'dark' ? '#9CA3AF' : '#6B7280',
    tooltipBg: theme === 'dark' ? '#1F2937' : '#FFFFFF',
    tooltipBorder: theme === 'dark' ? '#374151' : '#E5E7EB',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-foreground mb-1">Analytics</h1>
          <p className="text-muted-foreground">Track your restaurant&apos;s performance and insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <Download className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Export CSV</span>
        </button>
      </div>

      {/* Date Range Picker */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground">Dec 1 - Dec 8, 2025</span>
        </div>
        {datePresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setDateRange(preset.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              dateRange === preset.value
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-6">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="date" stroke={chartColors.text} fontSize={12} />
            <YAxis stroke={chartColors.text} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.tooltipBg,
                border: `1px solid ${chartColors.tooltipBorder}`,
                borderRadius: '8px',
                fontSize: '12px',
                color: theme === 'dark' ? '#F9FAFB' : '#1E2A3B',
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={2} dot={{ fill: '#FF6B35' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Orders by Hour */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold text-foreground mb-6">Orders by Hour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="hour" stroke={chartColors.text} fontSize={12} />
              <YAxis stroke={chartColors.text} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  border: `1px solid ${chartColors.tooltipBorder}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme === 'dark' ? '#F9FAFB' : '#1E2A3B',
                }}
              />
              <Bar dataKey="orders" fill="#FF6B35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold text-foreground mb-6">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  border: `1px solid ${chartColors.tooltipBorder}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme === 'dark' ? '#F9FAFB' : '#1E2A3B',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Items Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Top Items</h2>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-accent transition-colors">
              Sort by Orders
            </button>
            <button className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-accent transition-colors">
              Sort by Revenue
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Item
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Orders
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Revenue
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Avg Price
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Trend
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  7-Day Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topItems.map((item) => (
                <tr key={item.name} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{item.revenue}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.avgPrice}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        item.trend.startsWith('+') ? 'text-[#22C55E]' : 'text-[#EF4444]'
                      }`}
                    >
                      {item.trend.startsWith('+') ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {item.trend}
                    </span>
                  </td>
                  <td className="px-6 py-4">{renderSparkline(item.sparkline)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
