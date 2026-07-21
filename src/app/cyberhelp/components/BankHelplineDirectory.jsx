"use client";
import React, { useState, useMemo } from 'react'
import { Building2, Phone, Search, X, ShieldAlert, CreditCard, ExternalLink, Mail, BadgeCheck } from 'lucide-react'
import bankData from '../data/bankHelplines.json'

const categories = ['All', 'Public Sector', 'Private Sector', 'Specialized Banks']

const BankCard = ({ bank }) => {
    return (
        <div className="card" style={styles.bankCard}>
            <div style={styles.cardHeader}>
                <div style={{ ...styles.colorBar, background: bank.color }} />
                <h3 style={styles.bankName}>{bank.name}</h3>
            </div>

            <div style={styles.helplineBox}>
                <div style={styles.helplineItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <ShieldAlert size={14} color="#F97316" />
                        <span style={styles.helplineLabel}>24/7 Fraud Reporting</span>
                    </div>
                    <a href={`tel:${bank.fraud_helpline}`} className="btn btn-primary" style={styles.callBtn}>
                        <Phone size={13} /> {bank.fraud_helpline}
                    </a>
                </div>

                {bank.fraud_email && (
                    <div style={styles.helplineItem}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <Mail size={14} color="#4682B4" />
                            <span style={styles.helplineLabel}>Official Fraud Email</span>
                        </div>
                        <a href={`mailto:${bank.fraud_email}`} className="btn btn-secondary" style={styles.emailBtn}>
                            <Mail size={13} /> {bank.fraud_email}
                        </a>
                    </div>
                )}

                {bank.credit_card_helpline && (
                    <div style={styles.helplineItem}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <CreditCard size={14} color="var(--color-link)" />
                            <span style={styles.helplineLabel}>Credit Card Assistance</span>
                        </div>
                        <a href={`tel:${bank.credit_card_helpline}`} className="btn btn-outline" style={styles.callBtnOutline}>
                            <Phone size={13} /> {bank.credit_card_helpline}
                        </a>
                    </div>
                )}
            </div>

            <div style={styles.cardFooter}>
                <a
                    href={bank.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.websiteLink}
                >
                    Visit Official Fraud Page <ExternalLink size={12} />
                </a>
            </div>
        </div>
    )
}

export default function BankHelplineDirectory() {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')

    const flatData = useMemo(() => {
        const all = []
        const cat = activeCategory.toLowerCase()

        if (cat === 'all' || cat === 'public sector') {
            const data = bankData.public_sector || []
            all.push(...data.map(b => ({ ...b, category: 'Public Sector' })))
        }
        if (cat === 'all' || cat === 'private sector') {
            const data = bankData.private_sector || []
            all.push(...data.map(b => ({ ...b, category: 'Private Sector' })))
        }
        if (cat === 'all' || cat === 'specialized banks') {
            const data = bankData.specialized_banks || []
            all.push(...data.map(b => ({ ...b, category: 'Specialized Banks' })))
        }
        return all
    }, [activeCategory])

    const filtered = useMemo(() => {
        const query = search.toLowerCase().trim()
        if (!query) return flatData

        return flatData.filter(b =>
            b.name.toLowerCase().includes(query) ||
            (b.keywords && b.keywords.toLowerCase().includes(query))
        )
    }, [flatData, search])

    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={22} color="var(--color-accent-blue)" /> Bank Helpline
            </h2>
            <p className="section-subtitle">
                Immediate contact directory for Indian banks to report unauthorized transactions,
                freeze accounts, or block credit cards.
            </p>

            <div style={styles.controls}>
                <div style={styles.searchWrap}>
                    <Search size={16} style={styles.searchIcon} color="var(--color-text-muted)" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by bank name or abbreviation (e.g. SBI, ICICI)..."
                        style={styles.searchInput}
                    />
                    {search && (
                        <button onClick={() => setSearch('')} style={styles.clearBtn}><X size={14} /></button>
                    )}
                </div>

                <div style={styles.categoryFilter}>
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setActiveCategory(c)}
                            style={{
                                ...styles.catBtn,
                                ...(activeCategory.toLowerCase() === c.toLowerCase() ? styles.catBtnActive : {})
                            }}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <p style={styles.resultCount}>
                Showing {filtered.length} banks
            </p>

            {filtered.length === 0 ? (
                <div style={styles.emptyState}>
                    <Search size={32} color="var(--color-text-muted)" />
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        No banks found matching your search. Try a different name.
                    </p>
                </div>
            ) : (
                <div className="grid-3">
                    {filtered.map((bank, i) => (
                        <BankCard key={i} bank={bank} />
                    ))}
                </div>
            )}
        </div>
    )
}

const styles = {
    controls: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
    },
    searchWrap: {
        position: 'relative',
        maxWidth: '500px',
    },
    searchIcon: {
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 2.5rem',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text-primary)',
        fontSize: '0.9rem',
        outline: 'none',
    },
    clearBtn: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
    },
    categoryFilter: {
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
    },
    catBtn: {
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        padding: '0.4rem 1rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
    },
    catBtnActive: {
        background: 'var(--color-accent-orange)',
        borderColor: 'var(--color-accent-orange)',
        color: 'white',
    },
    resultCount: {
        fontSize: '0.82rem',
        color: 'var(--color-text-muted)',
        marginBottom: '1rem',
    },
    bankCard: {
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    colorBar: {
        width: '4px',
        height: '24px',
        borderRadius: '4px',
    },
    bankName: {
        fontSize: '0.95rem',
        fontWeight: 700,
    },
    helplineBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
    },
    helplineItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    helplineLabel: {
        fontSize: '0.65rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: 'var(--color-text-muted)',
    },
    callBtn: {
        fontSize: '0.85rem',
        fontWeight: 700,
        padding: '0.5rem',
        justifyContent: 'center',
    },
    callBtnOutline: {
        fontSize: '0.85rem',
        fontWeight: 600,
        padding: '0.5rem',
        justifyContent: 'center',
    },
    emailBtn: {
        fontSize: '0.75rem',
        fontWeight: 700,
        padding: '0.6rem 0.5rem',
        justifyContent: 'center',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
        boxShadow: 'none',
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        lineHeight: '1.4',
    },
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '0.5rem',
    },
    websiteLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.75rem',
        color: 'var(--color-link)',
        textDecoration: 'none',
        fontWeight: 600,
    },
    verifyBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.65rem',
        fontWeight: 700,
        color: '#10B981',
        textTransform: 'uppercase',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem',
        gap: '0.75rem',
    }
}
