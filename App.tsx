
import React, { useState } from 'react';
import { Lead } from './types';
import { generateLeads } from './services/geminiService';
import LeadCard from './components/LeadCard';
import LeadDetails from './components/LeadDetails';
import { 
  Search, 
  Target, 
  MapPin, 
  Zap, 
  Loader2, 
  BarChart3,
  Briefcase,
  Sparkles,
  Globe,
  Activity
} from 'lucide-react';

const App: React.FC = () => {
  const [category, setCategory] = useState('Dental Clinics');
  const [location, setLocation] = useState('New York, NY');
  const [targetGaps, setTargetGaps] = useState('SEO, Website Performance, Social Media Presence');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!category.trim() || !location.trim()) {
      setError("Please fill in both industry and location.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await generateLeads(category, location, targetGaps);
      setLeads(data);
      if (data.length > 0) setSelectedLead(data[0]);
    } catch (err) {
      console.error(err);
      setError('Market analysis failed. Please verify your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Enhanced Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-8 py-4 shadow-sm">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
              <Target className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 leading-none tracking-tight">LeadGen <span className="text-indigo-600">AI</span></h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em]">Engine v3.0 Online</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 pb-1">Lead Prospector</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Campaign Designer</a>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Performance</a>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-5">
               <button className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all font-bold text-sm shadow-sm">
                 <Globe className="w-4 h-4 text-slate-500" /> API Console
               </button>
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-11 h-11 rounded-2xl ring-4 ring-white shadow-md border border-slate-100" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1800px] w-full mx-auto p-6 gap-8 h-[calc(100vh-84px)] overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-[460px] flex flex-col gap-6 h-full overflow-hidden">
          
          {/* Advanced Search Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Sparkles className="w-32 h-32 text-indigo-600" />
            </div>
            
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2.5">
              <Zap className="w-6 h-6 text-amber-500 fill-amber-500" /> Prospecting Engine
            </h2>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 px-1">Market Segment</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Dental Clinics"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold text-slate-800 outline-none placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 px-1">Region</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Austin, TX"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold text-slate-800 outline-none placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 px-1">Custom Gap Analysis Focus</label>
                <div className="relative">
                  <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    value={targetGaps}
                    onChange={(e) => setTargetGaps(e.target.value)}
                    placeholder="e.g. SEO, Tech Stack, Ads"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold text-slate-800 outline-none placeholder:text-slate-300"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-600 active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg shadow-indigo-500/10"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                {loading ? 'Crunching Data...' : 'Find New Leads'}
              </button>
            </form>
          </div>

          {/* Opportunities List */}
          <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="px-7 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Ranked Pipeline</span>
              </div>
              {leads.length > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-sm tracking-widest">
                  {leads.length} MATCHES
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {error && (
                <div className="p-6 bg-rose-50 text-rose-700 rounded-2xl text-sm border border-rose-100 font-bold flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 text-lg font-black leading-none">!</div>
                  {error}
                </div>
              )}
              
              {!loading && leads.length === 0 && !error && (
                <div className="flex flex-col items-center justify-center h-full text-center p-10 space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-inner">
                    <Search className="w-10 h-10 text-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-slate-900 font-black text-lg">Empty Pipeline</h3>
                    <p className="text-sm font-semibold text-slate-500 leading-relaxed px-4">Execute a search to populate your dashboard with 10 ranked, high-probability leads.</p>
                  </div>
                </div>
              )}

              {loading && Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 border border-slate-100 p-6 rounded-3xl">
                  <div className="flex justify-between mb-5">
                    <div className="h-6 bg-slate-200 rounded-lg w-2/3"></div>
                    <div className="h-6 bg-slate-200 rounded-full w-1/4"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}

              {!loading && leads.map((lead, index) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  isSelected={selectedLead?.id === lead.id}
                  onClick={setSelectedLead}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <section className="flex-1 h-full overflow-hidden">
          {selectedLead ? (
            <LeadDetails lead={selectedLead} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 text-center p-16 shadow-inner bg-slate-50/20">
              <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <Target className="w-12 h-12 text-slate-100" />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter">Strategic Lead Viewer</h3>
              <p className="max-w-lg text-base font-bold text-slate-500 leading-relaxed px-8">
                Identify top-tier candidates in the sidebar to generate custom gap analysis, conversion probability reports, and AI-optimized outreach.
              </p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default App;
