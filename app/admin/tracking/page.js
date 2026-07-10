"use client";

import React, { useState, useEffect } from "react";
import { FiUsers, FiMousePointer, FiActivity, FiGlobe } from "react-icons/fi";

export default function TrackingAdminPanel() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/tracking");
      const result = await res.json();
      if (result.success) {
        setData(result);
      } else {
        setError(result.error || "Failed to load analytics");
      }
    } catch (err) {
      setError("An error occurred while fetching analytics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f15a24]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <h2 className="text-xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">User Tracking Analytics</h1>
            <p className="text-slate-500 mt-2">Insights on user flows and Call-to-Action clicks.</p>
          </div>
          <button 
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50 transition"
          >
            Refresh Data
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex justify-center items-center text-blue-500 text-xl">
              <FiGlobe />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Page Views</p>
              <h3 className="text-2xl font-bold text-slate-900">{(data?.stats?.total_events || 0) - (data?.stats?.total_clicks || 0)}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-50 flex justify-center items-center text-[#f15a24] text-xl">
              <FiMousePointer />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total CTA Clicks</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.stats?.total_clicks}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex justify-center items-center text-emerald-500 text-xl">
              <FiUsers />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Unique Sessions</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.stats?.total_sessions}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Clicks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiActivity className="text-[#f15a24]" /> Top Clicked Elements
            </h3>
            {data?.top_clicks?.length === 0 ? (
              <p className="text-slate-500 text-sm">No click data available yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {data?.top_clicks?.map((item, i) => (
                  <li key={i} className="py-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 truncate pr-4">{item.target_element || "Unknown Button"}</span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                      {item.clicks} clicks
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Events */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="text-xs uppercase bg-slate-50 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-tl-lg">Event</th>
                    <th className="px-4 py-3 font-semibold">Target / Path</th>
                    <th className="px-4 py-3 font-semibold rounded-tr-lg">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data?.recent_events?.map((ev, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                          ev.event_type === 'click' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {ev.event_type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-[200px] truncate" title={ev.event_type === 'click' ? ev.target_element : ev.page_url}>
                          {ev.event_type === 'click' ? ev.target_element : (ev.page_url ? ev.page_url.split('/').pop() : '/')}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-400">
                        {new Date(ev.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {data?.recent_events?.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-4 py-8 text-center text-slate-400">No recent activity</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
