import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Grid, 
  ChevronRight,
  LayoutGrid
} from 'lucide-react';
import { TOOLS } from './services/toolRegistry';
import { Tool, ToolCategory } from './types';

// Theme Hook
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  return { theme, toggleTheme };
};

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');

  // Filter tools
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const ActiveComponent = useMemo(() => {
    return TOOLS.find(t => t.id === activeToolId)?.component || null;
  }, [activeToolId]);

  const categories = ['All', ...Object.values(ToolCategory)];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveToolId(null)}>
              <div className="bg-primary-600 p-2 rounded-lg text-white">
                <LayoutGrid size={24} />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">
                OmniTools
              </h1>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-700">
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Find a tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            <button
              onClick={() => {
                setActiveToolId(null);
                setActiveCategory('All');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeToolId === null 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Grid size={18} />
              Dashboard
            </button>
            
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categories
            </div>
            
            {Object.values(ToolCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveToolId(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                   activeCategory === cat && !activeToolId
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{cat}</span>
                {activeCategory === cat && !activeToolId && <ChevronRight size={14} />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
           <div className="flex items-center gap-2" onClick={() => setActiveToolId(null)}>
              <div className="bg-primary-600 p-1.5 rounded-md text-white">
                <LayoutGrid size={20} />
              </div>
              <span className="font-bold text-lg">OmniTools</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -mr-2">
              <Menu size={24} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {activeToolId && ActiveComponent ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 flex items-center gap-4">
                  <button 
                    onClick={() => setActiveToolId(null)}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      {(() => {
                        const t = TOOLS.find(x => x.id === activeToolId);
                        const Icon = t?.icon;
                        return Icon ? <Icon className="text-primary-600" /> : null;
                      })()}
                      {TOOLS.find(t => t.id === activeToolId)?.name}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                       {TOOLS.find(t => t.id === activeToolId)?.description}
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 min-h-[500px]">
                  <ActiveComponent />
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {activeCategory === 'All' ? 'All Tools' : activeCategory}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    {filteredTools.length} tools available
                  </p>
                </div>

                {categories.filter(c => c !== 'All' && (activeCategory === 'All' || activeCategory === c)).map(category => {
                  const categoryTools = filteredTools.filter(t => t.category === category);
                  if (categoryTools.length === 0) return null;

                  return (
                    <div key={category} className="mb-10">
                       <h3 className="text-lg font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">{category}</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {categoryTools.map(tool => (
                          <button
                            key={tool.id}
                            onClick={() => setActiveToolId(tool.id)}
                            className="group flex flex-col items-start p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all duration-200 text-left w-full"
                          >
                            <div className="mb-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-200">
                              <tool.icon size={24} />
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                              {tool.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
                
                {filteredTools.length === 0 && (
                  <div className="text-center py-20">
                    <div className="inline-block p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                      <Search className="text-slate-400" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">No tools found</h3>
                    <p className="text-slate-500 dark:text-slate-400">Try adjusting your search terms</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
