import React, { useState } from 'react';
import { Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import Avatar from '../components/ui/Avatar';
import { payments } from '../data/mockData';
import type { Payment } from '../types';
import { DollarSign, TrendingUp, Clock, Activity } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [viewPayment, setViewPayment] = useState<Payment | null>(null);

  const filtered = payments.filter(p =>
    p.customer.toLowerCase().includes(search.toLowerCase()) ||
    p.paymentId.toLowerCase().includes(search.toLowerCase())
  );

  const columns: ColumnsType<Payment> = [
    { title: 'ID', key: 'idx', width: 48, render: (_: unknown, __: Payment, i: number) => <span className="text-slate-400 text-sm">{i + 1}.</span> },
    {
      title: 'Customer', key: 'customer',
      render: (_: unknown, r: Payment) => (
        <div className="flex items-center gap-3">
          <Avatar src={r.avatar} name={r.customer} size={36} />
          <span className="font-semibold text-sm text-slate-800">{r.customer}</span>
        </div>
      ),
    },
    { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId', render: (v: string) => <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{v}</span> },
    {
      title: 'Type', dataIndex: 'type', key: 'type',
      render: (v: string) => <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">{v}</span>,
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (v: string) => <span className="font-bold text-slate-800">{v}</span> },
    { title: 'Method', dataIndex: 'method', key: 'method', render: (v: string) => <span className="text-sm text-slate-500">{v}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: Payment['status']) => <StatusBadge status={s} /> },
    { title: 'Date', dataIndex: 'date', key: 'date', render: (v: string) => <span className="text-xs text-slate-400">{v}</span> },
    {
      title: '', key: 'action', width: 60,
      render: (_: unknown, r: Payment) => (
        <button onClick={() => setViewPayment(r)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
          <Eye size={15} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$25,580" icon={<DollarSign size={17} />} color="#2563eb" trend={14} />
        <StatCard label="Paid Amount" value="$18,500" icon={<TrendingUp size={17} />} color="#059669" trend={8} />
        <StatCard label="Pending" value="$6,800" icon={<Clock size={17} />} color="#d97706" trend={-2} />
        <StatCard label="Transactions" value={125} icon={<Activity size={17} />} color="#7c3aed" trend={5} />
      </div>

      <PageHeader title="Payment & Invoice" searchPlaceholder="Search customer, payment ID..." onSearch={setSearch} />

      <AppTable columns={columns} data={filtered.slice((page - 1) * 10, page * 10)}
        total={filtered.length} pageSize={10} current={page} onPageChange={setPage} />

      <Modal open={!!viewPayment} onCancel={() => setViewPayment(null)} footer={null} title="Payment Details" width={420}>
        {viewPayment && (
          <div className="pt-3 space-y-3">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Avatar src={viewPayment.avatar} name={viewPayment.customer} size={48} />
              <div>
                <p className="font-bold text-slate-800">{viewPayment.customer}</p>
                <p className="text-xs text-slate-400 font-mono">{viewPayment.paymentId}</p>
              </div>
              <StatusBadge status={viewPayment.status} className="ml-auto" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Amount', value: viewPayment.amount },
                { label: 'Method', value: viewPayment.method },
                { label: 'Type', value: viewPayment.type },
                { label: 'Date', value: viewPayment.date },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                  <p className="text-sm font-bold text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentsPage;
