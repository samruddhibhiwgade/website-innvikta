"use client";
import React, { useState, useEffect } from 'react'
import { 
    Users, Calendar, Filter, MousePointer2, Clock, 
    ArrowRight, ChevronRight, Search, Activity, 
    AlertTriangle, Shield, CheckCircle2, Download, ExternalLink, RefreshCw
} from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_PHP_BACKEND_URL ? `${process.env.NEXT_PUBLIC_PHP_BACKEND_URL}/api` : "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server/api";

export default function AdminPortal() {
    const [complaints, setComplaints] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedEntry, setSelectedEntry] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterPriority, setFilterPriority] = useState('ALL')

    const fetchComplaints = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/get_complaints.php`)
            const data = await res.json()
            if (data.success) {
                setComplaints(data.data)
            } else {
                setError(data.error)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComplaints()
    }, [])

    const filtered = complaints.filter(c => {
        const matchSearch = (c.user_name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (c.fraud_type || '').toLowerCase().includes(searchTerm.toLowerCase())
        const matchPriority = filterPriority === 'ALL' || c.priority === filterPriority
        return matchSearch && matchPriority
    })

    const getPriorityColor = (p) => {
        switch(p) {
            case 'CRITICAL': return '#DC2626'
            case 'HIGH': return '#D97706'
            case 'MODERATE': return '#4682B4'
            default: return '#64748B'
        }
    }

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '1rem' }}>
            <RefreshCw className="animate-spin" size={32} color="#F97316" />
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading complaint registry...</p>
        </div>
    )

    if (error) return <div className="alert alert-error">Error loading data: {error}</div>

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* ── Header Stats ─────────────────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card" style={{ padding: '1.25rem', border: '1px solid var(--color-border)', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: '#F9731615', padding: '8px', borderRadius: '8px' }}><Activity size={20} color="#F97316" /></div>
                        <div>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', margin: 0 }}>Total Triage Reports</p>
                            <h3 style={{ fontSize: '1.25rem', margin: '2px 0 0' }}>{complaints.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: '1.25rem', border: '1px solid var(--color-border)', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: '#DC262615', padding: '8px', borderRadius: '8px' }}><AlertTriangle size={20} color="#DC2626" /></div>
                        <div>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', margin: 0 }}>Critical Incidents</p>
                            <h3 style={{ fontSize: '1.25rem', margin: '2px 0 0' }}>{complaints.filter(c => c.priority === 'CRITICAL').length}</h3>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: '1.25rem', border: '1px solid var(--color-border)', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: '#4682B415', padding: '8px', borderRadius: '8px' }}><MousePointer2 size={20} color="#4682B4" /></div>
                        <div>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', margin: 0 }}>With Action Tracking</p>
                            <h3 style={{ fontSize: '1.25rem', margin: '2px 0 0' }}>{complaints.filter(c => (c.clicks_json || []).length > 0).length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Filters ──────────────────────────────────────────── */}
            <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                    <input 
                        type="text" 
                        placeholder="Search by name or fraud type..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.6rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}
                    />
                </div>
                <select 
                    value={filterPriority}
                    onChange={e => setFilterPriority(e.target.value)}
                    style={{ padding: '0.6rem', paddingRight: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', cursor: 'pointer' }}
                >
                    <option value="ALL">All Priorities</option>
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MODERATE">Moderate</option>
                </select>
                <button onClick={fetchComplaints} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <RefreshCw size={14} /> Refresh
                </button>
            </div>

            {/* ── Table ────────────────────────────────────────────── */}
            <div className="card" style={{ border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'rgba(70, 130, 180, 0.05)', borderBottom: '1px solid var(--color-border)' }}>
                            <tr>
                                <th style={thStyle}>Date & Time</th>
                                <th style={thStyle}>User Details</th>
                                <th style={thStyle}>Fraud Type</th>
                                <th style={thStyle}>Priority</th>
                                <th style={thStyle}>Bank</th>
                                <th style={thStyle}>Actions</th>
                                <th style={thStyle}>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 150ms' }} className="table-row-hover">
                                    <td style={tdStyle}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{new Date(c.submitted_at).toLocaleDateString()}</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{new Date(c.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{c.user_name || 'N/A'}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>{c.user_contact || 'No contact info'}</div>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{c.fraud_type}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ 
                                            fontSize: '0.7rem', 
                                            fontWeight: 800, 
                                            padding: '2px 8px', 
                                            borderRadius: '20px', 
                                            background: `${getPriorityColor(c.priority)}15`, 
                                            color: getPriorityColor(c.priority),
                                            border: `1px solid ${getPriorityColor(c.priority)}30`
                                        }}>
                                            {c.priority}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ fontSize: '0.82rem' }}>{c.bank_name || 'Generic'}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MousePointer2 size={12} color="#F97316" />
                                            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{(c.clicks_json || []).length}</span>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        <button 
                                            onClick={() => setSelectedEntry(c)}
                                            style={{ padding: '6px', borderRadius: '50%', border: 'none', background: '#F9731615', cursor: 'pointer', color: '#F97316' }}
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Details Modal ─────────────────────────────────────── */}
            {selectedEntry && (
                <div style={modalOverlay} onClick={() => setSelectedEntry(null)}>
                    <div style={modalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Complaint #{selectedEntry.id}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>Submitted on {new Date(selectedEntry.submitted_at).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setSelectedEntry(null)} style={closeBtn}><RefreshCw style={{ transform: 'rotate(45deg)' }} /> Close</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px', gap: '2rem' }}>
                            {/* Left: Metadata */}
                            <div>
                                <div style={infoGrid}>
                                    <div style={infoItem}>
                                        <label style={labelStyle}>Fraud Type</label>
                                        <p style={valStyle}>{selectedEntry.fraud_type}</p>
                                    </div>
                                    <div style={infoItem}>
                                        <label style={labelStyle}>Priority</label>
                                        <p style={{ ...valStyle, color: getPriorityColor(selectedEntry.priority) }}>{selectedEntry.priority}</p>
                                    </div>
                                    <div style={infoItem}>
                                        <label style={labelStyle}>Timeframe</label>
                                        <p style={valStyle}>{selectedEntry.timeframe}</p>
                                    </div>
                                    <div style={infoItem}>
                                        <label style={labelStyle}>Target Bank</label>
                                        <p style={valStyle}>{selectedEntry.bank_name || 'Not Specified'}</p>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <label style={labelStyle}>Incident Description</label>
                                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.88rem', border: '1px solid #e2e8f0', minHeight: '80px' }}>
                                        {selectedEntry.details || 'No description provided.'}
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <label style={labelStyle}>Additional Findings (Questions Answered)</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                                        {(selectedEntry.answers_json || []).length > 0 ? (
                                            selectedEntry.answers_json.map((txt, idx) => (
                                                <span key={idx} style={tagStyle}>{txt}</span>
                                            ))
                                        ) : <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>None checked</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Right: User Journey Visualization */}
                            <div style={{ borderLeft: '1px dashed var(--color-border)', paddingLeft: '1.5rem' }}>
                                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}>
                                    <Activity size={14} color="#F97316" /> User Journey Timeline
                                </label>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                                    {/* Vertical Line */}
                                    <div style={{ position: 'absolute', left: '17px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(249, 115, 22, 0.2)' }} />
                                    
                                    {(selectedEntry.clicks_json || []).length > 0 ? (
                                        selectedEntry.clicks_json.map((click, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                                <div style={{ 
                                                    width: '36px', height: '36px', borderRadius: '50%', 
                                                    background: click.label.includes('Selected') ? '#F97316' : '#fff', 
                                                    border: '2px solid #F97316',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                                }}>
                                                    {click.label.includes('Vault') ? <Shield size={16} color={click.label.includes('Selected') ? '#fff' : '#F97316'} /> :
                                                     click.label.includes('Call') ? <Activity size={16} color={click.label.includes('Selected') ? '#fff' : '#F97316'} /> :
                                                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: click.label.includes('Selected') ? '#fff' : '#F97316' }} />}
                                                </div>
                                                <div style={{ flex: 1, padding: '8px 12px', background: 'var(--color-bg-secondary)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                                                    <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>{click.label}</p>
                                                    <p style={{ fontSize: '0.65rem', margin: '2px 0 0', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                        <Clock size={10} /> {click.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '2rem 0', opacity: 0.5 }}>
                                            <MousePointer2 size={32} style={{ marginBottom: '0.5rem' }} />
                                            <p style={{ fontSize: '0.8rem' }}>No interaction data<br/>available for this entry.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const thStyle = { padding: '1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }
const tdStyle = { padding: '1rem' }
const tagStyle = { fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#475569' }
const labelStyle = { display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.5px' }
const valStyle = { margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }
const infoGrid = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }
const infoItem = { display: 'flex', flexDirection: 'column' }
const modalOverlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem' }
const modalContent = { background: 'var(--color-bg-primary)', width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }
const closeBtn = { padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }
