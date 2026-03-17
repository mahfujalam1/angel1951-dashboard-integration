import React from 'react';
import { Input, Button } from 'antd';
import { Search, Plus } from 'lucide-react';

interface Props {
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (val: string) => void;
  actionLabel?: string;
  onAction?: () => void;
  extra?: React.ReactNode;
  subtitle?: string;
}

const PageHeader: React.FC<Props> = ({ title, subtitle, searchPlaceholder, onSearch, actionLabel, onAction, extra }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
    {(title || subtitle) && (
      <div className="flex-1">
        {title && <h1 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h1>}
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    )}
    <div className="flex items-center gap-2.5 flex-wrap">
      {searchPlaceholder && (
        <Input
          prefix={<Search size={13} className="text-slate-400" />}
          placeholder={searchPlaceholder}
          onChange={e => onSearch?.(e.target.value)}
          className="search-input"
          style={{ width: 220, borderRadius: 10, fontSize: 13 }}
          allowClear
        />
      )}
      {extra}
      {actionLabel && (
        <Button type="primary" icon={<Plus size={14} />} onClick={onAction}
          style={{ borderRadius: 10, background: '#2563eb', display: 'flex', alignItems: 'center', gap: 4 }}
          className="font-medium text-sm h-9">
          {actionLabel}
        </Button>
      )}
    </div>
  </div>
);

export default PageHeader;
