import React from 'react';

interface Props {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPad?: boolean;
  bodyClass?: string;
}

const Card: React.FC<Props> = ({ title, extra, children, className = '', noPad = false, bodyClass = '' }) => (
  <div className={`bg-white rounded shadow-sm border border-slate-100 ${className}`}>
    {(title || extra) && (
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
        {title && <h2 className="text-sm font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h2>}
        {extra}
      </div>
    )}
    <div className={noPad ? '' : `p-6 ${bodyClass}`}>{children}</div>
  </div>
);

export default Card;
