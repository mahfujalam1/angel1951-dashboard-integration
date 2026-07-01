import React from 'react';
import { Table, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props<T extends object> {
  columns: ColumnsType<T>;
  data: T[];
  rowKey?: string;
  total?: number;
  pageSize?: number;
  current?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  emptyText?: string;
  onRow?: (record: T) => { onClick?: () => void; className?: string };
}

function AppTable<T extends object>({
  columns, data, rowKey = 'id', total, pageSize = 10,
  current = 1, onPageChange, loading, emptyText = 'No data found', onRow,
}: Props<T>) {
  const start = (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total ?? data.length);

  return (
    <div className="bg-white rounded shadow-sm border border-slate-100 overflow-hidden">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        loading={loading}
        pagination={false}
        scroll={{ x: 640 }}
        locale={{ emptyText: <div className="py-12 text-slate-400 text-sm text-center">{emptyText}</div> }}
        onRow={onRow as (record: T) => React.HTMLAttributes<HTMLElement>}
        rowClassName={() => 'hover:bg-slate-50 transition-colors'}
      />
      {total !== undefined && total > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3.5 border-t border-slate-100 gap-3">
          <span className="text-xs text-slate-400 font-medium">
            Showing {start}–{end} of {total} results
          </span>
          <Pagination
            size="small"
            total={total}
            pageSize={pageSize}
            current={current}
            onChange={onPageChange}
            showSizeChanger={false}
            itemRender={(page, type, el) => {
              if (type === 'prev') return <button className="px-2 py-1 text-xs text-slate-500 hover:text-blue-600">‹ Prev</button>;
              if (type === 'next') return <button className="px-2 py-1 text-xs text-slate-500 hover:text-blue-600">Next ›</button>;
              return el;
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AppTable;
