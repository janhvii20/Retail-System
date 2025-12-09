import { useState } from 'react';

export const Sidebar = () => {
  const [expandedServices, setExpandedServices] = useState(false);
  const [expandedInvoices, setExpandedInvoices] = useState(false);

  return (
    <div className="w-56 bg-gray-100 flex flex-col overflow-y-auto border-r border-gray-200">
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center font-bold text-white text-sm">
          V
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">Vault</div>
          <div className="text-xs text-gray-500">Janhavi Yadav</div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">Menu</div>
        
        <div className="text-sm cursor-pointer px-3 py-2 rounded text-blue-600 font-semibold bg-blue-50">
          📊 Dashboard
        </div>
        
        <div className="text-sm cursor-pointer px-3 py-2 rounded text-gray-700 hover:bg-gray-200 transition">
          📰 Nexus
        </div>
        
        <div className="text-sm cursor-pointer px-3 py-2 rounded text-gray-700 hover:bg-gray-200 transition">
          📥 Intake
        </div>
        
        <div>
          <div 
            className="text-sm cursor-pointer px-3 py-2 rounded text-gray-700 hover:bg-gray-200 transition flex items-center justify-between"
            onClick={() => setExpandedServices(!expandedServices)}
          >
            <span>⚙️ Services</span>
            <span className={`text-xs transition-transform ${expandedServices ? 'rotate-180' : ''}`}>▼</span>
          </div>
          {expandedServices && (
            <div className="ml-4 space-y-1 mt-1">
              <div className="text-xs cursor-pointer px-3 py-2 rounded text-gray-600 hover:bg-gray-200 transition flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Pre-active
              </div>
              <div className="text-xs cursor-pointer px-3 py-2 rounded text-gray-600 hover:bg-gray-200 transition flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Active
              </div>
              <div className="text-xs cursor-pointer px-3 py-2 rounded text-gray-600 hover:bg-gray-200 transition flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Blocked
              </div>
              <div className="text-xs cursor-pointer px-3 py-2 rounded text-gray-600 hover:bg-gray-200 transition flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Closed
              </div>
            </div>
          )}
        </div>
        
        <div>
          <div 
            className="text-sm cursor-pointer px-3 py-2 rounded text-gray-700 hover:bg-gray-200 transition flex items-center justify-between"
            onClick={() => setExpandedInvoices(!expandedInvoices)}
          >
            <span>📄 Invoices</span>
            <span className={`text-xs transition-transform ${expandedInvoices ? 'rotate-180' : ''}`}>▼</span>
          </div>
          {expandedInvoices && (
            <div className="ml-4 space-y-1 mt-1">
              <div className="text-xs cursor-pointer px-3 py-2 rounded text-gray-600 hover:bg-gray-200 transition flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Proforma Invoices
              </div>
              <div className="text-xs cursor-pointer px-3 py-2 rounded text-gray-600 hover:bg-gray-200 transition flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Final Invoices
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
