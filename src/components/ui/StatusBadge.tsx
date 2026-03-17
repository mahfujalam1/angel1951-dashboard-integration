import React from 'react';

type StatusVariant =
  | 'In Transit' | 'Custom Processing' | 'Out of Delivery' | 'Delivered' | 'At Hub' | 'Picked'
  | 'Active' | 'Inactive' | 'Busy'
  | 'Pending' | 'Failed' | 'Replied';

const variantMap: Record<StatusVariant, { bg: string; text: string; dot: string }> = {
  'In Transit':         { bg: 'bg-blue-50',    text: 'text-blue-600',    dot: 'bg-blue-500' },
  'Custom Processing':  { bg: 'bg-purple-50',  text: 'text-purple-600',  dot: 'bg-purple-500' },
  'Out of Delivery':    { bg: 'bg-orange-50',  text: 'text-orange-500',  dot: 'bg-orange-400' },
  'Delivered':          { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  'At Hub':             { bg: 'bg-cyan-50',    text: 'text-cyan-600',    dot: 'bg-cyan-500' },
  'Picked':             { bg: 'bg-indigo-50',  text: 'text-indigo-600',  dot: 'bg-indigo-500' },
  'Active':             { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  'Inactive':           { bg: 'bg-slate-100',  text: 'text-slate-500',   dot: 'bg-slate-400' },
  'Busy':               { bg: 'bg-amber-50',   text: 'text-amber-600',   dot: 'bg-amber-500' },
  'Pending':            { bg: 'bg-amber-50',   text: 'text-amber-600',   dot: 'bg-amber-400' },
  'Failed':             { bg: 'bg-red-50',     text: 'text-red-500',     dot: 'bg-red-500' },
  'Replied':            { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
};

interface Props {
  status: StatusVariant;
  showDot?: boolean;
  className?: string;
}

const StatusBadge: React.FC<Props> = ({ status, showDot = true, className = '' }) => {
  const s = variantMap[status] ?? { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text} ${className}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />}
      {status}
    </span>
  );
};

export default StatusBadge;
