import React from 'react';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface ChartData { month: string; value: number }

export const UserGrowthChart: React.FC<{ data: ChartData[]; height?: number }> = ({ data, height = 200 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
      <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} cursor={{ fill: '#f1f5f9', radius: 4 }} />
      <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} maxBarSize={24} />
    </BarChart>
  </ResponsiveContainer>
);

export const EarningsChart: React.FC<{ data: ChartData[]; height?: number }> = ({ data, height = 200 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
      <defs>
        <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
      <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} />
      <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#earningsGrad)" dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
    </AreaChart>
  </ResponsiveContainer>
);
