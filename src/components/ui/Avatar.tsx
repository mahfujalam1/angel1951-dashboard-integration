import React from 'react';

interface Props {
  src?: string;
  name?: string;
  size?: number;
  className?: string;
}

const colors = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#ec4899','#06b6d4'];

const Avatar: React.FC<Props> = ({ src, name = 'U', size = 36, className = '' }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const color = colors[name.charCodeAt(0) % colors.length];

  if (src) {
    return (
      <img src={src} alt={name} onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }}
        className={`rounded-full object-cover flex-shrink-0 ${className}`}
        style={{ width: size, height: size }} />
    );
  }
  return (
    <div className={`rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: color, fontSize: size < 32 ? 10 : 12 }}>
      {initials}
    </div>
  );
};

export default Avatar;
