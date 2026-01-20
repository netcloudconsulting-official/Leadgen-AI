
import React from 'react';
import { Lead } from '../types';
import { Mail, MapPin, ChevronRight, Briefcase, Phone, Trophy } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
  isSelected: boolean;
  rank?: number;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick, isSelected, rank }) => {
  const getProbabilityStyles = (prob: number) => {
    if (prob > 80) return 'text-emerald-700 bg-emerald-100 border-emerald-200';
    if (prob > 50) return 'text-amber-700 bg-amber-100 border-amber-200';
    return 'text-rose-700 bg-rose-100 border-rose-200';
  };

  return (
    <div 
      onClick={() => onClick(lead)}
      className={`group p-6 rounded-[2rem] border-2 transition-all cursor-pointer relative overflow-hidden ${
        isSelected 
          ? 'border-indigo-600 bg-indigo-50/30 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-600/10 scale-[1.02]' 
          : 'border-transparent bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-lg'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-125"></div>
      )}

      {rank !== undefined && (
        <div className={`absolute top-0 left-0 px-3 py-1 rounded-br-xl text-[10px] font-black uppercase tracking-tighter z-10 ${
          rank === 1 ? 'bg-amber-400 text-amber-900' : 'bg-slate-200 text-slate-500'
        }`}>
          {rank === 1 && <Trophy className="w-3 h-3 inline mr-1 -mt-0.5" />}
          Rank #{rank}
        </div>
      )}
      
      <div className="flex justify-between items-start mb-5 relative pt-4">
        <div className="flex-1 pr-2">
          <h3 className={`font-black text-lg leading-tight mb-2 transition-colors ${isSelected ? 'text-indigo-800' : 'text-slate-900'}`}>
            {lead.companyName}
          </h3>
          <div className="flex items-center gap-2">
            <Briefcase className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest truncate">
              {lead.decisionMaker}
            </p>
          </div>
        </div>
        <div className={`flex flex-col items-end gap-1 flex-shrink-0`}>
          <div className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-colors shadow-sm ${getProbabilityStyles(lead.conversionProbability)}`}>
            {lead.conversionProbability}%
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Confidence</span>
        </div>
      </div>
      
      <div className="space-y-2.5 mb-5 relative">
        <div className="flex items-center text-slate-700 text-[12px] font-bold">
          <Mail className={`w-4 h-4 mr-2.5 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center text-slate-700 text-[12px] font-bold">
          <Phone className={`w-4 h-4 mr-2.5 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
          <span className="truncate">{lead.phoneNumber}</span>
        </div>
        <div className="flex items-center text-slate-600 text-[11px] font-bold">
          <MapPin className={`w-4 h-4 mr-2.5 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
          <span className="truncate opacity-75">{lead.location}</span>
        </div>
      </div>

      <div className={`flex items-center justify-between pt-5 border-t transition-colors relative ${isSelected ? 'border-indigo-200/50' : 'border-slate-200'}`}>
        <div className="flex gap-2 items-center">
          <div className="flex -space-x-2">
            {lead.gapAnalysis.slice(0, 3).map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full border-2 border-white ${isSelected ? 'bg-indigo-400' : 'bg-slate-300'}`}></div>
            ))}
          </div>
          <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
            {lead.gapAnalysis.length} Critical Gaps
          </span>
        </div>
        <ChevronRight className={`w-5 h-5 transition-all ${isSelected ? 'translate-x-1.5 text-indigo-600' : 'text-slate-300 group-hover:text-slate-500'}`} />
      </div>
    </div>
  );
};

export default LeadCard;
