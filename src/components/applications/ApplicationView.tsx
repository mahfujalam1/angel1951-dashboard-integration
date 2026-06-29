import React from 'react';
import { Button, Tag, Typography, Space, Skeleton } from 'antd';
import { ChevronLeft } from 'lucide-react';
import { getStatusTagColor, normalizeStatus } from '../../utils/applicationHelpers';

const { Title, Text } = Typography;

export function ApplicationPageHeader({
  title,
  subtitle,
  status,
  onBack,
  actions,
}: {
  title: string;
  subtitle?: string;
  status?: string;
  onBack: () => void;
  actions?: React.ReactNode;
}) {
  const displayStatus = normalizeStatus(status);
  const statusColor = getStatusTagColor(status);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Space size="middle" wrap>
        <Button icon={<ChevronLeft size={16} />} onClick={onBack}>
          Back
        </Button>
        <div>
          <Title level={4} style={{ margin: 0, fontFamily: 'Sora, sans-serif' }}>
            {title}
          </Title>
          {subtitle && <Text type="secondary" className="text-sm">{subtitle}</Text>}
        </div>
        {status && (
          <Tag color={statusColor} className="px-3 py-1 font-semibold">
            {displayStatus}
          </Tag>
        )}
      </Space>
      {actions && <Space wrap>{actions}</Space>}
    </div>
  );
}

export function DetailSection({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export function DetailField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value?: React.ReactNode;
  fullWidth?: boolean;
}) {
  const isEmpty = value === undefined || value === null || value === '';

  return (
    <div className={fullWidth ? 'col-span-full' : ''}>
      <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1.5">
        {label}
      </Text>
      {isEmpty ? (
        <Text className="text-sm text-slate-300">—</Text>
      ) : (
        <div className="text-sm font-medium text-slate-800 break-words">{value}</div>
      )}
    </div>
  );
}

export function DetailGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
      {children}
    </div>
  );
}

export function DetailTags({ items }: { items?: string[] | null }) {
  if (!items?.length) return <Text className="text-sm text-slate-300">—</Text>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item} color="blue" className="m-0">
          {item}
        </Tag>
      ))}
    </div>
  );
}

export function DetailLink({ href }: { href?: string | null }) {
  if (!href) return <Text className="text-sm text-slate-300">—</Text>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline break-all">
      {href}
    </a>
  );
}

export function ApplicationLoading() {
  return (
    <div className="p-8">
      <Skeleton active paragraph={{ rows: 12 }} />
    </div>
  );
}

export function ApplicationNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-8 text-center space-y-4">
      <Title level={4}>Application not found</Title>
      <Button onClick={onBack}>Go Back</Button>
    </div>
  );
}
