import React from 'react';
import Card from '../../components/ui/Card';
import { Users } from 'lucide-react';

const BranchCustomers: React.FC = () => {
  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <Users size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Branch Customers</h1>
          <p className="text-slate-400 text-sm">Customers associated with this branch</p>
        </div>
      </div>

      <Card title="Customer Directory">
        <div className="py-20 text-center text-slate-400 text-sm">
          Customer list will appear here.
        </div>
      </Card>
    </div>
  );
};

export default BranchCustomers;
