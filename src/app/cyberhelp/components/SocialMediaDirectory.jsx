"use client";
import React from 'react'
import { Users, Mail, Globe } from 'lucide-react'
import socialData from '../data/socialMediaGrievance.json'

export default function SocialMediaDirectory() {
    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={22} color="#4682B4" /> Social Media Grievance Officers
            </h2>
            <p className="section-subtitle">
                Under IT Rules 2021, platforms must appoint a resident grievance officer in India.
                Acknowledgement within 24 hours, resolution within 15 days.
            </p>

            <div className="grid-3">
                {socialData.map((platform, i) => (
                    <div key={i} className="card" style={styles.platformCard}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                            {platform.platform}
                        </h3>
                        <div style={styles.officer}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Grievance Officer
                            </span>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{platform.grievance_officer}</span>
                        </div>
                        <div style={styles.actions}>
                            <a href={`mailto:${platform.email}`} className="btn btn-outline" style={{ fontSize: '0.75rem', flex: 1, justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                <Mail size={13} /> Email Officer
                            </a>
                            <a href={platform.report_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.75rem', flex: 1, justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                <Globe size={13} /> Report
                            </a>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', wordBreak: 'break-all' }}>
                            {platform.email}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const styles = {
    platformCard: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    officer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: '0.65rem 0.75rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        marginBottom: '0.25rem',
    },
    actions: {
        display: 'flex',
        gap: '0.5rem',
    },
}
