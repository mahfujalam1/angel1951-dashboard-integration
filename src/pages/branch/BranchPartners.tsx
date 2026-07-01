import React from 'react';
import Card from '../../components/ui/Card';
import { Building2 } from 'lucide-react';

const BranchPartners: React.FC = () => {
  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-600">
          <Building2 size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Branch Partners</h1>
          <p className="text-slate-400 text-sm">Business partners for this branch</p>
        </div>
      </div>

      <Card title="Partner List">
        <div className="py-20 text-center text-slate-400 text-sm">
          Partner information will appear here.
        </div>
      </Card>
    </div>
  );
};

export default BranchPartners;
