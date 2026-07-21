"use client";

import React, { useState, useEffect } from "react";
import { FiUsers, FiMousePointer, FiActivity, FiGlobe, FiTrendingUp, FiLink, FiMapPin } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

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
            <p className="text-slate-500 mt-2">Insights on user flows, conversions, and traffic sources.</p>
          </div>
          <button 
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50 transition"
          >
            Refresh Data
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex justify-center items-center text-blue-500 text-xl">
              <FiGlobe />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Events</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.stats?.total_events || 0}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex justify-center items-center text-emerald-500 text-xl">
              <FiUsers />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Unique Sessions</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.stats?.total_sessions || 0}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-50 flex justify-center items-center text-[#f15a24] text-xl">
              <FiMousePointer />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total CTA Clicks</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.stats?.total_clicks || 0}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-50 flex justify-center items-center text-indigo-500 text-xl">
              <FiTrendingUp />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.stats?.conversion_rate || '0%'}</h3>
            </div>
          </div>
        </div>

        {/* Chart Row */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiActivity className="text-[#f15a24]" /> Active Sessions (Last 7 Days)
          </h3>
          <div className="h-[300px] w-full">
            {data?.time_series && data.time_series.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.time_series} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f15a24" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f15a24" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sessions" stroke="#f15a24" strokeWidth={3} fillOpacity={1} fill="url(#colorSessions)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">Not enough data to display chart</div>
            )}
          </div>
        </div>

        {/* Traffic Sources Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Top Referrers */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiLink className="text-blue-500" /> Top Referrers
            </h3>
            {data?.top_referrers?.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {data.top_referrers.map((item, i) => (
                  <li key={i} className="py-3 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 truncate pr-4 max-w-[200px]" title={item.referrer}>{item.referrer}</span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">
                      {item.sessions}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm">No referrers logged yet.</p>
            )}
          </div>

          {/* Top Campaigns */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiTrendingUp className="text-emerald-500" /> Top Campaigns
            </h3>
            {data?.top_campaigns?.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {data.top_campaigns.map((item, i) => (
                  <li key={i} className="py-3 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 truncate pr-4">{item.utm_campaign}</span>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">
                      {item.sessions}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm">No UTM campaigns tracked yet.</p>
            )}
          </div>

          {/* Top Clicks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiMousePointer className="text-orange-500" /> Top Clicked Elements
            </h3>
            {data?.top_clicks?.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {data.top_clicks.map((item, i) => (
                  <li key={i} className="py-3 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 truncate pr-4">{item.target_element || "Unknown"}</span>
                    <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2 py-1 rounded-md">
                      {item.clicks}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm">No clicks logged yet.</p>
            )}
          </div>
        </div>

        {/* Recent Events Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Event Type</th>
                  <th className="px-4 py-3 font-semibold">Details / Path</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-lg">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.recent_events?.map((ev, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                        ev.event_type === 'click' ? 'bg-orange-100 text-orange-700' : 
                        ev.event_type === 'form_submission' ? 'bg-indigo-100 text-indigo-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {ev.event_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-[200px] truncate font-medium text-slate-700" title={ev.event_type === 'click' ? ev.target_element : ev.page_url}>
                        {ev.event_type === 'click' ? ev.target_element : (ev.page_url ? ev.page_url.split('/').pop() || '/' : '/')}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                      {ev.country ? <span className="flex items-center gap-1"><FiMapPin /> {ev.country}</span> : '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                      {ev.utm_source ? <span className="bg-slate-100 px-2 py-1 rounded">{ev.utm_source}</span> : '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-400">
                      {new Date(ev.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {(!data?.recent_events || data.recent_events.length === 0) && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-slate-400">No recent activity found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
