"use client";
import React, { useState } from 'react'
import { ClipboardList, MapPin, Landmark, Globe as GlobeIcon, Phone, Mail, MapPinned, Clock, MessageCircle, ExternalLink } from 'lucide-react'
import contactData from '../data/contactDatabase.json'

export default function ContactDirectory() {
    const [activeTab, setActiveTab] = useState('pune')

    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ClipboardList size={22} color="#4682B4" /> Contact Directory
            </h2>
            <p className="section-subtitle">
                Regional and national cyber infrastructure contacts. Verified official sources.
            </p>

            {/* Tabs */}
            <div style={styles.tabs}>
                <button onClick={() => setActiveTab('pune')} style={{ ...styles.tab, ...(activeTab === 'pune' ? styles.tabActive : {}) }}>
                    <MapPin size={14} /> Pune Region
                </button>
                <button onClick={() => setActiveTab('state')} style={{ ...styles.tab, ...(activeTab === 'state' ? styles.tabActive : {}) }}>
                    <Landmark size={14} /> Maharashtra State
                </button>
                <button onClick={() => setActiveTab('national')} style={{ ...styles.tab, ...(activeTab === 'national' ? styles.tabActive : {}) }}>
                    <GlobeIcon size={14} /> National Portals
                </button>
            </div>

            {/* Pune Region */}
            {activeTab === 'pune' && (
                <div className="grid-2 animate-fade-in">
                    {contactData.pune_region.map((cell, i) => (
                        <div key={i} className="card" style={styles.contactCard}>
                            <div style={styles.cardTop}>
                                <h3 style={styles.cellName}>{cell.cell_name}</h3>
                                <span className="chip chip-teal">{cell.jurisdiction}</span>
                            </div>
                            <div style={styles.details}>
                                <div style={styles.detail}>
                                    <Phone size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Phone</span>
                                    <a href={`tel:${cell.contact_no}`} style={styles.detailValue}>{cell.contact_no}</a>
                                </div>
                                <div style={styles.detail}>
                                    <Mail size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Email</span>
                                    <a href={`mailto:${cell.email}`} style={styles.detailValue}>{cell.email}</a>
                                </div>
                                <div style={styles.detail}>
                                    <MapPinned size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Address</span>
                                    <span style={{ ...styles.detailValue, color: 'var(--color-text-secondary)' }}>{cell.address}</span>
                                </div>
                                {cell.whatsapp && (
                                    <div style={styles.detail}>
                                        <MessageCircle size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                        <span style={styles.detailLabel}>WhatsApp</span>
                                        <span style={styles.detailValue}>
                                            {cell.whatsapp.map((w, j) => (
                                                <a key={j} href={`https://wa.me/91${w}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: '0.75rem' }}>
                                                    {w}
                                                </a>
                                            ))}
                                        </span>
                                    </div>
                                )}
                                <div style={styles.detail}>
                                    <Clock size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Hours</span>
                                    <span style={{ ...styles.detailValue, color: 'var(--color-text-secondary)' }}>{cell.office_hours}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Maharashtra State */}
            {activeTab === 'state' && (
                <div className="animate-fade-in">
                    <div className="grid-3">
                        <div className="card" style={styles.contactCard}>
                            <span className="chip chip-purple" style={{ marginBottom: '0.75rem' }}>State Nodal Officer</span>
                            <h3 style={styles.cellName}>{contactData.maharashtra_state.nodal_officer.name}</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                                {contactData.maharashtra_state.nodal_officer.designation}
                            </p>
                            <a href={`mailto:${contactData.maharashtra_state.nodal_officer.email}`} className="btn btn-primary" style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={13} /> {contactData.maharashtra_state.nodal_officer.email}
                            </a>
                        </div>
                        <div className="card" style={styles.contactCard}>
                            <span className="chip chip-blue" style={{ marginBottom: '0.75rem' }}>Grievance Officer</span>
                            <div style={styles.details}>
                                <div style={styles.detail}>
                                    <Phone size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Phone</span>
                                    <a href={`tel:${contactData.maharashtra_state.grievance_officer.phone}`} style={styles.detailValue}>
                                        {contactData.maharashtra_state.grievance_officer.phone}
                                    </a>
                                </div>
                                <div style={styles.detail}>
                                    <Mail size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Email</span>
                                    <a href={`mailto:${contactData.maharashtra_state.grievance_officer.email}`} style={styles.detailValue}>
                                        {contactData.maharashtra_state.grievance_officer.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={styles.contactCard}>
                            <span className="chip chip-amber" style={{ marginBottom: '0.75rem' }}>Mumbai Cyber PS</span>
                            <div style={styles.details}>
                                <div style={styles.detail}>
                                    <Phone size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Phone</span>
                                    <a href={`tel:${contactData.maharashtra_state.mumbai_cyber_ps.phone}`} style={styles.detailValue}>
                                        {contactData.maharashtra_state.mumbai_cyber_ps.phone}
                                    </a>
                                </div>
                                <div style={styles.detail}>
                                    <Mail size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Email</span>
                                    <a href={`mailto:${contactData.maharashtra_state.mumbai_cyber_ps.email}`} style={styles.detailValue}>
                                        {contactData.maharashtra_state.mumbai_cyber_ps.email}
                                    </a>
                                </div>
                                <div style={styles.detail}>
                                    <MapPinned size={13} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={styles.detailLabel}>Location</span>
                                    <span style={{ ...styles.detailValue, color: 'var(--color-text-secondary)' }}>
                                        {contactData.maharashtra_state.mumbai_cyber_ps.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* National Portals */}
            {activeTab === 'national' && (
                <div className="grid-2 animate-fade-in">
                    {contactData.national_portals.map((portal, i) => (
                        <div key={i} className="card" style={styles.contactCard}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span className="chip chip-teal">{portal.authority}</span>
                            </div>
                            <h3 style={styles.cellName}>{portal.name}</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                                {portal.description}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {portal.url && (
                                    <a href={portal.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        <GlobeIcon size={13} /> Visit Portal
                                    </a>
                                )}
                                {portal.helpline && (
                                    <a href={`tel:${portal.helpline}`} className="btn btn-outline" style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        <Phone size={13} /> {portal.helpline}
                                    </a>
                                )}
                                {portal.email && (
                                    <a href={`mailto:${portal.email}`} className="btn btn-outline" style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        <Mail size={13} /> Email
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const styles = {
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
    },
    tab: {
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.6rem 1.25rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        fontFamily: 'var(--font-primary)',
        transition: 'all 200ms',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
    },
    tabActive: {
        background: '#F97316',
        borderColor: '#F97316',
        color: 'white',
    },
    contactCard: {
        padding: '1.5rem',
    },
    cardTop: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '0.75rem',
        marginBottom: '1rem',
        flexWrap: 'wrap',
    },
    cellName: {
        fontSize: '1rem',
        fontWeight: 700,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    detail: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
    },
    detailLabel: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        minWidth: '60px',
        flexShrink: 0,
    },
    detailValue: {
        fontSize: '0.85rem',
        fontWeight: 500,
        color: '#F97316',
        wordBreak: 'break-all',
    },
}
