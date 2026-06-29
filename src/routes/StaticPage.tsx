import React from 'react';

const StaticPage: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
    <h2 className="text-lg font-bold text-slate-800 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h2>
    <p className="text-slate-500 text-sm leading-relaxed">{content}</p>
  </div>
);

export default StaticPage;
