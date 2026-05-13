import React from 'react';

interface Props {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  trend?: number;
  className?: string;
}

const StatCard: React.FC<Props> = ({ label, value, icon, color = '#2563eb', trend, className = '' }) => (
  <div className={`stat-card bg-white rounded-2xl p-5 shadow-sm border border-slate-100 ${className}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest truncate mb-2">{label}</p>
        <p className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
      </div>
      {icon && (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, color }}>
          {icon}
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
