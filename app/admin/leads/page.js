"use client";

import React, { useState, useEffect } from "react";
import { FiUsers, FiMail, FiPhone, FiBriefcase, FiAlignLeft, FiCalendar, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function AdminLeadsPanel() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    document.title = "Form Submissions | Admin | Innvikta";
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/forms");
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      } else {
        setError(data.error || "Failed to load leads");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <FiUsers className="text-primary" /> Form Submissions
          </h1>
          <p className="text-slate-500 mt-2">View and manage leads captured from the website forms.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            href="/admin" 
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm transition-all"
          >
            <FiArrowLeft /> Back to Blog Admin
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Col: Table */}
        <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400">Loading submissions...</div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No form submissions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150">
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name / Contact</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedLead?.id === lead.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider rounded-full">
                          {lead.form_type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{lead.name || "N/A"}</div>
                        <div className="text-xs text-slate-500">{lead.email || "No email"}</div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                          onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Col: Details Panel */}
        {selectedLead && (
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sticky top-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{selectedLead.name || "Submission Details"}</h3>
                  <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {selectedLead.form_type}
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {selectedLead.email && (
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 text-slate-400"><FiMail /></div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</div>
                      <a href={`mailto:${selectedLead.email}`} className="text-primary font-medium hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>
                )}

                {selectedLead.phone && (
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 text-slate-400"><FiPhone /></div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</div>
                      <a href={`tel:${selectedLead.phone}`} className="text-slate-700 font-medium hover:underline">
                        {selectedLead.phone}
                      </a>
                    </div>
                  </div>
                )}

                {(selectedLead.company || selectedLead.designation) && (
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 text-slate-400"><FiBriefcase /></div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Professional Info</div>
                      <div className="text-slate-700 font-medium">
                        {selectedLead.designation && <span>{selectedLead.designation}</span>}
                        {selectedLead.designation && selectedLead.company && <span> at </span>}
                        {selectedLead.company && <span className="font-bold">{selectedLead.company}</span>}
                      </div>
                      {selectedLead.team_size && (
                        <div className="text-xs text-slate-500 mt-1">Team Size: {selectedLead.team_size}</div>
                      )}
                    </div>
                  </div>
                )}

                {selectedLead.message && (
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 text-slate-400"><FiAlignLeft /></div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Message / Notes</div>
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl whitespace-pre-wrap">
                        {selectedLead.message}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-slate-400"><FiCalendar /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Submitted At</div>
                    <div className="text-sm text-slate-700 font-medium">
                      {formatDate(selectedLead.created_at)}
                    </div>
                  </div>
                </div>

                {selectedLead.payload_json && (
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Raw Payload Data</div>
                    <pre className="text-[10px] bg-slate-800 text-slate-200 p-3 rounded-xl overflow-x-auto">
                      {JSON.stringify(JSON.parse(selectedLead.payload_json), null, 2)}
                    </pre>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
