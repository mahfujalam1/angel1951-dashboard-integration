import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Trash2, Reply, Eye } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import { reports as initialReports } from '../data/mockData';
import type { Report } from '../types';

const { TextArea } = Input;

const ReportsPage: React.FC = () => {
  const [data, setData] = useState<Report[]>(initialReports);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [replyReport, setReplyReport] = useState<Report | null>(null);
  const [viewReport, setViewReport] = useState<Report | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Report', content: 'Delete this report permanently?', okType: 'danger', okText: 'Delete',
      onOk: () => { setData(prev => prev.filter(r => r.id !== id)); message.success('Report deleted!'); },
    });
  };

  const handleReply = () => {
    if (!replyReport || !replyText.trim()) return;
    setData(prev => prev.map(r => r.id === replyReport.id ? { ...r, status: 'Replied', reply: replyText } : r));
    message.success('Reply sent!');
    setReplyReport(null);
    setReplyText('');
  };

  const columns: ColumnsType<Report> = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (v: string) => <span className="font-semibold text-sm text-slate-800">{v}</span> },
    {
      title: 'Description', dataIndex: 'description', key: 'description',
      render: (v: string) => <span className="text-sm text-slate-500 line-clamp-1">{v}</span>,
    },
    { title: 'Time', dataIndex: 'time', key: 'time', width: 90, render: (v: string) => <span className="text-xs text-slate-400">{v}</span> },
    {
      title: 'Status', dataIndex: 'status', key: 'status', width: 110,
      render: (s: Report['status']) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border
          ${s === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
          <Reply size={11} /> {s}
        </span>
      ),
    },
    {
      title: 'Action', key: 'action', width: 100,
      render: (_: unknown, r: Report) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => setViewReport(r)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
            <Eye size={15} />
          </button>
          {r.status === 'Pending' && (
            <button onClick={() => { setReplyReport(r); setReplyText(''); }}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 transition-colors">
              <Reply size={15} />
            </button>
          )}
          <button onClick={() => handleDelete(r.id)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Reports & Analytics" searchPlaceholder="Search reports..." onSearch={setSearch} />

      <AppTable columns={columns} data={filtered.slice((page - 1) * 10, page * 10)}
        total={filtered.length} pageSize={10} current={page} onPageChange={setPage} />

      {/* Reply Modal */}
      <Modal open={!!replyReport} onCancel={() => setReplyReport(null)} footer={null} title="Reply to Report" width={460}>
        {replyReport && (
          <div className="pt-3 space-y-4">
            <div className="p-4 bg-slate-50 rounded">
              <p className="text-xs text-slate-400 font-medium mb-1">Original Message from {replyReport.name}</p>
              <p className="text-sm text-slate-700">{replyReport.description}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Your Reply</label>
              <TextArea
                rows={4}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                style={{ borderRadius: 10, resize: 'none' }}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setReplyReport(null)}
                className="flex-1 py-2.5 rounded text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleReply}
                className="flex-1 py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Send Reply
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Modal */}
      <Modal open={!!viewReport} onCancel={() => setViewReport(null)} footer={null} title="Report Details" width={460}>
        {viewReport && (
          <div className="pt-3 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">{viewReport.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{viewReport.time}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border
                ${viewReport.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                <Reply size={11} /> {viewReport.status}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <p className="text-xs text-slate-400 font-medium mb-1">Message</p>
              <p className="text-sm text-slate-700 leading-relaxed">{viewReport.description}</p>
            </div>
            {viewReport.reply && (
              <div className="p-4 bg-emerald-50 rounded border border-emerald-100">
                <p className="text-xs text-emerald-600 font-medium mb-1 flex items-center gap-1"><Reply size={11} /> Your Reply</p>
                <p className="text-sm text-slate-700 leading-relaxed">{viewReport.reply}</p>
              </div>
            )}
            {viewReport.status === 'Pending' && (
              <button onClick={() => { setViewReport(null); setReplyReport(viewReport); setReplyText(''); }}
                className="w-full py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Reply to this Report
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReportsPage;
