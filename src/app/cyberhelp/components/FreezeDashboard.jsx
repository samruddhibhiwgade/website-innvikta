"use client";
import React from 'react'
import { Building2, CreditCard, Smartphone, ShieldOff, Lock, Link, Camera, MessageCircle, ExternalLink, Snowflake, ChevronRight } from 'lucide-react'

const freezeLinks = {
    banking: [
        { name: 'SBI Card Block', url: 'https://www.onlinesbi.sbi/', icon: Building2 },
        { name: 'HDFC NetBanking', url: 'https://netbanking.hdfcbank.com/', icon: Building2 },
        { name: 'ICICI iMobile', url: 'https://www.icicibank.com/', icon: Building2 },
        { name: 'Axis Mobile', url: 'https://www.axisbank.com/', icon: Building2 },
        { name: 'UPI: Block via NPCI', url: 'https://www.npci.org.in/', icon: CreditCard },
    ],
    telecom: [
        { name: 'TAFCOP - Check SIMs', url: 'https://sancharsaathi.gov.in/sfc/Home/sfc-complaint.jsp', icon: Smartphone, desc: 'See all SIMs registered to your Aadhaar/PAN' },
        { name: 'CEIR - Block Stolen Phone', url: 'https://ceir.gov.in/', icon: ShieldOff, desc: 'Block IMEI to disable stolen device on all networks' },
        { name: 'Chakshu - Report Fraud Calls', url: 'https://sancharsaathi.gov.in/', icon: Smartphone, desc: 'Report suspected fraud before a loss occurs' },
        { name: 'Lock Aadhaar Biometrics', url: 'https://myaadhaar.uidai.gov.in/', icon: Lock, desc: 'Prevent unauthorized biometric authentication' },
    ],
    social: [
        { name: 'Facebook - Hacked Account', url: 'https://www.facebook.com/hacked', icon: Link },
        { name: 'Instagram - Recovery', url: 'https://help.instagram.com/', icon: Camera },
        { name: 'Google - Suspicious Activity', url: 'https://myaccount.google.com/security', icon: Lock },
        { name: 'X - Account Security', url: 'https://help.twitter.com/en/safety-and-security', icon: Link },
        { name: 'WhatsApp - Report', url: 'https://www.whatsapp.com/contact', icon: MessageCircle },
    ],
}

export default function FreezeDashboard() {
    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Snowflake size={22} color="#4682B4" /> One-Click Freeze Dashboard
            </h2>
            <p className="section-subtitle">
                Instantly access the tools to freeze your bank cards, block unauthorized SIM cards,
                and recover hacked social media accounts - all in one place.
            </p>

            <div className="grid-3">
                {/* Banking */}
                <div className="card" style={styles.category}>
                    <div style={styles.catHeader}>
                        <Building2 size={24} color="#4682B4" />
                        <div>
                            <h3 style={styles.catTitle}>Banking & Cards</h3>
                            <span className="chip chip-red">FREEZE NOW</span>
                        </div>
                    </div>
                    <div style={styles.linkList}>
                        {freezeLinks.banking.map((l, i) => {
                            const Icon = l.icon
                            return (
                                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={styles.linkItem} className="card">
                                    <Icon size={16} color="#4682B4" />
                                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{l.name}</span>
                                    <ChevronRight size={14} style={styles.arrow} />
                                </a>
                            )
                        })}
                    </div>
                    <p style={styles.note}>
                        <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--color-text-primary)' }}>Can’t find your bank?</strong>
                        Call your bank’s helpline or open your banking app and block your card/UPI.
                        <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid rgba(220, 38, 38, 0.1)' }} />
                        Also call <a href="tel:1930" style={{ color: '#DC2626', fontWeight: 700 }}>1930</a> for immediate bank freeze via operators.
                    </p>
                </div>

                {/* Telecom */}
                <div className="card" style={styles.category}>
                    <div style={styles.catHeader}>
                        <Smartphone size={24} color="#4682B4" />
                        <div>
                            <h3 style={styles.catTitle}>Telecom & SIM Security</h3>
                            <span className="chip chip-amber">CHECK & BLOCK</span>
                        </div>
                    </div>
                    <div style={styles.linkList}>
                        {freezeLinks.telecom.map((l, i) => {
                            const Icon = l.icon
                            return (
                                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={styles.linkItem} className="card">
                                    <Icon size={16} color="#4682B4" />
                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.85rem', display: 'block' }}>{l.name}</span>
                                        {l.desc && <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{l.desc}</span>}
                                    </div>
                                    <ChevronRight size={14} style={styles.arrow} />
                                </a>
                            )
                        })}
                    </div>
                </div>

                {/* Social Media */}
                <div className="card" style={styles.category}>
                    <div style={styles.catHeader}>
                        <Link size={24} color="#4682B4" />
                        <div>
                            <h3 style={styles.catTitle}>Social Media Recovery</h3>
                            <span className="chip chip-blue">ACCOUNT RECOVERY</span>
                        </div>
                    </div>
                    <div style={styles.linkList}>
                        {freezeLinks.social.map((l, i) => {
                            const Icon = l.icon
                            return (
                                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={styles.linkItem} className="card">
                                    <Icon size={16} color="#4682B4" />
                                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{l.name}</span>
                                    <ChevronRight size={14} style={styles.arrow} />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    category: {
        padding: '1.5rem',
    },
    catHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        marginBottom: '1.25rem',
    },
    catTitle: {
        fontSize: '1rem',
        fontWeight: 700,
        marginBottom: '4px',
    },
    linkList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    linkItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        textDecoration: 'none',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
    },
    arrow: {
        color: '#F97316',
        marginLeft: 'auto',
        flexShrink: 0,
    },
    note: {
        marginTop: '1rem',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        padding: '0.5rem 0.75rem',
        background: 'rgba(220, 38, 38, 0.05)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid rgba(220, 38, 38, 0.1)',
    },
}
