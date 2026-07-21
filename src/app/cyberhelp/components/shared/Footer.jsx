"use client";
import React from 'react'
import { Shield, Phone, Globe, AlertTriangle, Heart, BookOpen, ExternalLink } from 'lucide-react'

export default function Footer({ showCta = true }) {
    return (
        <footer>
            {/* Orange CTA Band */}
            {showCta && (
                <div style={styles.ctaBand}>
                    <div className="container" style={styles.ctaInner}>
                        <h2 style={styles.ctaTitle}>CYBER SCAM? WE&apos;VE GOT YOU. ACT NOW.</h2>
                        <p style={styles.ctaDesc}>
                            Report incidents, freeze accounts, and begin recovery immediately.
                        </p>
                    </div>
                </div>
            )}

            {/* Dark Footer */}
            <div style={styles.footer}>
                <div className="container">
                    <div style={styles.grid}>
                        <div>
                            <div style={styles.brand}>
                                <Shield size={24} color="#F97316" />
                                <div>
                                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF' }}>INNVIKTA</span>
                                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#F97316', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>CyberHelp</span>
                                </div>
                            </div>
                            <p style={styles.desc}>
                                A trauma-informed, victim-centric resource for cybercrime reporting and recovery in India.
                                Built with empathy and urgency.
                            </p>
                        </div>

                        <div>
                            <h4 style={styles.heading}>Emergency</h4>
                            <p style={styles.link}><a href="tel:1930" style={styles.footerLink}><Phone size={13} style={{ marginRight: 6 }} />1930 - National Helpline</a></p>
                            <p style={styles.link}><a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={styles.footerLink}><Globe size={13} style={{ marginRight: 6 }} />cybercrime.gov.in</a></p>
                            <p style={styles.link}><a href="tel:112" style={styles.footerLink}><AlertTriangle size={13} style={{ marginRight: 6 }} />112 - Police Emergency</a></p>
                        </div>

                        <div>
                            <h4 style={styles.heading}>Resources</h4>
                            <p style={styles.link}><a href="https://sachet.rbi.org.in" target="_blank" rel="noopener noreferrer" style={styles.footerLink}><ExternalLink size={13} style={{ marginRight: 6 }} />RBI Sachet Portal</a></p>
                            <p style={styles.link}><a href="https://sancharsaathi.gov.in" target="_blank" rel="noopener noreferrer" style={styles.footerLink}><ExternalLink size={13} style={{ marginRight: 6 }} />Sanchar Saathi</a></p>
                            <p style={styles.link}><a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={styles.footerLink}><ExternalLink size={13} style={{ marginRight: 6 }} />SEBI SCORES</a></p>
                        </div>

                        <div>
                            <h4 style={styles.heading}>Support</h4>
                            <p style={styles.link}><a href="tel:181" style={styles.footerLink}><Heart size={13} style={{ marginRight: 6 }} />181 - Women Helpline</a></p>
                            <p style={styles.link}><a href="tel:1098" style={styles.footerLink}><Heart size={13} style={{ marginRight: 6 }} />1098 - Childline</a></p>
                            <p style={styles.link}><a href="tel:7353107353" style={styles.footerLink}><BookOpen size={13} style={{ marginRight: 6 }} />Responsible Netism</a></p>
                        </div>
                    </div>

                    <div style={styles.bottom}>
                        <p style={{ color: '#FFFFFF', fontSize: '0.78rem' }}>
                            © {new Date().getFullYear()} Innvikta CyberHelp · Built by <a href="https://innvikta.com" target="_blank" rel="noopener noreferrer" style={{ color: '#F97316', textDecoration: 'none' }}>Innvikta</a>. All rights reserved.
                        </p>
                        <p style={{ color: '#FFFFFF', fontSize: '0.7rem', marginTop: '4px' }}>
                            In an emergency, always call 112 or 1930 first. Do not rely solely on online resources.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const styles = {
    ctaBand: {
        background: '#F97316',
        padding: '1.25rem 0',
        textAlign: 'center',
    },
    ctaInner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    ctaTitle: {
        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
        fontWeight: 800,
        color: '#FFFFFF',
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
    },
    ctaDesc: {
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.9)',
        maxWidth: '600px',
        lineHeight: 1.4,
    },
    footer: {
        borderTop: 'none',
        padding: '1.5rem 0 0.75rem',
        background: '#111827',
        color: '#FFFFFF',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem',
    },
    desc: {
        fontSize: '0.82rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.6,
    },
    heading: {
        fontSize: '0.82rem',
        fontWeight: 700,
        color: '#F97316',
        marginBottom: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
    },
    link: {
        fontSize: '0.82rem',
        color: '#D1D5DB',
        marginBottom: '0.5rem',
    },
    footerLink: {
        color: '#D1D5DB',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
    },
    bottom: {
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1.25rem',
        textAlign: 'center',
    },
}
