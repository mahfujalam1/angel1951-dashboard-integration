import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', shipments: 400, revenue: 2400 },
  { name: 'Feb', shipments: 300, revenue: 1398 },
  { name: 'Mar', shipments: 200, revenue: 9800 },
  { name: 'Apr', shipments: 278, revenue: 3908 },
  { name: 'May', shipments: 189, revenue: 4800 },
  { name: 'Jun', shipments: 239, revenue: 3800 },
];

const pieData = [
  { name: 'Regular', value: 400 },
  { name: 'Corporate', value: 300 },
  { name: 'Business', value: 300 },
  { name: 'Personalized Cargo', value: 200 },
];

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c'];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
            Branch Analytics
          </h1>
          <p className="text-slate-500 text-sm">Performance overview and activity reports</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Shipments', value: '1,284', icon: Package, color: 'blue' },
          { label: 'Total Revenue', value: '$458,200', icon: DollarSign, color: 'emerald' },
          { label: 'Active Customers', value: '842', icon: Users, color: 'purple' },
          { label: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded bg-${stat.color}-50 flex items-center justify-center mb-4`}>
              <stat.icon className={`text-${stat.color}-600`} size={20} />
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipment Volume Chart */}
        <div className="bg-white p-6 rounded border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Shipment Volume
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="shipments" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Distribution */}
        <div className="bg-white p-6 rounded border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Customer Segments
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs text-slate-500 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
