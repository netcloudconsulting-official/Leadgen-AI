
import React, { useState } from 'react';
import { Lead } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  Tooltip, 
} from 'recharts';
import { 
  Mail, Phone, Copy, CheckCircle2, AlertTriangle, 
  Send, FileText, User, Building2, Sparkles, Smartphone, ExternalLink, Globe
} from 'lucide-react';

interface LeadDetailsProps {
  lead: Lead;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(lead.outreachEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = lead.gapAnalysis.map(gap => ({
    subject: gap.title,
    score: gap.score,
    fullMark: 100
  }));

  return (
    <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col h-full">
      {/* Header Profile */}
      <div className="p-10 bg-slate-900 text-white relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full -ml-24 -mb-24 blur-[80px]"></div>
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-400 text-[11px] font-black uppercase tracking-[0.2em]">Validated Opportunity</span>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white leading-tight mb-4 tracking-tighter">{lead.companyName}</h2>
              <div className="flex flex-wrap items-center gap-y-5 gap-x-10">
                <div className="flex items-center gap-4 text-slate-100 font-bold text-base">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                    <User className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="leading-tight">{lead.decisionMaker}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">{lead.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-100 font-bold text-base">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                    <Smartphone className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="leading-tight">{lead.phoneNumber}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">Mobile Number</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="flex-1 xl:flex-none px-8 py-4 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700 active:scale-95 shadow-lg">
                View CRM
             </button>
             <button className="flex-1 xl:flex-none px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/40 border border-indigo-500 active:scale-95 flex items-center justify-center gap-3">
                <Send className="w-5 h-5" /> Start Outreach
             </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
        {/* Core Intelligence */}
        <section>
          <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 shadow-sm">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Vulnerability Index</h3>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Structural Market Gaps</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-3">
                <span className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{lead.conversionProbability}%</span>
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Conversion Likelihood</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 h-[400px] bg-slate-50/50 rounded-[3rem] border border-slate-200 shadow-inner flex items-center justify-center p-6 relative group">
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]"></div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#e2e8f0" strokeDasharray="5 5" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800, textAnchor: 'middle' }} 
                  />
                  <Radar
                    name="Gap Intensity"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={4}
                    fill="#6366f1"
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '20px', 
                      border: '1px solid #e2e8f0', 
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                      fontWeight: '800',
                      padding: '12px'
                    }} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {lead.gapAnalysis.map((gap, idx) => (
                <div key={idx} className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-black text-slate-800 text-sm leading-tight group-hover:text-indigo-700 transition-colors uppercase tracking-tight">{gap.title}</span>
                    <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">{gap.score}%</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold mb-4 opacity-80">{gap.description}</p>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${gap.score}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Messaging Sequence */}
        <section className="bg-slate-50 rounded-[3rem] p-10 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-200/50">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">AI Conversion Sequence</h3>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Optimized for High Response</p>
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 border shadow-sm ${
                copied 
                ? 'bg-emerald-600 text-white border-emerald-500 scale-95 shadow-emerald-200/50' 
                : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Content Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy Sequence</span>
                </>
              )}
            </button>
          </div>
          
          {/* Enhanced Email Content Viewer */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative group overflow-hidden mb-6">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Simulated Email Headers */}
            <div className="border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-12">To:</span>
                <span className="text-xs font-bold text-slate-600 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                  {lead.decisionMaker} <span className="text-slate-400 font-medium ml-1">&lt;{lead.email}&gt;</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-12">Subject:</span>
                <span className="text-xs font-extrabold text-slate-800">
                  Strategic Opportunity Analysis: {lead.companyName}
                </span>
              </div>
            </div>

            {/* Formatted Content Body */}
            <div className="whitespace-pre-wrap font-sans text-slate-700 font-medium text-sm leading-[1.8] tracking-tight">
              {lead.outreachEmail}
            </div>
          </div>

          {/* Research Sources - Required for Search Grounding */}
          {lead.sources && lead.sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-slate-400" />
                <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Research Sources</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {lead.sources.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5 px-4">
            <div className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <FileText className="w-4 h-4" />
              Intelligence Keywords:
            </div>
            {lead.gapAnalysis.map((g, i) => (
              <span key={i} className="px-4 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 shadow-sm uppercase tracking-wider">
                {g.title}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeadDetails;
